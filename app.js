require("dotenv").config()
const express=require("express")
const cors=(require("cors"))
const app=express()
app.use(cors())
app.use(express.json())
let employedetails=[]
app.get('/employees',(req,res)=>{
    res.json(employedetails)
})
app.post('/items',(req,res)=>{
    const{name}=req.body
    const newItem={id:Date.now(),name}
    employeedetails.push(newItem)
    res.json(newItem)
})

app.listen(process.env.PORT,()=>{
    console.log("server running on port:", process.env.PORT)
})