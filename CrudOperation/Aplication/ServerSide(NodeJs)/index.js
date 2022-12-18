const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//for hosting
// const path = require('path')
// app.use(express.static(path.join(__dirname + "public")))

async function dbConnection(){
    return await mongoose.connect('mongodb://localhost:27017/Application');
}
dbConnection()
.then((res)=>{
    
})
.catch((err)=>{
    console.log(err);
})

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

app.get("/api/show-category",async(req,res)=>{
    var ans_cat = await catModel.find();
    res.send(ans_cat);
})
app.get("/api/show-category/:id",async(req,res)=>{
    var ans_cat = await catModel.findById(req.params.id);
    res.send(ans_cat);
})

app.get("/api/show-product",async(req,res)=>{
    var Procount = await productModel.countDocuments()
    var ans_product = await productModel.find().skip(0).limit(10);

    // console.log(Pcount);
    res.send({
        ans_product,Procount
    });
})

app.get("/api/get-product-category/:id",async(req,res)=>{
    var ans_product_by_id = await productModel.findById(req.params.id);
    var ans_cat = await catModel.find();
    res.send({
        catRecord:ans_cat,
        productRec:ans_product_by_id
    });
})

app.get("/api/show-product/:skipvalue/:limitdata",async(req,res)=>{
    var Procount = await productModel.countDocuments()
    var ans_product = await productModel.find().skip(req.params.skipvalue).limit(req.params.limitdata);


    res.send({
        ans_product,Procount
    });
})

app.delete("/api/delete-category/:myid",async(req,res)=>{

    var ans_cat = await catModel.findByIdAndRemove(req.params.myid);
    res.send({msg:true})

})


app.post("/api/add-category" , async(req,res)=>{
    console.log(req.body);
    const instance = new catModel(req.body);
    const ans_insert = await instance.save()
    console.log("After Insert");
    console.log(ans_insert);
    res.send({msg:"Category Post Route Called"})
})

//add-product
app.post("/api/add-product" , async(req,res)=>{
    console.log(req.body);  

    const instance = new productModel(req.body);
    const ans_insert = await instance.save()
    // console.log("After Insert");
    res.send({msg:"Product added"})
})

//deleting product
app.delete("/api/delete-product/:productid",async(req,res)=>{
    console.log(req.params);

    var ans_product = await productModel.findByIdAndRemove(req.params.productid);
    console.log(ans_product);
    res.send({msg:true})

})

//update category
app.put('/api/update-category/:categoryid', async(req,res)=>{
    console.log(req.body);
    console.log(req.params);

    var ans_product = await catModel.findByIdAndUpdate(req.params.categoryid , req.body);
    console.log(ans_product);
    res.send({msg:true})
})

app.put('/api/update-product/:productid', async(req,res)=>{
    console.log(req.body);
    console.log(req.params);

    var ans_product = await productModel.findByIdAndUpdate(req.params.productid , req.body);
    console.log(ans_product);
    res.send({msg:true})
})

app.listen(8000)
