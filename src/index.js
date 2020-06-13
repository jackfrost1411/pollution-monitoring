import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import LineChart from './components/Line Chart';
import New from './New';
import * as serviceWorker from './serviceWorker';
//import GoogleMapReact from 'google-map-react';
ReactDOM.render(<New/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();