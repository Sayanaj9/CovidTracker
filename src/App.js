import './App.css';
import "./scss/common.scss";
import React, { useEffect}from "react";
import Common from './common/common';
import {connect} from 'react-redux';
import stateAction from "./store/stateAction";
import IndiaData from "./Services/indiaData.json";

function App(props) {
  useEffect(()=>{
    props.add(IndiaData)
  })

  return (
    <div className="App" >
      <Common/>
    </div>  
  );
}


const mapStateToProps = state => ({
    
});

const mapDispatchToProps ={
    add: stateAction.addAction
   
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
