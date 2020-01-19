export default function reducer(state = {}, action) {
    if(action.type === 'SELECT_PLANTS'){
        state = {
            ...state,
            newPlantSelected: action.newPlantSelected
        };
    }
    if(action.type === 'INIT_SELECT_PLANTS'){
        state = {
            ...state,
            plants: action.plants
        };
    }
    if(action.type === 'SELECT_LOC'){
        state = {
            ...state,
            location: action.location,

        };
    }
    if(action.type === 'SELECT_POL'){
        state = {
            ...state,
            polSelected: action.polSelected,
        };
    }

    if(action.type === 'DISPLAY_PLANTS'){
        state = {
            ...state,
            plants:  action.plants
        };
    }
    if(action.type === 'ADD_PLANTS'){
        state = {
            ...state,
            plants:  [...state.plants, ...action.newPlants]
        };
    }
    if(action.type === 'CHANGE_LOC'){
        state = {
            ...state,
            plants:  action.plants
        };
    }

    if(action.type === 'CHANGE_POL'){
        state = {
            ...state,
            plants:  action.plants
        };
    }
    if(action.type  === 'REMOVE_PLANTS'){
        state = {
            ...state,
            plants: state.plants && state.plants.filter(plant => {
                if (plant.plant_type === action.remPlants) {
                    return ;
                } else {
                    return {plant};
                }
            })
        };
    }
    if(action.type === 'HIDE_BUTTON'){
        state = {
            ...state,
            buttonIsHidden: true};
    }
    return state;
}
