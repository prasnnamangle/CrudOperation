// console.log('Second Code');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

async  function dbConnect(){
    return await mongoose.connect('mongodb://127.0.0.1:27017/assignment');
}
dbConnect()
.then((res)=>{
    // console.log("DB CONNECT");
    // console.log(res);
})
.catch((err)=>{
    console.log(err);
})

//Category 
const Schema = mongoose.Schema;
const catSchema = new Schema({
    name:String    
});
const catModel = mongoose.model('categories', catSchema);


const productSchema = new Schema({
    name:String,
    catid:String 
});
const productModel = mongoose.model('products', productSchema);



const app = express();
app.use(cors());
app.use(bodyParser.json()) 

app.get("/api/show-category" , async(req,res)=>{
    var ans_cat  = await catModel.find();
    res.send(ans_cat);
})
app.get("/api/show-category/:id" , async(req,res)=>{
    var ans_cat  = await catModel.findById(req.params.id);
    res.send(ans_cat);
})
app.get("/api/show-product" , async(req,res)=>{
    var ans_count = await productModel.countDocuments();
    var ans_product  = await productModel.aggregate([
        { "$lookup": {
            "let": { "catid": { "$toObjectId": "$catid" } },
            "from": "categories",
            "pipeline": [
            { "$match": { "$expr": { "$eq": [ "$_id", "$$catid" ] } } }
            ],
            "as": "catvalues"
        }},
        { "$skip": 0 },
        { "$limit": 5 }
        ]);

    console.log(ans_product);
    console.log(ans_count);
    res.send({
        ans_product,
        ans_count
    });
})
app.get("/api/get-product-category/:id" , async(req,res)=>{
    var ans_product_by_id  = await productModel.findById(req.params.id);
    var ans_cat  = await catModel.find();
    res.send({
        catRecord:ans_cat,
        productRec:ans_product_by_id
    });
})


app.get("/api/show-product/:skipvalue/:limitdata" , async(req,res)=>{
    var ans_count = await productModel.countDocuments();
    // var ans_product  = await productModel.find().skip(req.params.skipvalue).limit(req.params.limitdata);

    var ans_product  = await productModel.aggregate([
        { "$lookup": {
            "let": { "catid": { "$toObjectId": "$catid" } },
            "from": "categories",   
            "pipeline": [
            { "$match": { "$expr": { "$eq": [ "$_id", "$$catid" ] } } }
            ],
            "as": "catvalues"
        }},
        { "$skip":Number(req.params.skipvalue) },
        { "$limit": Number(req.params.limitdata) }
        ]);

    // console.log(ans_count);
    res.send({
        ans_product,
        ans_count
    });
})

app.delete("/api/delete-category/:myid" , async(req,res)=>{
    // console.log(req.params); // 

    // res.send({msg:"Route Called"});
    console.log(req.params);
    
    var ans_cat  = await catModel.findByIdAndRemove(req.params.myid);
    // console.log(ans_cat);
    res.send({msg:true})
})

app.post("/api/add-category" , async(req,res)=>{
    console.log(req.body); // {name:'Mens'}
    //insert
    const instance = new catModel(req.body);
    const ans_insert = await instance.save();
    console.log("After Insert");
    console.log(ans_insert);
    res.send({msg:"CATEGORY POST ROUTE CALLED"});
});

//add-product
app.post("/api/add-product" , async(req,res)=>{
    console.log(req.body); // {name:'Mens'}
    //insert
    const instance = new productModel(req.body);
    const ans_insert = await instance.save();
    // console.log("After Insert");
    // console.log(ans_insert);
    // res.send({msg:"PRODUCT POST ROUTE CALLED"});
    res.send({msg:"PRODUCT Added"});
});

app.delete("/api/delete-product/:productid" , async(req,res)=>{
    console.log(req.params); // 

    // res.send({msg:"Route Called"});
    // console.log(req.params);
    
    var ans_product  = await productModel.findByIdAndRemove(req.params.productid);
    console.log(ans_product);
    res.send({msg:true})
})

app.put('/api/update-category/:categoryid' , async(req,res)=>{
    console.log(req.body);
    console.log(req.params);

    // res.send({msg:"ROUTE CALLED"});

    var ans_product  = await catModel.findByIdAndUpdate(req.params.categoryid , req.body);
    console.log(ans_product);
    res.send({msg:true})
})

app.put('/api/update-product/:productid' , async(req,res)=>{
    console.log(req.body);
    console.log(req.params);

    // res.send({msg:"ROUTE CALLED"});

    var ans_product  = await productModel.findByIdAndUpdate(req.params.productid , req.body);
    // console.log(ans_product);
    res.send({msg:true})
})

app.listen(9000);