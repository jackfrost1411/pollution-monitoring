import React, { Component } from 'react';
import './new.css';
//import His from './history';
import App from './App';
import Slideshow from './Slider';
import Routes from './route';
import LineChart from './components/Line Chart';
//import SplineAreaChart from './components/Spline Area Chart';
//import Canvas from './canvas';
//import Fg from './finalgraph';
let avg=0;
let count=0;
//let month=[];
//let daily=[];
let a_daily=[];
let a_monthly=[];
let d = new Date();
let mon = d.getMonth() + 1;
let dat = d.getDate();
export class New extends Component {
    constructor(props){
      super(props);
      this.state={
        latitude:0,
        longitude:0,
        map:false,
        name:'',
        route:false,
        bingkey:'Ag7bPyAgjQyCWYb_ekQzTb4h1_9jkyDU6WLyEwn6SkdJZ-KhfCvPudoyViaRqw32',
        his:false,
        daily:[],
        monthly:[],
        ss:true
      };
      this.setmap = this.setmap.bind(this);
      this.setroute = this.setroute.bind(this);
      this.sethis = this.sethis.bind(this);
      this.sethome = this.sethome.bind(this);
    }

    setmap(){
      this.setState({
        map:true,
        route:false,
        his:false,
        ss:false
      })
    }

    setroute(){
      this.setState({
        map:false,
        route:true,
        his:false,
        ss:false
      })
    }

    sethome(){
      this.setState({
        map:false,
        route:false,
        his:false,
        ss:true
      })  
    }

    sethis(){
      this.setState({
        map:false,
        route:false,
        his:true,
        ss:false
      })
    }

  	componentWillMount(){
  	  let lat;
      let long;
      navigator.geolocation.getCurrentPosition((position)=>{
      lat=position.coords.latitude;
      long=position.coords.longitude;
      });
      //let url = "https://pollution-b283e.firebaseapp.com/graph";
      //let url = "http://localhost:5000/graph";
      let url = `https://pollution1999.herokuapp.com/graph`;
      fetch(url).then(res=>{
          console.log(res);
        if(res.ok){
          return res.json();
        };
        throw new Error('Request Failed!');
      },networkError=>{
        console.log(networkError.message)
      }).then(jsonRes=>{
        jsonRes.map(ar=>{
          //console.log(ar);
          if(ar.Month === mon){
            if(ar.Date === dat){
              avg += parseInt(ar.AQI);
              count++;
            }

          }
          //console.log(avg);
          //console.log(parseInt(count));
          let obj = { x: ar.Hour, y: parseInt(ar.AQI)};
          let obj2 = { x: ar.Date, y: parseInt(ar.AQI)}
          //console.log(ar.AQI);
          a_daily.push(obj);
          a_monthly.push(obj2);
          return ar;
        });
        //console.log(mon);
        //console.log(avg);
        avg=avg/count;
        //console.log(avg);
          //console.log(dat);
        //console.log(a);
      });
      let a=[];
      for(let i=1;i<=17;i++){
      	let obj={x:i,y:i+200};
      	a.push(obj);
      }
      for(let i=18;i<=31;i++){
      	let obj={x:i,y:230-i};
      	a.push(obj);
      }
      this.setState({
        latitude:lat,
        longitude:long,
        daily:a_daily,
        monthly:a
      });

  	}
    componentDidMount(){
      navigator.geolocation.getCurrentPosition((position)=>{
      let lat=position.coords.latitude;
      let long=position.coords.longitude;
      var query =  lat + "," +  long;
      var searchRequest ='https://dev.virtualearth.net/REST/v1/Locations/' + query + `?o=json&key=${this.state.bingkey}`;
       //console.log(searchRequest);
       const xhr=new XMLHttpRequest();
                  xhr.responseType='json';
                  xhr.onreadystatechange=()=>{
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        //console.log(xhr.response);
                        let name1=xhr.response.resourceSets[0].resources[0].address;
                        let name2 = name1.adminDistrict2 + ' ' + name1.adminDistrict;
         //               console.log(name2);
                        this.setState({
                          name:name2,
                        });
                        //console.log(this.state.name);
                }
                  };
                  xhr.open('GET',searchRequest);
                  xhr.send();
        })
    }
  	render(){
    	return (
        <div className='main1'>
        <div className='h1'>Pollution Monitoring!</div>
		  <div className='bar'>
        <div></div>
        <div></div>
        <div onClick={this.sethome} className='i'>Home</div>
        <div onClick={this.setmap} className='i'>Map</div>
        <div onClick={this.setroute} className='i'>Route</div>
        <div onClick={this.sethis} className='i'>History</div>
        <div></div>
        <div></div>
      </div>
        {this.state.map? <App bingkey={this.state.bingkey}/> :<div></div>}
        {this.state.route? <Routes bingkey={this.state.bingkey} name={this.state.name} lat={this.state.latitude} lon={this.state.longitude}/> :<div></div>}
        {this.state.his? <LineChart ar1={this.state.monthly} ar={this.state.daily}/> :<div></div>}
        {this.state.ss? Slideshow() :<></>}
        
      </div>
		);
  }
}
export default New;