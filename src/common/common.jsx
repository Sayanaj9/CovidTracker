import React, { useEffect, useState }from "react";
import LineChart from "../lineChart/lineChart";
import PieChart from "../pieChart/pieChart";
import MapView from "../map/mapView";
import States from "../Services/statedata";
import Position from "../Services/statePosition.json";
import "bootstrap/scss/bootstrap.scss";
import Data from "../Services/statedata.json";
import {DropdownButton,Dropdown } from "react-bootstrap";
import {connect} from 'react-redux';
import stateAction from "../store/stateAction";

function Common(props)
{
    const [totalCases,setTotaldata]=useState([]);
    const [activeCases,setActivedata]=useState([]);
    const [recoveredCases,setRecovereddata]=useState([]);
    const [fatalCases,setFataldata]=useState([]);
    const [timeline,setTimeline]=useState([]);
    const [position,setPosition]=useState([20.5937,78.9629]);
    const [pieData,setPieData]=useState([]);
    const [mapData,setMapData]=useState([]);
    const [selectedState,setSelectedState]=useState('Select State');


  
    function handleSelection(e)
    {
       
        let stateName=e.target.name;
        let total=[];
        let active=[];
        let recovered=[];
        let death=[];
        let time=[];

        let totalData=0;
        let activeData=0;
        let recoveredData=0;
        let fatalData=0;

        
        
        let piedata=[];
        setSelectedState(stateName);
    
        Data.states.filter((data)=>(Object.keys(data)[0]===stateName) && Object.values(data)[0]
        .map((coviddata)=>(  totalData=totalData+coviddata?.total,
            activeData=activeData+coviddata?.active,
            recoveredData=recoveredData+coviddata?.cured,
            fatalData=fatalData+coviddata?.death,
            total.push(coviddata?.total),
            active.push(coviddata?.active),
            recovered.push(coviddata?.cured),
            death.push(coviddata?.death),
            time.push(coviddata?.time)
         
        
        )));

        Position.position.filter((data)=>(Object.keys(data)[0]===stateName) && setPosition(Object.values(data)[0]));


        //Line chart Info
        setTotaldata(total);
        setActivedata(active);
        setRecovereddata(recovered);
        setFataldata(death);
        setTimeline(time);


        //Pie Chart Info
       
      
        piedata.push(totalData,activeData,recoveredData,fatalData);
         setPieData(piedata);

        //mapData
            let mapDataarr=[];
            mapDataarr.push(totalData,activeData,recoveredData,fatalData)
            setMapData(mapDataarr);
       
        
    }

    return(
        <div className="app">
                <div className="stateSelection">
                    <p className="stateSelection_header">COVID-19 Tracker</p>
                    <DropdownButton id="dropdown-basic-button" title={selectedState} className="stateDropdown">
                        {States.map((state)=>
                            <Dropdown.Item  key={state} name={state} onClick={handleSelection}>{state}</Dropdown.Item>)}
                             
                    </DropdownButton>
                </div>
                <div className="representation row">
                       
                                <div className="col-lg-4 col-12 p-0 col-md-4">
                                  <div className="linechart col-12 p-0">
                                    <LineChart total={totalCases} timeline={timeline}  active={activeCases} fatal={fatalCases} recovered={recoveredCases}/>
                                 </div>
                                 <div className="piechart col-12 p-0">
                                    <PieChart data={pieData}/>
                                 </div>
                                </div>
                                <div className="col-lg-1 col-md-1">

                                </div>
                        
                                 <div className="mapview col-lg-7 col-12 p-0 col-md-7">
                                    <MapView position={position}  mapData={mapData}/>
                                </div>     
                          
                </div>

        </div>
    )
}


const mapStateToProps = (state) => {
    const {data}=state.Data || {};
    const india=data;
    return {india};
}




const mapDispatchToProps ={
    add: stateAction.addAction
   
};


export default connect(mapStateToProps, mapDispatchToProps)(Common);

