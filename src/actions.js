

export async function showPlants(listOfPlants) {

    console.log("actions showPlants", listOfPlants);
    return {
        type: 'DISPLAY_PLANTS',
        plants: listOfPlants
    };
}
export async function changeDisplay(listOfPlants) {

    console.log("add plants ", listOfPlants);
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

export async function hideButton(){
    console.log("hide button");
    return {
        type:'HIDE_BUTTON'
    };
}
