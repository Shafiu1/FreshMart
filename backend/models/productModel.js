const mongoose = require('mongoose');

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    price:{
        type:Number,
        required:[true,'Price is required']
    },
    category:{
        type:String,
        required:[true,'Enter the category']
    },
    image:{
        type:String
    },
    description:{
        type:String
    },
},{timestamps:true});

const Product=mongoose.model('Product',productSchema);
module.exports=Product;