const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const PORT = process.env.PORT || 3001;
const MongoClient = require('mongodb').MongoClient;
app = express();

let dbo ;
let la=[];
let lo=[];
let la2=[];
let lo2=[];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({origin:true}));


app.use((req,res,next)=>{
	MongoClient.connect("mongodb+srv://dhruvil:[PASSWORD]@cluster0-8obxb.mongodb.net/test?retryWrites=true", {useNewUrlParser:true},
		async function(err, db) {
			dbo = await db.db("pollutiondata");
			next();
	})
});

app.get('/graph',async (req,res)=>{
		let resul;
	    let mySort = {Date : 1, Hour: 1};
	    resul = await dbo.collection("pollution").find({} ,{ projection:{_id:0,lat:1,long:1,AQI:1,Hour:1,Date:1,Month:1} }).sort(mySort).toArray();
		res.send(resul);
});

app.use('/getdata', async (req,res,next)=>{
	let result = await dbo.collection("pollution").find({} ,{ projection:{_id:0,lat:1,long:1} }).toArray();
	console.log('la');
    result.map(v=>{
    	la.push(v.lat);
    	lo.push(v.long);
		la2.push(v.lat);
    	lo2.push(v.long);
    });
	next();
});

app.get('/getdata', async (req, res,next) => {
	let result=[];
	let query=[];
	let minindex = [];
	var lat=req.query.lat;
	var lon=req.query.long;
	for(let i=0;i<5;i++){
		var templa=la.map((v)=>{
			return (v-lat)**2;
		});
		var templo=lo.map((v)=>{
			return (v-lon)**2;
		});
		var sq= templa.map((a,b)=>{
			//square root array created
			return Math.sqrt(a + templo[b]);
		});
		//find min in sqrt array
		let min=Math.min.apply(null,sq);
		//find min index in sqrt array
		var index = sq.indexOf(min);
		minindex.push(index);
		//set the min index element to considerably large value in sq array and repeat to find the new min.
		la[index] = 1000;
		lo[index] = 1000;
		//repeat this process for five times.
	}
	//find the nearest time possible for lat long pair.
	//{}
	for(let i=0;i<5;i++){
	    let obj = { lat: `${la2[minindex[i]]}` , long: `${lo2[minindex[i]]}` };
	    query.push(obj);
	};
	console.log(query);
	for(let i =0; i < 5; i++){
		let res = await dbo.collection("pollution").find(query[i]).toArray();
		result.push(res);
	}
	console.log(result);
	res.send(result);
});

app.get('/insert',(req,res)=>{
	var d = new Date();
	var min = d.getMinutes() + 31;
	var temp=min/60;
	var hrs = d.getHours() + 5 + Math.floor(temp);
	console.log(hrs);
	min = min % 60;
	console.log(min);
	var date = d.getDate();
	var mon = d.getMonth() + 1;
	var yr = d.getFullYear();
	console.log('inserting');
	const arr= req.query;
	arr["Minute"]= min;
	arr["Hour"]= hrs;
	arr["Date"]= date;
	arr["Month"]= mon;
	arr["Year"]= yr;
    dbo.collection("pollution").insertOne(arr, function(err, res) {
    	if (err) throw err;
    	console.log("1 document inserted");
  	});
	res.send(arr);
});

app.get('/timestamp',(req,res)=>{
	res.send(`${Date.now()}`);
});

app.get('/timestamp-cached',(req,res)=>{
	res.set('Cache-control','public, max-age=300, s-maxage=600');
	res.send(`${Date.now()}`);
});

app.set('port', PORT);
server = http.createServer(app);
server.listen(app.get('port'), () => console.log("API is listening on port " + app.get('port')));
