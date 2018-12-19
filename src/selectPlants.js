import React from 'react';
import{ connect } from 'react-redux';
import {initSocket} from './socket';
import Selection from './selection';
import {hideButton, selectedPlants, selectedLoc} from './actions';
class SelectPlants extends React.Component{
    constructor(){
        super();
        this.handleInputChangePol =this.handleInputChangePol.bind(this);
        this.handleInputChangeLoc = this.handleInputChangeLoc.bind(this);
        this.handleInputChangePlant = this.handleInputChangePlant.bind(this);
        this.handleSelection=this.handleSelection.bind(this);

        this.state={};
    }


    handleInputChangeLoc(e) {
        const target = e.target;
        //const value = target.type === 'checkbox' ? target.checked : target.value;
        //const location = target.name;
        //    this.props.dispatch(selectedLoc(location));
        //    let socket = initSocket();
        //    console.log("in location", this.props);
        //    socket.emit('changeLocation', target.name, this.props.selection);
        if (target.name=='sunny'){
            this.setState({
                sunny: true
            });
        }
        if (target.name=='shade'){
            this.setState({
                shade: true
            });
        }
        if (target.name=='partial_shade'){
            this.setState({
                partial_shade: true
            });
        }
    }
    handleInputChangePol(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const polinator = target.name;
        //    this.props.dispatch(selectedLoc(location));
        //    let socket = initSocket();
        console.log("in polinator", polinator);
        //    socket.emit('changeLocation', target.name, this.props.selection);
        if(polinator == "yes"){
            this.setState({
                polinator: true
            });}
        if(polinator == "no"){
            this.setState({
                polinator: false
            });}
    }

    handleInputChangePlant(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        console.log("value of target", value);
        let plant_type = target.name;

        this.setState({
            plant_type: plant_type,
        });
        //    this.props.dispatch(selectedPlants(plant_type));
        if(this.props.plants !== undefined){
            console.log("this.state from inside ifblock", this.props, target.name);
            //let plant_type = target.name;
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



    }
    handleSelection(e){
        e.preventDefault();
        let socket = initSocket();
        console.log("state in handle selection sent", this.state);
        socket.emit('plantsSelected', this.state);
        this.props.dispatch(hideButton());
    }


    render(){

        return(
            <div className='plantsAndSelection'>
                <div className='select-plants-contianer'>

                    <form onSubmit={this.handleSelection}>



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
                        <h3>How much light does your balcony get?</h3>
                        <label>Sunny
                            <input type="checkbox"  name="sunny" onChange={this.handleInputChangeLoc}/>
                        </label>
                        <label>Shady
                            <input type="checkbox"  name="shade" onChange={this.handleInputChangeLoc}/>
                        </label>
                        <label>Both
                            <input type="checkbox" name="partial_shade" onChange={this.handleInputChangeLoc}/>
                        </label>
                        <h3>Do you want to attract polinators?</h3>
                        <label>Yes, please!
                            <input type="checkbox"  name="yes" onChange={this.handleInputChangePol}/>
                        </label>
                        <label>No!
                            <input type="checkbox"  name="no" onChange={this.handleInputChangePol}/>
                        </label>

                        <br/>
                        {!this.props.button &&     <button > Show plants </button>}

                    </form>

                </div>
                <Selection/>
            </div>
        );
    }
}
//ändra saker här:
function mapStateToProps(state) {
    console.log("state from selectPlants Component", state);
    var plants =state.plants;
    var buttonIsHidden =state.buttonIsHidden;
    var selectedPlants=state.selPlants;
    var location=state.location;
    return {
        plants: plants,
        button: buttonIsHidden,
        selection: selectedPlants,
        location: location

    };
}


export default connect(mapStateToProps)(SelectPlants);
