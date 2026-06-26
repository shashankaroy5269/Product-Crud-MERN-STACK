require('dotenv').config()
const express=require('express');
const ejs=require('ejs');
const ConnectDB=require('./app/config/db')
const cors=require('cors')
const path=require('path')
ConnectDB();

const app=express();

//cors
app.use(cors());

//setup ejs
app.set('view engine','ejs');
app.set('views','views')

//static folder
// app.use(express.static('public'))
// app.use('/uploads',express.static(path.join(__dirname,'uploads')))


//middleware
app.use(express.json());
//app.use(express.urlencoded({extended:false}))

//define routes

const productRoute=require('./app/routes/api/productroutes')
app.use('/api',productRoute)
const authRoute=require('./app/routes/api/authroutes')
app.use('/api',authRoute)


const studentRoutes=require('./app/routes/api/Studentroutes')
app.use('/api',studentRoutes)





const PORT=process.env.PORT


app.listen(PORT,(error)=>{
    if(error){
        console.log(error);
    }else{
        console.log(`server is running on port http://localhost:${PORT}`);
    }
})