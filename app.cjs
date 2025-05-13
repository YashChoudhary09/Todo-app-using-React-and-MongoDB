const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

main()
  .then(() => {
    console.log("Connected successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Todo");
}

const taskSchema = new mongoose.Schema({
  task: String,
  date: Date,
  isDone: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", taskSchema);

app.get("/task", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/task", async (req, res) => {
  const { task ,date,isDone} = req.body;
  const newTask = new Task({ task,date ,isDone});
  console.log(newTask);
  await newTask.save();
  res.status(201).json(newTask);
});

app.delete("/task/:id",async(req,res)=>{
  const {id} =  req.params;
 let delTask= await Task.findByIdAndDelete(id);
  if(  ! delTask ){
    res.status(404).json({message:"task not found !"});
  }

  res.json({message:"task deleted successfully !",deletedTask : delTask})
})


app.put("/task/:id",async(req,res)=>{
  const {id} =  req.params;
 let updatedTask= await Task.findByIdAndUpdate(id,{isDone:true},{new:true});
 if(!updatedTask){
  res.status(404).json({message:"task is not found !"});
 }
 res.json({message:"task is updated !",updatedTask:updatedTask})
})

app.listen(8080, () => {
  console.log("App is listening on port 8080!");
});