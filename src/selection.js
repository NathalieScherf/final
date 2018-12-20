import React from 'react';
import{ connect } from 'react-redux';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
class Selection extends React.Component{
    constructor(){
        super();
        this.exportToPdf = this.exportToPdf.bind(this);
    }
    exportToPdf(e){

        e.preventDefault();


        console.log("submit to pdf", this.props.plants);
        /*var arrayOfSelectionObj= this.props.plants;
        let doc = new jsPDF();
        doc.text( 50, 20,"Your selection:" );
        var text = [];
        for (var i in arrayOfSelectionObj){
            text.push(arrayOfSelectionObj[i]['name'] + ' ' + arrayOfSelectionObj[i]['description']);
        }
        doc.text(text, 20, 50);
        doc.save('Test.pdf');*/


        const input = document.getElementById('selection');
        html2canvas(input, {scale:0.8}) //x
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save("download.pdf");
            })
        ;
    }


    render(){

        return(
            <div id='selection'>

                {this.props.button && <h1>HERE IS YOUR SELECTION!</h1>}

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
                {this.props.button && <button onClick={this.exportToPdf}> Export these plants  </button>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("state from selection Component", state);
    var plants =state.plants;
    var buttonIsHidden =state.buttonIsHidden;
    return {
        plants: plants,
        button: buttonIsHidden,

    };
}


export default connect(mapStateToProps)(Selection);
