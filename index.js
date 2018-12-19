
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

// do I need an object of the current plant selection to modify when new selection is made? OR do a whole new query?
let arrOfPlants=[];
io.on('connection', socket =>{
    console.log(`socket  connected`);

    socket.on('plantsSelected', plantSelection =>{
        console.log("in plantsSelected", plantSelection);
        arrOfPlants=Object.values(plantSelection);
        console.log("arrOfPlants", arrOfPlants);
        // sunny location
        if(plantSelection.sunny &&plantSelection.polinator !=='indeter'){
            db.getSelectedPlantsSun(plantSelection.plant_type, plantSelection.polinator, plantSelection.sunny).then( results =>{
                console.log("results from query sunny", results);
                socket.emit('displayPlants', results);
            }).catch( err=> {
                console.log("error  get selected plants", err);
            });
        }

        // för  shadey location
        if(plantSelection.shade &&plantSelection.polinator !=='indeter'){
            db.getSelectedPlantsShade(plantSelection.plant_type, plantSelection.polinator, plantSelection.shade).then( results =>{
                console.log("results from query shade", results);
                socket.emit('displayPlants', results);
            }).catch( err=> {
                console.log("error  get selected plants", err);
            });
        }
        if(plantSelection.partial_shade &&plantSelection.polinator !=='indeter') {
            db.getSelectedPlantsBoth(plantSelection.plant_type, plantSelection.polinator, plantSelection.partial_shade).then( results =>{
                console.log("results from query", results);
                socket.emit('displayPlants', results);
            }).catch( err=> {
                console.log("error  get selected plants", err);
            });
        }
        if(plantSelection.partial_shade && plantSelection.polinator =='indeter'){
            console.log("make a request without polinator");
            db.getSelectedPlantsBothNoPol(plantSelection.plant_type, plantSelection.partial_shade).then( results =>{
                console.log("results from query", results);
                socket.emit('displayPlants', results);
            }).catch( err=> {
                console.log("error  get selected plants", err);
            });
        }

        if(plantSelection.sunny && plantSelection.polinator =='indeter'){
            console.log("make a request without polinator");
            db.getSelectedPlantsSunnyNoPol(plantSelection.plant_type, plantSelection.sunny).then( results =>{
                console.log("results from query", results);
                socket.emit('displayPlants', results);
            }).catch( err=> {
                console.log("error  get selected plants", err);
            });
        }

        if(plantSelection.shade && plantSelection.polinator =='indeter'){
            console.log("make a request without polinator");
            db.getSelectedPlantsShadeNoPol(plantSelection.plant_type, plantSelection.shade).then( results =>{
                console.log("results from query", results);
                socket.emit('displayPlants', results);
            }).catch( err=> {
                console.log("error  get selected plants", err);
            });
        }
    });

    //reload selection if change in form in selectPlants.js ONLY plant_type
    socket.on('changedSelection', newSelection=>{
        //arrOfPlants=Object.values(newSelection);
        //console.log("arrOfPlants after new selection", arrOfPlants);
        console.log("newSelection from changedSelection in index", newSelection);
        // get the new selection of plants:
        if(newSelection.oldLocation=='sunny', newSelection.oldPol=='yes'){
            db.getNewSelectedPlantsSunny(newSelection.newPlant).then(results=>{
                console.log("results from newSelection sunny pol", results);
                socket.emit('newSelection', results);
            });}
        else if(newSelection.oldLocation=='partial_shade', newSelection.oldPol=='yes'){
            db.getNewSelectedPlantsPS(newSelection.newPlant).then(results=>{
                console.log("results from newSelection partial pol", results);
                socket.emit('newSelection', results);
            });}
        else if(newSelection.oldLocation=='shade', newSelection.oldPol=='yes'){
            db.getNewSelectedPlantsShade(newSelection.newPlant).then(results=>{
                console.log("results from newSelection shade pol", results);
                socket.emit('newSelection', results);
            });}
        else     if(newSelection.oldLocation=='sunny', newSelection.oldPol=='no'){
            db.getNewSelectedPlantsSunnyNO(newSelection.newPlant).then(results=>{
                console.log("results from newSelection sunny pol", results);
                socket.emit('newSelection', results);
            });}
        else if(newSelection.oldLocation=='partial_shade', newSelection.oldPol=='no'){
            db.getNewSelectedPlantsPSNO(newSelection.newPlant).then(results=>{
                console.log("results from newSelection partial pol", results);
                socket.emit('newSelection', results);
            });}
        else if(newSelection.oldLocation=='shade', newSelection.oldPol=='no'){
            db.getNewSelectedPlantsShadeNO(newSelection.newPlant).then(results=>{
                console.log("results from newSelection shade pol", results);
                socket.emit('newSelection', results);
            });}
        else     if(newSelection.oldLocation=='sunny', newSelection.oldPol=='indeter'){
            db.getNewSelectedPlantsSunnyIND(newSelection.newPlant).then(results=>{
                console.log("results from newSelection sunny pol", results);
                socket.emit('newSelection', results);
            });}
        else if(newSelection.oldLocation=='partial_shade', newSelection.oldPol=='indeter'){
            db.getNewSelectedPlantsPSIND(newSelection.newPlant).then(results=>{
                console.log("results from newSelection partial pol", results);
                socket.emit('newSelection', results);
            });}
        else if(newSelection.oldLocation=='shade', newSelection.oldPol=='indeter'){
            db.getNewSelectedPlantsShadeIND(newSelection.newPlant).then(results=>{
                console.log("results from newSelection shade pol", results);
                socket.emit('newSelection', results);
            });}
    });


    // get the new selection of plants based on location:
    //for change to shade:
    socket.on('changedSelectionLocShade', newLocation=>{
        console.log("arrOfPlants from loc shade", arrOfPlants[0]);
        var plant=arrOfPlants[0];
        db.getNewLocShade(newLocation, plant).then(results=>{
            //console.log("results from newLocation", results);
            socket.emit('newLocation', results);
        });
    });
    //for change to sun:
    socket.on('changedSelectionLocSun', newLocation=>{
        var plant=arrOfPlants[0];
        db.getNewLocSun(newLocation, plant).then(results=>{
            //console.log("results from newLocation", results);
            socket.emit('newLocation', results);
        });
    });
    //for change to both:
    socket.on('changedSelectionLocBoth', newLocation=>{
        var plant=arrOfPlants[0];
        db.getNewLocBoth(newLocation, plant).then(results=>{
            //console.log("results from newLocation", results);
            socket.emit('newLocation', results);
        });
    });




    socket.on('removeSelection', remPlants=>{
        socket.emit('removeSelection', remPlants);
    });
    //reload selection with location:
    socket.on('changeLocation', (location, selection) =>{
        console.log("in cahnge location", location, selection);
    //    db.getLocation(location);
    });


});
