
export async function showPlants(listOfPlants) {
    return {
        type: 'DISPLAY_PLANTS',
        plants: listOfPlants
    };
}

export async function selectionPlant(listOfPlants) {
    return {
        type: 'INIT_SELECT_PLANTS',
        plants: listOfPlants
    };
}


export async function changeDisplay(listOfPlants) {
    return {
        type: 'ADD_PLANTS',
        newPlants: listOfPlants
    };
}

export async function removePlantType(removedPlants) {
    return {
        type: 'REMOVE_PLANTS',
        remPlants: removedPlants
    };
}

export async function newSelectionPlant(selection){
    console.log("selectedPlants from action", selection );
    return {
        type: 'SELECT_PLANTS',
        newPlantSelected: selection
    };
}

export async function selectedPol(selection){
    return {
        type: 'SELECT_POL',
        polSelected: selection
    };
}
export async function selectedPlants(selection){
    return {
        type: 'SELECT_PLANTS',
        selPlants: selection
    };
}

export async function selectedLoc(selection){
    return {
        type: 'SELECT_LOC',
        location: selection
    };
}
export async function changeLocation(selection){
    return {
        type: 'CHANGE_LOC',
        plants: selection
    };
}

export async function changePolinator(selection){
    return {
        type: 'CHANGE_POL',
        plants: selection
    };
}
export async function hideButton(){
    return {
        type:'HIDE_BUTTON'
    };
}
