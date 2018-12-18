import React from 'react';
import{ connect } from 'react-redux';
import {initSocket} from './socket';
import Selection from './selection';
import {hideButton} from './actions';
class SelectPlants extends React.Component{
    constructor(){
        super();
        this.handleInputChangeLoc = this.handleInputChangeLoc.bind(this);
        this.handleInputChangePlant = this.handleInputChangePlant.bind(this);
        this.handleSelection=this.handleSelection.bind(this);
        this.hideButton=this.hideButton.bind(this);
        this.state={};
    }


    handleInputChangeLoc(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const location = target.name;
        console.log(location, value);
        this.setState({
            location: location
        });

    }
    handleInputChangePlant(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        let plant_type = target.name;
        console.log(plant_type, value, this.state.plant_type);
        if(this.props.plants !== undefined){
            console.log("this.state from inside ifblock", this.props, target.name);
            let plant_type = target.name;
            this.setState({
                plant_type: plant_type,
            });
            let socket = initSocket();
            socket.emit('changedSelection', target.name);
        }
        if (e.target.checked == false){
            console.log("filter out", target.name);
            let socket = initSocket();
            socket.emit('removeSelection', target.name);
        }

        this.setState({
            plant_type: plant_type,
        });

    }
    handleSelection(e){
        e.preventDefault();
        let socket = initSocket();
        console.log("selection was sent", this.state);
        socket.emit('plantsSelected', this.state);
        this.props.dispatch(hideButton());
        console.log("in handle selection");

    }
    hideButton(){
        console.log("hide button clicked");

    }

    render(){

        return(
            <div className='plantsAndSelection'>
                <div className='select-plants-contianer'>

                    <form onSubmit={this.handleSelection}>
                        <h3>How much light do you get on your balcony?</h3>
                        <label>Sunny
                            <input type="checkbox"  name="sunny" onChange={this.handleInputChangeLoc}/>
                        </label>
                        <label>Shady
                            <input type="checkbox"  name="shade" onChange={this.handleInputChangeLoc}/>
                        </label>
                        <label>Both
                            <input type="checkbox" name="partial_shade" onChange={this.handleInputChangeLoc}/>
                        </label>


                        <h3>What types of plants do you like?</h3>
                        <label>Flowers
                            <input type="checkbox"  name="flower" onChange={this.handleInputChangePlant}/>
                        </label>
                        <label>Herbs
                            <input type="checkbox"  name="herb" onChange={this.handleInputChangePlant}/>
                        </label>
                        <label>Vegetables
                            <input type="checkbox" name="vegetable" onChange={this.handleInputChangePlant}/>
                        </label>
                        {!this.props.button &&
                        <button > Show plants </button>}
                    </form>
                </div>
                <Selection/>
            </div>
        );
    }
}
//ändra saker här:
function mapStateToProps(state) {
    console.log("state from selectPlants", state);
    var plants =state.plants;
    var buttonIsHidden =state.buttonIsHidden;
    return {
        plants: plants,
        button: buttonIsHidden

    };
}


export default connect(mapStateToProps)(SelectPlants);
