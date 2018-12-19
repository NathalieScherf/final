
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

exports.getSelectedPlants = (plant_type, polinator) => {
    console.log("plant_type from db", plant_type);
    return db
        .query(
            `SELECT*
            FROM plants
        WHERE plant_type=$1 AND polinator=$2`,
            [plant_type, polinator]
        )
        .then(function(results) {
            console.log("plants selected db.js: ", results.rows);
            return results.rows;
        });
};
exports.getSelectedPlantsType = (plant_type) => {
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
};
exports.getNewSelectedPlants = plant_type => {
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
};
