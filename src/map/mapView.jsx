import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import stateAction from "../store/stateAction";
import {connect} from 'react-redux';
import { Icon } from "leaflet";

class MapView extends React.Component {
    render() {
     
      let position=(this.props!==undefined &&this.props!==null) ? this.props?.position :[20.5937,78.9629];
      let dataArr=(this.props.india!==null&&this.props.india!==undefined)&&Object.values(this.props.india)[0];
      let total=(this.props?.mapData?.length!==0)? this.props?.mapData[0]: (dataArr!==null && dataArr!==undefined) ?dataArr[0]?.total:0;
      let active=(this.props?.mapData?.length!==0)? this.props?.mapData[1]: (dataArr!==null && dataArr!==undefined) ?dataArr[0]?.active:0;
      let fatal=(this.props?.mapData?.length!==0)? this.props?.mapData[3]: (dataArr!==null && dataArr!==undefined) ?dataArr[0]?.death:0;
      let recovered=(this.props?.mapData?.length!==0)? this.props?.mapData[2]: (dataArr!==null && dataArr!==undefined) ?dataArr[0]?.cured:0;
     
      return (
            <MapContainer center={position} zoom={3} scrollWheelZoom={false} className="container_map" bounds={position}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          <Marker position={position}> 
                <Popup>
                  Total:{total} <br/>
                  Active:{active}<br/> 
                  Recovered : {recovered} <br/>
                   Fatal : {fatal} <br/> 
              
              </Popup> 
             </Marker>

            
        </MapContainer>
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
export default connect(mapStateToProps, mapDispatchToProps)(MapView);