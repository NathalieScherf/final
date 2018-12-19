

export async function showPlants(listOfPlants) {

    console.log("actions showPlants", listOfPlants);
    return {
        type: 'DISPLAY_PLANTS',
        plants: listOfPlants
    };
}
export async function changeDisplay(listOfPlants) {

    console.log("add plants in action ", listOfPlants);
    return {
        type: 'ADD_PLANTS',
        newPlants: listOfPlants
    };
}


export async function removePlants(removedPlants) {

    console.log("remove plants ", removedPlants);
    return {
        type: 'REMOVE_PLANTS',
        remPlants: removedPlants
    };
}

export async function selectedPlants(selection){
    console.log("selectedPlants", );
    return {
        type: 'SELECT_PLANTS',
        selPlants: selection
    };
}

export async function selectedLoc(selection){
    console.log("selectedLocation", selection);
    return {
        type: 'SELECT_LOC',
        location: selection
    };
}
export async function hideButton(){
    console.log("hide button");
    return {
        type:'HIDE_BUTTON'
    };
}
