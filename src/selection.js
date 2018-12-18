import React from 'react';
import{ connect } from 'react-redux';
import {initSocket} from './socket';


class Selection extends React.Component{
    constructor(){
        super();
    }
    sendMessage(e){
        let socket = initSocket();
        if(e.which===13){
            console.log("message was sent", e.target.value);
            socket.emit('newMsg', e.target.value);
            e.target.value ='';
            e.preventDefault();
        }
    }
    /*    componentDidUpdate(){
        //need to add some code here
        console.log("update", this.elem);
        this.elem.scrollTop=this.elem.scrollHeight;
    }*/

    render(){

        return(
            <div>

                <h1>HERE IS YOUR SELECTION!</h1>

                <div className='selection-contianer'
                    ref={elem => (this.elem = elem)}>
                    {this.props.plants && this.props.plants.map(
                        (plant, idx) => {
                            return (
                                <div className='selectedItem' key={idx} >

                                    <img  src={plant.img} />
                                    <div className='plantInfo'>
                                        <h3>{plant.name} </h3>
                                        <p>{plant.description}</p>


                                    </div>
                                </div>

                            );
                        }
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("state from selection", state);
    var plants =state.plants;

    return {
        plants: plants,

    };
}


export default connect(mapStateToProps)(Selection);
