import React, { Component } from 'react';
import { ReactBingmaps } from 'react-bingmaps';
import './map.css';
export class Map extends Component {
  constructor(props){
    super(props);
    this.state={
      bingkey:this.props.bingkey,
      name:this.props.name,
      maps:false,
      latitude: this.props.lat,
      longitude: this.props.lon,
      AQI: this.props.aqi
    }
    this.getLocation=this.getLocation.bind(this);
  }
  getLocation(latitude, longitude) {
    // var query =  this.state.latitude + "," +  this.state.longitude;
    // var searchRequest = 'https://dev.virtualearth.net/REST/v1/Locations/' + query + `?o=json&key=${this.state.bingkey}`;
    // const xhr=new XMLHttpRequest();
    // xhr.responseType='json';
    // xhr.onreadystatechange=()=>{
    //   if (xhr.readyState === XMLHttpRequest.DONE) {
    //     let name1=xhr.response.resourceSets[0].resources[0].name;
    //     this.setState({
    //       name:name1,
    //       maps:true
    //     });
    //     console.log(this.state.maps);
    //   }
    // };
    // xhr.open('GET',searchRequest);
    // xhr.send();
  }
  componentWillMount(){
  }
  render() {
    return (<ReactBingmaps	pushPins = {    
            [
              {
                "location":[this.state.latitude, this.state.longitude], "option":{ color: 'red' }, "addHandler": {"type" : "click" }
              }
            ]
          }
          infoboxes = {
            [
              {
                "location":[this.state.latitude, this.state.longitude],
                "option":{ title: `${this.state.name}`,
                 description: `AQI:${this.state.AQI}` }, "addHandler": {"type" : "click"}
                }
              
            ]
          }
		  bingmapKey = {this.state.bingkey} 
		  center = {[this.state.latitude, this.state.longitude]}
		  ></ReactBingmaps>
   )
  }
}
export default Map;