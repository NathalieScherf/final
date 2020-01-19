import * as io from 'socket.io-client';
import {showPlants, changeDisplay, removePlants, changeLocation, changePolinator} from './actions';


let socket;
export function initSocket(store){
    if (!socket){
        socket= io.connect();
        socket.on('displayPlants', listOfPlants => {
            store.dispatch( showPlants(listOfPlants) );
        });
        socket.on('newSelection', listOfPlants => {
            store.dispatch( changeDisplay(listOfPlants));
        });
        socket.on('removeSelection', removedPlants => {
            store.dispatch(removePlants(removedPlants));
        });

        socket.on('newLocation', listOfPlants => {
            store.dispatch(changeLocation(listOfPlants));
        });
        socket.on('newPolinator', listOfPlants => {
            store.dispatch(changePolinator(listOfPlants));
        })
    }
    return socket;
}
