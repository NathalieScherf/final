import React from 'react';
import{ connect } from 'react-redux';
import {initSocket} from './socket';
import Selection from './selection';
import {hideButton, selectedLoc, newSelectionPlant, selectedPol} from './actions';
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
        const location = target.value;
        //this.props.dispatch(selectedLoc(location));
        //    let socket = initSocket();
        //    console.log("in location", this.state);
        //    socket.emit('changeLocation', target.name, this.props.selection);
        if (target.value=='sunny'){
            this.setState({
                sunny: true
            });
            this.props.dispatch(selectedLoc(location));
        }
        if (target.value=='shade'){
            this.setState({
                shade: true
            });
            this.props.dispatch(selectedLoc(location));
        }
        if (target.value=='partial_shade'){
            this.setState({
                partial_shade: true
            });
            this.props.dispatch(selectedLoc(location));
        }
        console.log("from handle change location", this.props);
        //change selection responsive:
        if(this.props.location =='sunny' && target.value =='shade'){
            console.log("this.state from inside ifblock",this.state, this.props, target.value);
            let socket = initSocket();
            //    var LocObject={shade: true};
            socket.emit('changedSelectionLocShade', true);
        }
        if(this.props.location == 'partial_shade' && target.value =='shade'){
            console.log("this.state from inside ifblock", this.props, target.value);
            let socket = initSocket();
            socket.emit('changedSelectionLocShade', true);
        }
        if(this.props.location =='sunny' && target.value =='partial_shade'){
            console.log("this.state from inside ifblock", this.props, target.value);

            let socket = initSocket();
            socket.emit('changedSelectionLocBoth', true);
        }
        if(this.props.location=='shade' && target.value =='partial_shade'){
            console.log("this.state from inside ifblock", this.props, target.value);

            let socket = initSocket();
            socket.emit('changedSelectionLocBoth', true);
        }
        if(this.props.location=='partial_shade' && target.value =='sunny'){
            console.log("this.state from inside ifblock", this.props, target.value);

            let socket = initSocket();
            socket.emit('changedSelectionLocSun', true);
        }
        if(this.props.location=='shade' && target.value =='sunny'){
            console.log("this.state from inside ifblock", this.props, target.value);

            let socket = initSocket();
            socket.emit('changedSelectionLocSun', true);
        }

    }
    handleInputChangePol(e) {

        const target = e.target;
        //const value = target.type === 'checkbox' ? target.checked : target.value;

        if(target.value == "yes"){
            this.setState({
                polinator: true
            });
            this.props.dispatch(selectedPol(target.value));}
        if(target.value == "no"){
            this.setState({
                polinator: false
            });
            this.props.dispatch(selectedPol(target.value));}
        if(target.value == "indeter"){
            this.setState({
                polinator: 'indeter'
            });
            this.props.dispatch(selectedPol(target.value));}

        // change in polinator
        if(this.props.polSelected !== undefined){
            console.log("change in polinator", this.props);
            if( this.props.polSelected !== 'no'&&target.value == 'no'){
                console.log("change to no");
                let socket = initSocket();

                var oldLocation=this.props.location;
                var pol=target.value;

                socket.emit('changedSelectionPolNO', {oldLocation, pol});
                //socket.emit('', true);
            }
            if(this.props.polSelected !== 'yes'&&target.value == 'yes' ){
                console.log("change to yes");
                let socket = initSocket();
                oldLocation=this.props.location;
                pol=target.value;
                socket.emit('changedSelectionPolYES', {oldLocation, pol});
            }
            if(this.props.polSelected !== 'indeter'&&target.value == 'indeter'){
                console.log("change to indeter");
                let socket = initSocket();
                oldLocation=this.props.location;
                pol=target.value;
                socket.emit('changedSelectionPolINDETER', {oldLocation, pol});
            }
        }
    }

    handleInputChangePlant(e) {
        const target = e.target;
        //const value = target.type === 'checkbox' ? target.checked : target.value;

        let plant_type = target.name;
        this.setState({
            plant_type: plant_type,
        });

        if(this.props.plants !== undefined && e.target.checked==true){
        //    console.log("this.state from inside ifblock", this.props, target.name);
            //let plant_type = target.name;
            this.setState({
                plant_type: plant_type,
            });
            this.props.dispatch(newSelectionPlant(plant_type));
            //in i props
            console.log("this.state from inside ifblock in change plant", this.props);
            let socket = initSocket();
            var newPlant=target.name;
            var oldLocation=this.props.location;
            var oldPol=this.props.polSelected;
            //skicka plant_type
            socket.emit('changedSelection', {newPlant, oldLocation, oldPol});
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



                        <h3>Which  type of plants do you like?</h3>
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
                        <label>Sun all day
                            <input type="radio"  name="light" value="sunny" onChange={this.handleInputChangeLoc}/>
                        </label>
                        <label>Shade all day
                            <input type="radio" name="light" value="shade" onChange={this.handleInputChangeLoc}/>
                        </label>
                        <label>Sun and shade
                            <input type="radio" name="light" value="partial_shade" onChange={this.handleInputChangeLoc}/>
                        </label>
                        <h3>Do you want to attract polinators?</h3>
                        <label>Yes, please!
                            <input type="radio"  name="pol" value="yes" onChange={this.handleInputChangePol}/>
                        </label>
                        <label>No!
                            <input type="radio"  name="pol" value="no" onChange={this.handleInputChangePol}/>
                        </label>
                        <label>I do not  care!
                            <input type="radio"  name="pol" value="indeter" onChange={this.handleInputChangePol}/>
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
    var polSelected=state.polSelected;
    return {
        plants: plants,
        button: buttonIsHidden,
        selection: selectedPlants,
        location: location,
        polSelected:polSelected

    };
}


export default connect(mapStateToProps)(SelectPlants);
