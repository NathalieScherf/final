
var spicedPg = require("spiced-pg");
var db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const secrets = require("./secrets");
    db = spicedPg(
        `postgres:${secrets.dbUser}:${secrets.password}@localhost:5432/plants`
    );
}

exports.getSelectedPlantsSun = (plant_type, polinator, sunny) => {
    console.log("plant_type from db", plant_type);
    return db
        .query(
            `SELECT*
            FROM plants
        WHERE plant_type=$1 AND polinator=$2 AND sunny =$3`,
            [plant_type, polinator, sunny]
        )
        .then(function(results) {
            //console.log("plants selected sunny db.js: ", results.rows);
            return results.rows;
        });
};

exports.getSelectedPlantsShade= (plant_type, polinator, shade) => {
    console.log("plant_type from db", plant_type);
    return db
        .query(
            `SELECT*
            FROM plants
        WHERE plant_type=$1 AND polinator=$2 AND shade =$3`,
            [plant_type, polinator, shade]
        )
        .then(function(results) {
            //console.log("plants selected shade db.js: ", results.rows);
            return results.rows;
        });
};

exports.getSelectedPlantsBoth = (plant_type, polinator, partial_shade) => {
    console.log("plant_type from db", plant_type);
    return db
        .query(
            `SELECT*
            FROM plants
        WHERE plant_type=$1 AND polinator=$2 AND partial_shade =$3`,
            [plant_type, polinator, partial_shade]
        )
        .then(function(results) {
            //console.log("plants selected partial db.js: ", results.rows);
            return results.rows;
        });
};

exports.getSelectedPlantsBothNoPol = (plant_type, partial_shade) => {
    console.log("plant_type from db", plant_type);
    return db
        .query(
            `SELECT*
            FROM plants
        WHERE plant_type=$1 AND partial_shade =$2`,
            [plant_type, partial_shade]
        )
        .then(function(results) {
            //console.log("plants selected partial db.js: ", results.rows);
            return results.rows;
        });
};

exports.getSelectedPlantsShadeNoPol = (plant_type, shade) => {
    console.log("plant_type from db", plant_type);
    return db
        .query(
            `SELECT*
            FROM plants
        WHERE plant_type=$1 AND shade =$2`,
            [plant_type, shade]
        )
        .then(function(results) {
            //console.log("plants selected partial db.js: ", results.rows);
            return results.rows;
        });
};

exports.getSelectedPlantsSunnyNoPol = (plant_type, sunny) => {
    console.log("plant_type from db", plant_type);
    return db
        .query(
            `SELECT*
            FROM plants
        WHERE plant_type=$1 AND sunny =$2`,
            [plant_type, sunny]
        )
        .then(function(results) {
            //console.log("plants selected partial db.js: ", results.rows);
            return results.rows;
        });
};
/*exports.getSelectedPlantsType = (plant_type) => {
    console.log("plant_type from db", plant_type);
    return db
        .query(
            `SELECT*
            FROM plants
        WHERE plant_type=$1`,
            [plant_type]
        )
        .then(function(results) {
            console.log("plants selected db.js: ", results.rows);
            return results.rows;
        });
};*/
exports.getNewSelectedPlants = plant_type => {
    return db
        .query(
            `SELECT*
            FROM plants
        WHERE plant_type=$1`,
            [plant_type]
        )
        .then(function(results) {
            //console.log("plants selected db.js: ", results.rows);
            return results.rows;
        });
};
exports.getNewSelectedPlantsSunny = plant_type => {
    return db
        .query(
            `SELECT*
            FROM plants
        WHERE plant_type=$1 AND polinator=true AND sunny=true`,
            [plant_type]
        )
        .then(function(results) {
            //console.log("plants selected db.js: ", results.rows);
            return results.rows;
        });
};
exports.getNewSelectedPlantsPS = plant_type => {
    return db
        .query(
            `SELECT*
            FROM plants
        WHERE plant_type=$1 AND polinator=true AND partial_shade=true`,
            [plant_type]
        )
        .then(function(results) {
            //console.log("plants selected db.js: ", results.rows);
            return results.rows;
        });
};
exports.getNewSelectedPlantsShade = plant_type => {
    return db
        .query(
            `SELECT*
            FROM plants
        WHERE plant_type=$1 AND polinator=true AND shade=true`,
            [plant_type]
        )
        .then(function(results) {
            //console.log("plants selected db.js: ", results.rows);
            return results.rows;
        });
};


exports.getNewSelectedPlantsSunnyNO = plant_type => {
    return db
        .query(
            `SELECT*
            FROM plants
        WHERE plant_type=$1 AND polinator=false AND sunny=true`,
            [plant_type]
        )
        .then(function(results) {
            //console.log("plants selected db.js: ", results.rows);
            return results.rows;
        });
};
exports.getNewSelectedPlantsPSNO = plant_type => {
    return db
        .query(
            `SELECT*
            FROM plants
        WHERE plant_type=$1 AND polinator=false AND partial_shade=true`,
            [plant_type]
        )
        .then(function(results) {
            //console.log("plants selected db.js: ", results.rows);
            return results.rows;
        });
};
exports.getNewSelectedPlantsShadeNO = plant_type => {
    return db
        .query(
            `SELECT*
            FROM plants
        WHERE plant_type=$1 AND polinator=false AND shade=true`,
            [plant_type]
        )
        .then(function(results) {
            //console.log("plants selected db.js: ", results.rows);
            return results.rows;
        });
};

exports.getNewSelectedPlantsSunnyIND = plant_type => {
    return db
        .query(
            `SELECT*
            FROM plants
        WHERE plant_type=$1 AND  sunny=true`,
            [plant_type]
        )
        .then(function(results) {
            //console.log("plants selected db.js: ", results.rows);
            return results.rows;
        });
};
exports.getNewSelectedPlantsPSIND = plant_type => {
    return db
        .query(
            `SELECT*
            FROM plants
        WHERE plant_type=$1 AND partial_shade=true`,
            [plant_type]
        )
        .then(function(results) {
            //console.log("plants selected db.js: ", results.rows);
            return results.rows;
        });
};
exports.getNewSelectedPlantsShadeIND = plant_type => {
    return db
        .query(
            `SELECT*
            FROM plants
        WHERE plant_type=$1 AND shade=true`,
            [plant_type]
        )
        .then(function(results) {
            //console.log("plants selected db.js: ", results.rows);
            return results.rows;
        });
};


exports.getNewLocShade = (newLocation, plant) => {
    return db
        .query(
            `SELECT*
            FROM plants
        WHERE shade=$1 AND plant_type=$2`,
            [newLocation, plant]
        )
        .then(function(results) {
            console.log("plants selected db.js: ", results.rows);
            return results.rows;
        });
};

exports.getNewLocSun = (newLocation, plant) => {
    return db
        .query(
            `SELECT*
            FROM plants
        WHERE sunny=$1 AND  plant_type=$2`,
            [newLocation, plant]
        )
        .then(function(results) {
            console.log("plants selected db.js: ", results.rows);
            return results.rows;
        });
};
exports.getNewLocBoth = (newLocation, plant) => {
    return db
        .query(
            `SELECT*
            FROM plants
        WHERE partial_shade=$1 AND  plant_type=$2`,
            [newLocation, plant]
        )
        .then(function(results) {
            console.log("plants selected db.js: ", results.rows);
            return results.rows;
        });
};
