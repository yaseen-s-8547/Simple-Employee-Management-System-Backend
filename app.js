import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect(process.env.MONGO_URI)
const empSchema=new mongoose.Schema({name:String,role:String,Salary:Number,mailId:String,phone:Number})
const Employees=mongoose.model("Employees",empSchema)
app.get('/employees', async (req, res) => {
    const search =req.query.search
    if(!search){
        const employees = await Employees.find()
        return  res.json(employees)
    }
    const filteredEmployees=await Employees.find({name:{$regx:search,$options:"i"}})

    res.json(filteredEmployees)
})
app.post('/employees', async (req, res) => {
    
    const newEmployee = await Employees.create(req.body)
    
    res.json(newEmployee)

})
app.patch('/employees/:id',  async (req, res) => {
    const  id  = req.params.id
    const patchedItem =await Employees.findByIdAndUpdate(id,req.body,{new:true})
    if(!patchedItem){
       return  res.status(404).json({message:'not found'})
    } 
    res.json(patchedItem)

})
app.delete('/employees/:id',async (req,res)=>{
    const id=req.params.id
    const deletedItem = await Employees.findByIdAndDelete(id)
    if(!deletedItem){
        return res.status(404).json({message:"item not found "})
    }
   
    res.status(204).send() 

})
const PORT = process.env.PORT || 5000
app.listen(process.env.PORT, () => {
    console.log("server running on port:", PORT)
})