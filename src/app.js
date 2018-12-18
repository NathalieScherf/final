import React from 'react';
//import axios from './axios';
import Nav from './nav';
import SelectPlants from './selectPlants';
import About from './about';
import {BrowserRouter, Route} from 'react-router-dom';

export default class App extends React.Component{
    constructor(){
        super();



    }



    // #1 render
    render(){
        return(
            <div className='page'>
                <div className='nav-bar'>
                    <Nav/>

                </div>
                <div className='main-box'>

                    <BrowserRouter>

                        <div>

                            <Route exact path='/' render={()=>{ return <SelectPlants
                                
                            />;

                            }}/>

                            <Route path ='/about' render={()=>{
                                return <About />;
                            }}/>
                        </div>
                    </BrowserRouter>
                </div>

            </div>
        );
    }
}
