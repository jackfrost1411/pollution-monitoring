import React, { Component } from 'react';
import './App.css';
import Map from './map';
let lat;
let long;
export class App extends Component {
  	constructor(props){
  		super(props);
  		this.state={
        aqi:0,
  			cl:false,
  			color: 'white',
  			latitude: 0,
        bingkey:this.props.bingkey,
  			longitude: 0,
        name:' ',
  			name2:'Processing..'
  		};
  		this.fet=this.fet.bind(this);
  	}

  	fet(lat,long){
      //let url = `https://pollution-b283e.firebaseapp.com/getdata?lat=${lat}&long=${long}`;
      //let url = `http://localhost:5000/getdata?lat=${lat}&long=${long}`;
      let url = `https://pollution1999.herokuapp.com/getdata?lat=${lat}&long=${long}`;
  		fetch(url).then(res=>{
          console.log(res);
  			if(res.ok){
  				return res.json();
  			};
  			throw new Error('Request Failed!');
  		},networkError=>{
  			console.log(networkError.message)
  		}).then(jsonRes=>{
        //aqi=jsonRes[0][0].AQI;
        this.setState({
          aqi:jsonRes[0][0].AQI
        });
  			if(jsonRes[0][0].AQI>=0 && jsonRes[0][0].AQI<=50){
  				this.setState({color:'green',name2:'It\'s Good'})
  			} else if(jsonRes[0][0].AQI>=51 && jsonRes[0][0].AQI<=100){
  				this.setState({color:'yellow',name2:'It\'s Moderate'})
  			} else if(jsonRes[0][0].AQI>=101 && jsonRes[0][0].AQI<=150){
  				this.setState({color:'orange',name2:'It\'s Unhealthy for Sensitive Groups'})
  			} else if(jsonRes[0][0].AQI>=151 && jsonRes[0][0].AQI<=200){
  				this.setState({color:'red',name2:'It\'s Unhealthy'})
  			} else if(jsonRes[0][0].AQI>=201 && jsonRes[0][0].AQI<=300){
  				this.setState({color:'purple',name2:'It\'s Very Unhealthy'})
  			} else if(jsonRes[0][0].AQI>=301 && jsonRes[0][0].AQI<=500){
  				this.setState({color:'maroon',name2:'It\'s Hazardous!!!!'})
  			}
  			console.log(this.state.color);
        console.log(this.state.aqi);
  		  var query =  lat + "," +  long;
        var searchRequest = 'https://dev.virtualearth.net/REST/v1/Locations/' + query + `?o=json&key=${this.state.bingkey}`;
        const xhr=new XMLHttpRequest();
        xhr.responseType='json';
        xhr.onreadystatechange=()=>{
          if (xhr.readyState === XMLHttpRequest.DONE) {
            let name1=xhr.response.resourceSets[0].resources[0].name;
            this.setState({
              name:name1,
              cl:true
            });
            console.log(this.state.cl);
          }
        };
        xhr.open('GET',searchRequest);
        xhr.send();
        });
  	}
  	// sets(){
   //    //console.log(this.state.aqi);
  	// 	    	
  	//}
  	componentWillMount(){
  		navigator.geolocation.getCurrentPosition((position)=>{
  		lat=position.coords.latitude;
  		long=position.coords.longitude;	
  		this.fet(lat,long);
  		this.setState({
  			latitude:lat,
  			longitude:long,
  		});
  		console.log(this.state.latitude);
  		console.log(this.state.longitude);
      });
  		// this.sets();
  	}

  	render(){
    	return (
			<div>
			<div className='container' style={{'backgroundColor':this.state.color}}>
			<div className='de'>{this.state.name2}</div>
			</div>
			<div className='maps'>
			{this.state.cl ? <Map bingkey={this.state.bingkey} aqi={this.state.aqi}
       lat={this.state.latitude} lon={this.state.longitude} name={this.state.name}/> : 'LOCATING YOU....'}
			</div>
			</div>
		);
  }
}
export default App;