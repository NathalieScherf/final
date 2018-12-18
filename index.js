
const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080' });// if deployed add an ||www.name of my website.com
const compression = require("compression");
const bodyParser = require("body-parser");
const db = require("./db");

const csurf = require("csurf");

const cookieSession = require("cookie-session");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(compression());
app.use(express.static('./public'));


const cookieSessionMiddleware = cookieSession({
    secret:     process.env.SESSION_SECRET || require("./secrets").sessionSecret, // any string also in the encrypted cookie
    maxAge: 1000 * 60 * 60 * 24 * 90//two weeks
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
app.use(csurf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// put any other get route above this route:
app.get('*', function(req, res) {

    res.sendFile(__dirname + '/index.html');

});


//changed from app. to server. as socket io was added:
server.listen(8080, function() {
    console.log("I'm listening.");
});

// all of the server side socket code goes here below server.listen
// onlineUsers object wil maintain a list of everyone cureently online:
//let onlineUsers={};
// do I need an object of the current plant selection to modify when new selection is made? OR do a whole new query?

io.on('connection', socket =>{
    console.log(`socket  connected`);
    //    let socketId= socket.id;
    //make req.session.userId available in socket:
    //    let userId =socket.request.session.userId;
    // set key to socketId and userId as value
    //    onlineUsers[socketId]=userId;
    // put selected plants into an object:
    // cahnge: let arrOfIds=Object.values(onlineUsers);

    socket.on('plantsSelected', plantSelection =>{
        console.log("in plantsSelected", plantSelection.plant_type);


        db.getSelectedPlants(plantSelection.plant_type).then( results =>{
            console.log("results from query", results);
            socket.emit('displayPlants', results);
        }).catch( err=> {
            console.log("error  get selected plants", err);
        });
    });

    //reload selection if change in form in selectPlants.js
    socket.on('changedSelection', newSelection=>{
        console.log("newSelection from changedSelection in index", newSelection);
        // get the new selection of plants: change name of query
        db.getSelectedPlants(newSelection).then(results=>{
            console.log("results from newSelection", results);
            socket.emit('newSelection', results);

        });
        socket.on('removeSelection', remPlants=>{
            socket.emit('removeSelection', remPlants);
        });
    });


});
