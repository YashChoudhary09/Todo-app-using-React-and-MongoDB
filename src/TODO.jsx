

import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Tasks from "./Tasks";
import "./TODO.css";

export default function Todo() {
    const [todo, setTodo] = useState([]);
    const [task, setTask] = useState("");

    useEffect(() => {
        async function fetchData() {
            const data = await fetch("http://localhost:8080/task");
            const result = await data.json();

            setTodo(result);
            console.log("useEffect : ",result)
        }
        fetchData();
    }, []);

    const handleInput = (event) => {
        setTask(event.target.value);
    };

    const addTask = async () => {
        if(task === "")return;
      let fetchedData =  await fetch("http://localhost:8080/task", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task: task,date: new Date() ,isDone:false})
        });

        const latestResult = await fetchedData.json();
        setTodo((prevTodo)=>[...prevTodo,latestResult])
        console.log("after adding task : ",latestResult);
        setTask("");
    };

    return (
        <div className="todo">
            <div className="search-box">
                <FormatListBulletedIcon style={{ color: "black" }} />
                <TextField
                    id="standard-basic"
                    label=" enter task"
                    variant="standard"
                    value={task}
                    onChange={handleInput}
                    color="#89A8B2"
                />
                <Button variant="contained" onClick={addTask} className="task-btn">
                    Add Task
                </Button>
            </div>
            <Tasks todo={todo} setTodo={setTodo} />
        </div>
    );
}