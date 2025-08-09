const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
//routers
const productRoutes=require('./routes/productRoutes.js');
const authRoutes = require('./routes/authRoutes.js')

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI).then(()=>console.log("MongoDB Connected")).catch((err)=>console.log(err));

app.get('/',(req,res)=>{
    res.send('API is running');
});



app.use('/api/products',productRoutes);
app.use('/api/auth',authRoutes);


const PORT=process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})