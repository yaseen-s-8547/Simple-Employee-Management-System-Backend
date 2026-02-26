require("dotenv").config()
const express = require("express")
const cors = (require("cors"))
const app = express()
app.use(cors())
app.use(express.json())
let employedetails = []
app.get('/employees', (req, res) => {
    res.json(employedetails)
})
app.post('/employees', (req, res) => {
    const { name } = req.body
    const newEmployee = { id: Date.now(), name: name  }
    employedetails.push(newEmployee)
    res.json(newEmployee)

})
app.patch('/employees/:id', (req, res) => {
    const  id  = Number(req.params.id)
    const emp = employedetails.find(e => e.id === id)
    if (!emp) return res.status(404).json({ message: "no employee found" })
     Object.assign(emp, req.body)
    res.json(emp)

})
app.delete('/employees/:id',(req,res)=>{
    const id=Number(req.params.id)
    const originallength =employedetails.length
    employedetails=employedetails.filter(det=>det.id!==id)
    if(originallength===employedetails.length){
        return res.status(404).json({message:"item not found "})
    }
    res.json(204).send() 

})

app.listen(process.env.PORT, () => {
    console.log("server running on port:", process.env.PORT)
})