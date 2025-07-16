import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "express";//use to req from the body to get the data and connect req.body to express
import { User} from './models/user.js'
import bcrypt from 'bcryptjs'
import userRouter from './routes/user.js'
import contactRouter from './routes/contact.js'
import {config} from 'dotenv';
const app = express();
config ({path:'.env'})

app.use(bodyParser.json())

// user Router
app.use("/api/user",userRouter);

// contact Router 
app.use('/api/contact',contactRouter)


app.get('/',(req,res)=>{
    res.json({message:"this is a page"})
})
//user routes
/*app.post('/api/user/register',(req,res)=>{
    console.log("printing data = " ,req.body)
    res.json({ message: "getting data",data:req.body });
})*/


app.post("/api/user/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (name == "" || email == "" || password == "") {
        return res.json({ message: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (user) {
        return res.json({ message: "User Already exist...!", success: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password:hashPassword });

    res.json({ message: "User Created Successfully...!", success: true, user });
});

// user Router
app.use("/api/user",userRouter);

// contact Router 
app.use('/api/contact',contactRouter)


mongoose.connect(
    "mongodb+srv://bhavesh:Bhaveshs%400@cluster0.jpra0bk.mongodb.net/",{
    dbname:"project_API" 
}
).then(()=>console.log("mongoDB connected...")).catch((err)=>console.log(err))


const port = 3001;
app.listen(port,()=>(console.log(`server is running on ${port}`)));
