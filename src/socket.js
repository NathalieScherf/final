import * as io from 'socket.io-client';
import {showPlants, changeDisplay, removePlants} from './actions';


let socket;
//cerate a new socket, but only if there is not one already
export function initSocket(store){
    if (!socket){
        socket= io.connect();
        //listen for event:


        socket.on('displayPlants', listOfPlants=>{
            console.log('listOfPlants', listOfPlants);
            store.dispatch( showPlants(listOfPlants) );
        });
        socket.on('newSelection', listOfPlants=>{
            console.log('newSelection', listOfPlants);
            store.dispatch( changeDisplay(listOfPlants) );
        });
        socket.on('removeSelection', removedPlants=>{
            console.log('removeSelection', removedPlants);
            store.dispatch(removePlants(removedPlants));
        });

        //most of our client side socket code will go here:
        //listen for stuff from the server: on('name of message from server', function )
        //function will run when client hears the event, takes data from socket.emit as agrument


    }
    return socket;
}
