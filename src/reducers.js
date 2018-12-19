
export default function reducer(state = {}, action) {


    if(action.type=='SELECT_PLANTS'){
        console.log(action);

        state = {
            ...state,
            selection: action.selPlants
        };
    }
    if(action.type=='SELECT_LOC'){
        console.log("state from loc in reducer:", state);
        state = {
            ...state,
            location: action.location
        };
    }
    if(action.type=='DISPLAY_PLANTS'){
        console.log("action from reducer", action);
        state = {
            ...state,
            plants:  action.plants
        };
    }
    if(action.type=='ADD_PLANTS'){
        console.log("reducer new plants", action.newPlants);
        state = {
            ...state,
            plants:   [...state.plants, ...action.newPlants]
        };
    }
    if(action.type=='REMOVE_PLANTS'){
        console.log("reducer REMOVED plants", action.remPlants);

        //filter:
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
