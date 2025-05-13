

import "./Task.css";
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Tasks({ todo, setTodo }) {

  const deleteTask = async (_id) => {
    try {
      await fetch(`https://todo-app-using-react-and-mongodb.onrender.com/task/${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      
      setTodo((prev) => prev.filter((task) => task._id !== _id));
      
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const markDone = async(_id)=>{
    try{
        let fetchUrl = "https://todo-app-using-react-and-mongodb.onrender.com";
          await fetch(`${fetchUrl}/task/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
    setTodo((prevTodo)=> prevTodo.map((el)=> 
        el._id === _id ? {...el,isDone:!el.isDone} : el,
    ))
     
    } catch(err){
        console.log("error in update : ",err)
    }
 
   
  }

  return (
    <div className="task-box">
      <ol className="task">
        {todo.map((el) =>
          el.task !== "" ? (
        <div key={el._id}>
              <span className="date-span"> {new Date(el.date).toLocaleDateString("en-IN")}</span>
            <div className="task-div" >
                
              <li className={`task-list ${el.isDone ? "checkMark" : ""}`}>{el.task} &nbsp; 
                    <span className="time-span"> {new Date(el.date).toLocaleTimeString("en-IN",{hour12:true,hour:"2-digit",minute:"2-digit"})}
                </span>
                </li>
              <Checkbox {...label} onClick={()=>markDone(el._id)} checked={el.isDone} className="checkBox"  />
              <DeleteIcon className="delete-btn" onClick={() => deleteTask(el._id)} />
            </div>
        </div>
          ) : null
        )}
      </ol>
    </div>
  );
}