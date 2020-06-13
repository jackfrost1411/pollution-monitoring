import React, { Component } from 'react';
import { ReactBingmaps } from 'react-bingmaps';
import './route.css';
let data;
export class Route extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	name:'hi',
    	district:'hii',
      bingmapKey: this.props.bingkey,
      directions: {
        "inputPanel": "inputPanel",
        "renderOptions": {"itineraryContainer": "itineraryContainer" },
        "requestOptions": {"routeMode": "driving", "maxRoutes": 2},
        "wayPoints": [
              {
                address: this.props.name
              },
              {
                address: ' '
              }
            ]
      }
    }
    this.changeState = this.changeState.bind(this);
  }
  changeState(){
    this.setState({
      directions: {
        
        "renderOptions": {"itineraryContainer": "itineraryContainer" },
        "requestOptions": {"routeMode": "driving", "maxRoutes": 2},
        "wayPoints": [
              {
                address: this.props.name
              },
              {
                address: 'Chandkheda, Gujarat'
              },
              {
                address: 'Ahmedabad, Gujarat'
              }
            ]
      }
    })
  }
  func(){
    data = window.document.querySelectorAll("input[title]");
    console.log(data.length);
    for(let i=0;i<data.length;i++){
      console.log(data[i].attributes["aria-label"]);
    }
  }
    render() {
      //console.log(document.getElementById('inputPanel').value);
    return (<div>
          <div className = "map-three">
            <ReactBingmaps
              className = "customClass"
              id = "eleven" 
              center = {[this.props.lat, this.props.lon]}
              bingmapKey = {this.state.bingmapKey}
              directions = {this.state.directions}
            > 
            </ReactBingmaps>
             <div className="direction-container">
               <div className="input-panel" id='inputPanel'></div>
               <div className="itinerary-container" id='itineraryContainer'></div>
              </div>
              <button onClick={this.func}>Get Data</button>
          </div></div>
    );
  }
}


export default Route;