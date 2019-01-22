
export default function reducer(state = {}, action) {


    if(action.type=='SELECT_PLANTS'){
    //    console.log(action);

        state = {
            ...state,
            newPlantSelected: action.newPlantSelected
        };
    }
    if(action.type=='SELECT_LOC'){
    //    console.log("state from loc in reducer:", action.location);
        state = {
            ...state,
            location: action.location,

        };
    }
    if(action.type=='SELECT_POL'){
    //    console.log("state from loc in reducer:", action.polSelected);
        state = {
            ...state,
            polSelected: action.polSelected,

        };
    }

    if(action.type=='DISPLAY_PLANTS'){
    //    console.log("action from reducer puts into state", action);
        state = {
            ...state,
            plants:  action.plants
        };
    }
    if(action.type=='ADD_PLANTS'){
    //    console.log("reducer new plants", action.newPlants);
        state = {
            ...state,
            plants:   [...state.plants, ...action.newPlants]
        };
    }
    if(action.type=='CHANGE_LOC'){

        state = {
            ...state,
            plants:  action.plants
        };
    }

    if(action.type=='CHANGE_POL'){

        state = {
            ...state,
            plants:  action.plants
        };
    }
    if(action.type=='REMOVE_PLANTS'){

        state = {
            ...state,
            plants: state.plants && state.plants.filter(plant => {
                if (plant.plant_type == action.remPlants) {
                    return ;
                } else {
                    return {plant};
                }
            })
        };
    }
    if(action.type =='HIDE_BUTTON'){

        state={...state,
            buttonIsHidden: true};
    }
    console.log("state from reducer: ", state);
    return state;
}
