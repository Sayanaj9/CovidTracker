import React from 'react';
import Plot from 'react-plotly.js';
import {connect} from 'react-redux';
import stateAction from "../store/stateAction";

class LineChart extends React.Component {
  render() {
    let dataArr=(this.props.india!==null&&this.props.india!==undefined)&&Object.values(this.props.india)[0];
    let total=(this.props?.total?.length!==0)? this.props?.total: (dataArr!==null && dataArr!==undefined) ?[dataArr[0]?.total]:0;
    let active=(this.props?.active?.length!==0)? this.props?.active: (dataArr!==null && dataArr!==undefined) ?[dataArr[0]?.active]:0;
    let fatal=(this.props?.fatal?.length!==0)? this.props?.fatal: (dataArr!==null && dataArr!==undefined) ?[dataArr[0]?.death]:0;
    let recovered=(this.props?.recovered?.length!==0)? this.props?.recovered: (dataArr!==null && dataArr!==undefined) ?[dataArr[0]?.cured]:0;
    let timeline=(this.props?.timeline?.length!==0)? this.props?.timeline: (dataArr!==null && dataArr!==undefined) ?[dataArr[0]?.time]:0;



    return (
      <Plot
   
        data={[
          {
            x: total,
            y: timeline,
            type: 'scatter',
            name:'Total',
            mode: 'lines+markers'

          },
          {
            x: active,
            y: timeline,
            type: 'scatter',
            name:'Active',
            mode: 'lines+markers'
          },
          {
            x: fatal ,
            y:  timeline,
            type: 'scatter',
            name:'Fatal',
            mode: 'lines+markers'
          },
          {
            x: recovered,
            y: timeline,
            type: 'scatter',
            name:'Cured',
            mode: 'lines+markers'
          }

        ]}
        layout={ {width: 212, height: 240, title: 'Line Chart',   titlefont: { size:15 }, legend: {"orientation": "h"} } }
        
      />
    );
  }
}

const mapStateToProps = (state) => {
  const {data}=state.Data || {};
  const india=data;
  return {india};
}




const mapDispatchToProps ={
  add: stateAction.addAction
 
};
export default connect(mapStateToProps, mapDispatchToProps)(LineChart);


