import React from 'react';
import Plot from 'react-plotly.js';
import {connect} from 'react-redux';
import stateAction from "../store/stateAction";


function PieChart (props) {
  let initialArr=(props.india!==null&&props.india!==undefined)&&Object.values(props.india)[0];
  let dataArr=[];
  let arr=dataArr.push(initialArr[0]?.total,initialArr[0]?.active,initialArr[0]?.cured,initialArr[0]?.death);
  let piedata=(props?.data?.length!==0)? props?.data : (initialArr!==null && initialArr!==undefined) ?
    dataArr :0;

    return (
      <Plot
        data={[{
            values:piedata,
            labels: ['Total', 'Active', 'Recovered','Fatal'],
            type: 'pie',
           
            textinfo: "label+percent",
            textposition: "outside",
          }]}
         layout={ {width: 210,height:240, title: 'Pie Chart',
          margin: { l: 20,r: 20,b: 70, t: 70,pad: 2},
        titlefont: { size:15 },
        showlegend: false
      } }
      
      />
    );
}


const mapStateToProps = (state) => {
  const {data}=state.Data || {};
  const india=data;
  return {india};
}

const mapDispatchToProps ={
  add: stateAction.addAction
 
};
export default connect(mapStateToProps, mapDispatchToProps)(PieChart);