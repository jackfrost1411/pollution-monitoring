import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
export class LineChart extends Component {
	render() {
	const data=this.props.ar;
	const data1=this.props.ar1;
	//console.log(data);
	//console.log(data1);
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			backgroundColor: '#d1e0e0',
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "Daily data"
			},
			axisY: {
				title: "Air Quality Index",
				includeZero: false,
				interval:50,

				
			},
			axisX: {
				title: "Hour",
				suffix: "00",
				interval: 1
			},
			data: [{
				type: "splineArea",
				toolTipContent: "Hour {x}00: AQI {y}",
				dataPoints: data
				/*[
					{ x: 1, y: 64 },
					{ x: 2, y: 61 },
					{ x: 3, y: 64 },
					{ x: 4, y: 62 }]*/
			}]
		}
		const options2 = {
			animationEnabled: true,
			exportEnabled: true,
			backgroundColor: '#d1e0e0',
			theme: "light2", // "light1", "dark1", "dark2"

			title:{
				text: "Monthly data"
			},
			axisY: {
				title: "Air Quality Index",
				includeZero: false,
				interval:50
				
			},
			axisX: {
				title: "Date",
				prefix: "",
				interval: 1
			},
			data: [{
				type: "splineArea",
				toolTipContent: "Day {x}: AQI {y}",
				dataPoints: data1
				
			}]

		}
		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			<h1>  </h1>
			<CanvasJSChart options = {options2} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default LineChart;