require("dotenv").config()
const express = require("express")
const cors = (require("cors"))
const app = express()
app.use(cors())
app.use(express.json())
let employedetails = []
app.get('https://simple-employee-management-system-u5c1.onrender.com/employees', (req, res) => {
    const search =req.query.search
    if(!search){
        return  res.json(employedetails)
    }
    const filtereditem=employedetails.filter(det=>det.name?.toLowerCase().includes(search.toLowerCase())||det.id.toString().includes(search))

    res.json(filtereditem)
})
app.post('https://simple-employee-management-system-u5c1.onrender.com/employees', (req, res) => {
    const { name } = req.body
    const newEmployee = { id: Date.now(), name: name  }
    employedetails.push(newEmployee)
    res.json(newEmployee)

})
app.patch('https://simple-employee-management-system-u5c1.onrender.com/employees/:id', (req, res) => {
    const  id  = Number(req.params.id)
    const emp = employedetails.find(e => e.id === id)
    if (!emp) return res.status(404).json({ message: "no employee found" })
     Object.assign(emp, req.body)
    res.json(emp)

})
app.delete('https://simple-employee-management-system-u5c1.onrender.com/employees/:id',(req,res)=>{
    const id=Number(req.params.id)
    const originallength =employedetails.length
    employedetails=employedetails.filter(det=>det.id!==id)
    if(originallength===employedetails.length){
        return res.status(404).json({message:"item not found "})
    }
    res.json(204).send() 

})
const PORT = process.env.PORT || 5000
app.listen(process.env.PORT, () => {
    console.log("server running on port:", process.env.PORT)
})