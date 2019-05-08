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
port=process.env.PORT ||7000;
app.listen(port);
app.use(cors());
//console.log(port);
var url = "mongodb://localhost:27017/";
// Search by Product Name

app.get('/products/:pName',function(req,res){
    var data="";
    mongo.connect(url, function(err, db) {
      console.log("get product");
      
        if (err) throw err;
      var dbo = db.db("OnlineShopping");
     // var dbo = db.db("e-commerce");
      dbo.collection("products").find({"ProductName":req.params.pName}).toArray( function(err, result) {
        if (err) throw err;
        console.log("result");
        console.log(result);
        res.send(result);

        })
       // res.send(result);

        //console.log(res)
        db.close();
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
app.get('/order/:custID',function(req,res){
    mongo.connect(url, function(err, db) {
        if (err) throw err;
      var dbo = db.db("OnlineShopping");
     // var dbo = db.db("e-commerce");

      dbo.collection("orders").find({"CustomerID":req.params.custID}).toArray( function(err, result) {
        if (err) throw err;
      res.send(result);
        console.log(result);
        db.close();
      });
    });
    
});


//get Order Details  ---list of products in this order
app.get('/orderDetails/:username',function(req,res){
    mongo.connect(url, function(err, db) {
        if (err) throw err;
      var dbo = db.db("OnlineShopping");
     // var dbo = db.db("e-commerce");

      dbo.collection("carts").find({"username":req.params.username}).toArray(function(err, result) {
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
    //var dbo = db.db("e-commerce");

      var newProduct = {ProductID:req.body.ProductID, ProductName: req.body.ProductName, SupplierID: req.body.SupplierID,CategoryID:req.body.CategoryID,
        QuantityPerUnit:req.body.QuantityPerUnit
      ,UnitPrice:req.body.UnitPrice,UnitsInStock:req.body.UnitsInStock,UnitsOnOrder:req.body.UnitsOnOrder,
      ReorderLevel:req.body.ReorderLevel,Discontinued:req.body.Discontinued};
      console.log(newProduct);
      dbo.collection("products").insertOne(newProduct , function(err, result) {
        if (err) throw err;
        console.log("new product added");
      res.send(result);
        db.close();
      });
    });
});

//get all products
app.get('/products',function(req,res){
  mongo.connect(url, function(err, db) {
      if (err) throw err;
    var dbo = db.db("OnlineShopping");
    //  var dbo = db.db("e-commerce");

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

    var dbo = db.db("OnlineShopping");
    //var dbo = db.db("e-commerce");
  

console.log("update in server");
//console.log(req.body);

console.log(req.body);

    var updatedProduct = {ProductID:req.body.ProductID, ProductName: req.body.ProductName, SupplierID: req.body.SupplierID,CategoryID:req.body.CategoryID,
      QuantityPerUnit:req.body.QuantityPerUnit
    ,UnitPrice:parseFloat(req.body.UnitPrice),UnitsInStock:req.body.UnitsInStock,UnitsOnOrder:req.body.UnitsOnOrder,
    ReorderLevel:req.body.ReorderLevel,Discontinued:req.body.Discontinued};
    console.log("updated");
    console.log(req.body);
    // console.log(updatedProduct);
    // console.log(req.body.ProductID);
    console.log(ObjectMongo(req.params.PId));
    //_id
    dbo.collection("products").findOneAndUpdate({"_id":ObjectMongo(req.params.PId)},{$set :updatedProduct} , function(err, result) {
      if (err) throw err;
      console.log("update product done");
      res.send(result);

      db.close();
    });
  });
});

//update unitInStock


//delete product
app.delete('/product/:PId',function(req,res){
  console.log("ADDDDDD")
  mongo.connect(url, function(err, db) {
      if (err) throw err;

    var dbo = db.db("OnlineShopping");
   // var dbo = db.db("e-commerce");
   console.log(req.params.PId);

    dbo.collection("products").findOneAndDelete({"_id":ObjectMongo(req.params.PId)}, function(err, result) {
      if (err) throw err;
      //console.log(result);
      res.send(result);
      console.log("delete product done");
      db.close();
    });
  });
});



// add new cart
app.post('/cart',function(req,res){
  console.log("post cart");
  mongo.connect(url, function(err, db) {
      if (err) throw err;
    var dbo = db.db("OnlineShopping");
    //var dbo = db.db("e-commerce");
    console.log("req.body");
    console.log(req.body);
    var newCart = req.body;
    newCart.forEach(element => {
      console.log(element);
      dbo.collection("carts").insertOne(element , function(err, result) {
        if (err) throw err;
        console.log("new cart added");
        db.close();
      });
    });
   
  });
});
//check user
app.get('/user/:email/:password',function(req,res){
  mongo.connect(url, function(err, db) {
      if (err) throw err;
    var dbo = db.db("OnlineShopping");
   // var dbo = db.db("e-commerce");
   //console.log(req.body.email);

    dbo.collection("logins").findOne({"email":req.params.email,"password":req.params.password}, function(err, result) {
      if (err) throw err;
      //console.log(result);
      res.send(result);
      db.close();
    });
  });
});
 //get product name
 app.get('/productName/:pId',function(req,res){
  var data="";
  mongo.connect(url, function(err, db) {
    
      if (err) throw err;
    var dbo = db.db("OnlineShopping");
   // var dbo = db.db("e-commerce");
    dbo.collection("products").find({"ProductID":req.params.pId}).toArray( function(err, result) {
      if (err) throw err;
      //console.log(result);
      res.send(result);
      console.log("array")
      //console.log(res)
      db.close();
    });
  });
  
});

//register
app.post('/login',function(req,res){
  mongo.connect(url, function(err, db) {
      if (err) throw err;
    var dbo = db.db("OnlineShopping");
    //var dbo = db.db("e-commerce");

    var newUser = {email:req.body.email, password: req.body.password, username: req.body.username};
    //console.log(newUser);
    dbo.collection("logins").insertOne(newUser , function(err, result) {
      if (err) throw err;
      //console.log("new user added");
    res.send(result);
      db.close();
    });
  });
});