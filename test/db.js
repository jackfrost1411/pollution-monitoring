const MongoClient = require('mongodb').MongoClient;
let dbo;
let db = MongoClient.connect("mongodb+srv://dhruvil:dhruvil123@cluster0-8obxb.mongodb.net/test?retryWrites=true", {useNewUrlParser:true})
// function(err, db) {
// 	dbo = db
// });

module.export = db;