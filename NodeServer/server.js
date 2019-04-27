var express= require('express');
var Router=express.Router();
var mongo = require('mongodb').MongoClient;
var assert=require('assert');
var cors =require('cors');
app = express();
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
      dbo.collection("products").findOne({"ProductName":req.params.pName}, function(err, result) {
        if (err) throw err;
        //console.log(result);
        res.send(result);
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
app.post('/products/:PName/:SID/:CID/:Quantity/:Price/:UInStock/:UOnOrder/:OLevel/:dis',function(req,res){
    mongo.connect(url, function(err, db) {
        if (err) throw err;
      var dbo = db.db("OnlineShopping");
     // var dbo = db.db("e-commerce");

      var newProduct = { ProductName: req.params.pName, SupplierID: req.params.SID,CategoryID:req.params.CID,
        QuantityPerUnit:req.params.Quantity
      ,UnitPrice:req.params.Price,UnitsInStock:req.params.UInStock,UnitsOnOrder:req.params.UOnOrder,
      ReorderLevel:req.params.OLevel,Discontinued:req.params.dis};
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
     // var dbo = db.db("e-commerce");

    dbo.collection("products").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
      console.log(result);
      db.close();
    });
  });
});
