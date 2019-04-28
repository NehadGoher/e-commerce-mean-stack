var express= require('express');
var Router=express.Router();
var mongo = require('mongodb').MongoClient;
var ObjectMongo = require('mongodb').ObjectID;
var assert=require('assert');
var cors =require('cors');
app = express();
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
})); 
app.use(express.json());       
app.use(express.urlencoded());
port=7000;
app.listen(port);
app.use(cors());
console.log(port);
var url = "mongodb://localhost:27017/";
// Search by Product Name

app.get('/products/:pName',function(req,res){
    var data="";
    mongo.connect(url, function(err, db) {
      
        if (err) throw err;
      var dbo = db.db("OnlineShopping");
     // var dbo = db.db("e-commerce");
      dbo.collection("products").find({"ProductName":req.params.pName}).toArray( function(err, result) {
        if (err) throw err;
        //console.log(result);
        res.send(result);
        console.log("array")
        //console.log(res)
        db.close();
      });
    });
    
});

// Search by Category
app.get('/categories/:CName',function(req,res){
    mongo.connect(url, function(err, db) {
        if (err) throw err;
      var dbo = db.db("OnlineShopping");
     // var dbo = db.db("e-commerce");

      dbo.collection("categories").findOne({"CategoryName":req.params.CName}, function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        db.close();
      });
    });
    
});

//get Order
var OrderNo=10250;
app.get('/order/:orderID',function(req,res){
    mongo.connect(url, function(err, db) {
        if (err) throw err;
      var dbo = db.db("OnlineShopping");
     // var dbo = db.db("e-commerce");

      dbo.collection("orders").findOne({"OrderID":req.params.orderID}, function(err, result) {
        if (err) throw err;
      res.send(result);
        console.log(result);
        db.close();
      });
    });
    
});


//get Order Details  ---list of products in this order
app.get('/orderDetails/:orderID',function(req,res){
    mongo.connect(url, function(err, db) {
        if (err) throw err;
      var dbo = db.db("OnlineShopping");
     // var dbo = db.db("e-commerce");

      dbo.collection("order-details").find({"OrderID":req.params.orderID}).toArray(function(err, result) {
        if (err) throw err;
      res.send(result);
        console.log(result);
        db.close();
      });
    });
});

// add new product
app.post('/product',function(req,res){
    mongo.connect(url, function(err, db) {
        if (err) throw err;
      var dbo = db.db("OnlineShopping");
     // var dbo = db.db("e-commerce");

      var newProduct = {ProductID:req.body.ProductID, ProductName: req.body.ProductName, SupplierID: req.body.SupplierID,CategoryID:req.body.CategoryID,
        QuantityPerUnit:req.body.QuantityPerUnit
      ,UnitPrice:req.body.UnitPrice,UnitsInStock:req.body.UnitsInStock,UnitsOnOrder:req.body.UnitsOnOrder,
      ReorderLevel:req.body.ReorderLevel,Discontinued:req.body.Discontinued};
      console.log(newProduct);
      dbo.collection("products").insertOne(newProduct , function(err, result) {
        if (err) throw err;
        console.log("new product added");
        db.close();
      });
    });
});

//get all products
app.get('/products',function(req,res){
  mongo.connect(url, function(err, db) {
      if (err) throw err;
    var dbo = db.db("OnlineShopping");
   //   var dbo = db.db("e-commerce");

    dbo.collection("products").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
     // console.log(result);
      db.close();
    });
  });
});

//update product
app.put('/product/:PId',function(req,res){
  mongo.connect(url, function(err, db) {
      if (err) throw err;
   // var dbo = db.db("OnlineShopping");
    var dbo = db.db("e-commerce");
console.log(req.body);
    var updatedProduct = {ProductID:req.body.ProductID, ProductName: req.body.ProductName, SupplierID: req.body.SupplierID,CategoryID:req.body.CategoryID,
      QuantityPerUnit:req.body.QuantityPerUnit
    ,UnitPrice:parseFloat(req.body.UnitPrice),UnitsInStock:req.body.UnitsInStock,UnitsOnOrder:req.body.UnitsOnOrder,
    ReorderLevel:req.body.ReorderLevel,Discontinued:req.body.Discontinued};
    console.log(updatedProduct);
    console.log(req.body.ProductID);
    dbo.collection("products").findOneAndUpdate({"_id":ObjectMongo(req.params.PId)},{$set :updatedProduct} , function(err, result) {
      if (err) throw err;
      console.log("update product done");
      db.close();
    });
  });
});

//delete product
app.delete('/product/:PId',function(req,res){
  mongo.connect(url, function(err, db) {
      if (err) throw err;
   // var dbo = db.db("OnlineShopping");
    var dbo = db.db("e-commerce");
   console.log(req.params.PId);

    dbo.collection("products").findOneAndDelete({"_id":ObjectMongo(req.params.PId)}, function(err, result) {
      if (err) throw err;
      //console.log(result);
      console.log("delete product done");
      db.close();
    });
  });
});
