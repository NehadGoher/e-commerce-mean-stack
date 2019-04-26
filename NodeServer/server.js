var express= require('express');
var Router=express.Router();
var mongo = require('mongodb').MongoClient;
var assert=require('assert');

app = express();
port=7000;
app.listen(port);

console.log(port);
var url = "mongodb://localhost:27017/";

app.get('/',function(req,res){
    var data="";
    mongo.connect(url, function(err, db) {
        if (err) throw err;
      var dbo = db.db("OnlineShopping");
      dbo.collection("products").findOne({}, function(err, result) {
        if (err) throw err;
        //console.log(result);
        res.send(result.ProductName);
        db.close();
      });
    });
    
});

