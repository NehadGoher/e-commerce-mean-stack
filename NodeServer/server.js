var express= require('express');
var Router=express.Router();
var mongo = require('mongodb').MongoClient;
var assert=require('assert');

app = express();
port=7000;
app.listen(port);

console.log(port);
var url = "mongodb://localhost:27017/";
// Search by Product Name
var productname="Tofu";
app.get('/products',function(req,res){
    var data="";
    mongo.connect(url, function(err, db) {
        if (err) throw err;
      var dbo = db.db("OnlineShopping");
      dbo.collection("products").findOne({"ProductName":productname}, function(err, result) {
        if (err) throw err;
        //console.log(result);
        res.send(result.QuantityPerUnit);
        db.close();
      });
    });
    
});
// Search by Category
var category="Seafood";
app.get('/categories',function(req,res){
    var data="";
    mongo.connect(url, function(err, db) {
        if (err) throw err;
      var dbo = db.db("OnlineShopping");
      dbo.collection("categories").findOne({"CategoryName":category}, function(err, result) {
        if (err) throw err;
        console.log(result);
        //res.send(result);
        db.close();
      });
    });
    
});

//get Order
var OrderNo=10250;
app.get('/orders',function(req,res){
    mongo.connect(url, function(err, db) {
        if (err) throw err;
      var dbo = db.db("OnlineShopping");
      dbo.collection("orders").findOne({"OrderID":OrderNo}, function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
    });
    
});


//get Order Details  ---list of products in this order
var OrderNo=10250;
app.get('/orderDetails',function(req,res){
    mongo.connect(url, function(err, db) {
        if (err) throw err;
      var dbo = db.db("OnlineShopping");
      dbo.collection("order-details").find({"OrderID":OrderNo}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
    });
});


// add new product
app.post('/products',function(req,res){
    mongo.connect(url, function(err, db) {
        if (err) throw err;
      var dbo = db.db("OnlineShopping");
      var newProduct = { ProductName: "NewProduct", SupplierID: 2,CategoryID:8,QuantityPerUnit:"4 boxes"
      ,UnitPrice:20,UnitsInStock:20,UnitsOnOrder:0,ReorderLevel:0,Discontinued:0};
      dbo.collection("products").insertOne(newProduct , function(err, result) {
        if (err) throw err;
        console.log("new product added");
        db.close();
      });
    });
});
