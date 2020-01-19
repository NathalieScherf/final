const express = require("express")
const app = express()

const server = require("http").Server(app)
const io = require('socket.io')(server, { origins: 'localhost:8080' }) // if deployed add an ||www.name of my website.com

const compression = require("compression")
const bodyParser = require("body-parser")
const db = require("./db")

const csurf = require("csurf")


const cookieSession = require("cookie-session")

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


app.use(compression());
app.use(express.static('./public'));


const cookieSessionMiddleware = cookieSession({
    secret:  process.env.SESSION_SECRET || require("./secrets").sessionSecret, // any string also in the encrypted cookie
    maxAge: 1000 * 60 * 60 * 24 * 90 //two weeks
})

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf())

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});

if (process.env.NODE_ENV !== "production") {
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


server.listen(8080, function() {
    console.log("I'm listening.");
});


let arrOfPlants=[];
let newArrOfPlants=[];
io.on('connection', socket =>{
    console.log(`socket  connected`);

    socket.on('plantsSelected', plantSelection =>{
        
        arrOfPlants=Object.values(plantSelection);

        if(plantSelection.sunny &&plantSelection.polinator !== 'indeter'){
            db.getSelectedPlantsSun(plantSelection.plant_type, plantSelection.polinator, plantSelection.sunny)
                .then( results =>{
                socket.emit('displayPlants', results);
            }).catch( err=> {
                console.log("error  get selected plants", err);
            });
        }

        if(plantSelection.shade &&plantSelection.polinator !== 'indeter'){
            db.getSelectedPlantsShade(plantSelection.plant_type, plantSelection.polinator, plantSelection.shade)
                .then( results =>{
                socket.emit('displayPlants', results);
            }).catch( err=> {
                console.log("error  get selected plants", err);
            });
        }

        if(plantSelection.partial_shade &&plantSelection.polinator !== 'indeter') {
            db.getSelectedPlantsBoth(plantSelection.plant_type, plantSelection.polinator, plantSelection.partial_shade)
                .then( results =>{
                socket.emit('displayPlants', results);
            }).catch( err=> {
                console.log("error  get selected plants", err);
            });
        }
        if(plantSelection.sunny && plantSelection.polinator === 'indeter'){
            console.log("make a request without polinator");
            db.getSelectedPlantsSunnyNoPol(plantSelection.plant_type, plantSelection.sunny)
                .then( results =>{
                socket.emit('displayPlants', results);
            }).catch( err=> {
                console.log("error  get selected plants", err);
            });
        }
        if(plantSelection.partial_shade && plantSelection.polinator === 'indeter'){
            console.log("make a request without polinator");
            db.getSelectedPlantsBothNoPol(plantSelection.plant_type, plantSelection.partial_shade)
                .then( results =>{
                socket.emit('displayPlants', results);
            }).catch( err=> {
                console.log("error  get selected plants", err);
            });
        }

        if(plantSelection.shade && plantSelection.polinator === 'indeter'){
            console.log("make a request without polinator");
            db.getSelectedPlantsShadeNoPol(plantSelection.plant_type, plantSelection.shade)
                .then( results =>{
                socket.emit('displayPlants', results);
            }).catch( err=> {
                console.log("error  get selected plants", err);
            });
        }
    });

    socket.on('changedSelection', newSelection=>{
        newArrOfPlants=Object.values(newSelection);
        if(newSelection.oldLocation === 'sunny' && newSelection.oldPol === 'yes'){
            db.getNewSelectedPlantsSunny(newSelection.newPlant)
                .then(results => {
                socket.emit('newSelection', results);
            });}
        if(newSelection.oldLocation === 'partial_shade' && newSelection.oldPol === 'yes'){
            db.getNewSelectedPlantsPS(newSelection.newPlant)
                .then(results => {
                socket.emit('newSelection', results);
            });}
        if(newSelection.oldLocation === 'shade' && newSelection.oldPol === 'yes'){
            db.getNewSelectedPlantsShade(newSelection.newPlant)
                .then(results => {
                socket.emit('newSelection', results);
            });
        }
        if(newSelection.oldLocation === 'sunny' && newSelection.oldPol === 'no'){

            db.getNewSelectedPlantsSunnyNO(newSelection.newPlant)
                .then(results => {
                socket.emit('newSelection', results);
            })
        ;}
        if(newSelection.oldLocation === 'partial_shade' && newSelection.oldPol === 'no'){
            db.getNewSelectedPlantsPSNO(newSelection.newPlant)
                .then(results => {
                socket.emit('newSelection', results);
            });
        }
        if(newSelection.oldLocation === 'shade'&& newSelection.oldPol === 'no'){
            db.getNewSelectedPlantsShadeNO(newSelection.newPlant)
                .then(results => {
                socket.emit('newSelection', results);
            });
        }
        if(newSelection.oldLocation === 'sunny' && newSelection.oldPol === 'indeter'){
            db.getNewSelectedPlantsSunnyIND(newSelection.newPlant)
                .then(results => {
                socket.emit('newSelection', results);
            });
        }
        if(newSelection.oldLocation === 'partial_shade' && newSelection.oldPol === 'indeter'){
            db.getNewSelectedPlantsPSIND(newSelection.newPlant)
                .then(results => {
                socket.emit('newSelection', results);
            });}
        if(newSelection.oldLocation === 'shade'&& newSelection.oldPol === 'indeter'){
            db.getNewSelectedPlantsShadeIND(newSelection.newPlant)
                .then(results => {
                socket.emit('newSelection', results);
            });
        }
    });

    socket.on('changedSelectionLocShade', newLocation => {

        var plant;
        if(newArrOfPlants.length>0){
            plant = newArrOfPlants[0];
        }
        else {
            plant = arrOfPlants[0];
        }

        var pol = arrOfPlants[2];
        if(pol === 'indeter'){
            db.getNewLocShade(newLocation, plant).then(results => {
                socket.emit('newLocation', results);
            });
        }
        if (pol === true || pol === false){db.getNewLocShadePol(newLocation, plant, pol)
            .then(results => socket.emit('newLocation', results) );}
    });

    socket.on('changedSelectionLocSun', newLocation => {
        var plant;
        if(newArrOfPlants.length > 0){
            plant = newArrOfPlants[0];
        }
        else{ plant = arrOfPlants[0] }

        var pol = arrOfPlants[2];
        if(pol === 'indeter'){
            db.getNewLocSun(newLocation, plant)
                .then(results => socket.emit('newLocation', results));}
        if (pol === true || pol === false){db.getNewLocSunPol(newLocation, plant, pol)
            .then(results => socket.emit('newLocation', results));}
    });

    socket.on('changedSelectionLocBoth', newLocation => {
        var plant;
        if(newArrOfPlants.length>0){
            plant= newArrOfPlants[0];
            console.log("new plant for loc shade", plant);
        }
        else{
            plant=arrOfPlants[0]
        }

        var pol = arrOfPlants[2];
        if(pol === 'indeter'){
            db.getNewLocBoth(newLocation, plant)
                .then(results => socket.emit('newLocation', results));}
        if (pol === true || pol === false){db.getNewLocBothPol(newLocation, plant, pol)
            .then(results => socket.emit('newLocation', results))
        }
    });

    socket.on('changedSelectionPolNO', newPol =>{
        var plant;
        if(newArrOfPlants.length > 0){
            plant = newArrOfPlants[0];
        }
        else{
            plant = arrOfPlants[0];
        }

        if(newPol.oldLocation === 'shade'){
            db.getNewSelectedPlantsShadeNO(plant)
            .then(results => socket.emit('newPolinator', results))
        }
        if(newPol.oldLocation === 'sunny'){
            db.getNewSelectedPlantsSunnyNO(plant)
            .then(results => socket.emit('newPolinator', results))
        }
        if(newPol.oldLocation === 'partial_shade'){
            db.getNewSelectedPlantsPSNO(plant)
            .then(results => socket.emit('newPolinator', results))
        }
    });

    socket.on('changedSelectionPolYES', newPol =>{
        var plant;

        if(newArrOfPlants.length>0){
            plant= newArrOfPlants[0];
        }
        else{plant=arrOfPlants[0];}

        if(newPol.oldLocation === 'shade'){
            db.getNewSelectedPlantsShade(plant)
            .then(results => socket.emit('newPolinator', results))
        }
        if(newPol.oldLocation === 'sunny'){
            db.getNewSelectedPlantsSunny(plant)
            .then(results => socket.emit('newPolinator', results))
        }
        if(newPol.oldLocation === 'partial_shade'){
            db.getNewSelectedPlantsPS(plant)
            .then(results => socket.emit('newPolinator', results));
        }
    });

    socket.on('changedSelectionPolINDETER', newPol =>{
        var plant;
        if(newArrOfPlants.length > 0){
            plant= newArrOfPlants[0];
        }
        else{
            plant=arrOfPlants[0];
        }
        if(newPol.oldLocation === 'shade'){
            db.getNewSelectedPlantsShadeIND(plant)
            .then(results => socket.emit('newPolinator', results))
        }
        if(newPol.oldLocation === 'sunny'){
            db.getNewSelectedPlantsSunnyIND(plant)
            .then(results => socket.emit('newPolinator', results))
        }
        if(newPol.oldLocation === 'partial_shade'){
            db.getNewSelectedPlantsPSIND(plant)
            .then(results => socket.emit('newPolinator', results))
        }
    })
});
