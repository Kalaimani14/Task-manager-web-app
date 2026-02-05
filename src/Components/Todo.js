import { useState } from "react"
import "../Style/Todo.css"

export default function Todo() {

    const [task, setTask] = useState({
        name: "",
        date: ""
    })
    const [allTask, setAllTask] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    function handleChange(e) {
        setTask({ ...task, [e.target.name]: e.target.value });
    }
    function handleClick(e) {
        e.preventDefault();
        if(task.name.trim()===""){
            alert("Please enter your task !!!");
            return;
        }

        if (editIndex !== null) {
            const updated = [...allTask];
            updated[editIndex] = task;
            setAllTask(updated);
            setEditIndex(null);
        } else {
            setAllTask([...allTask, task]);
        }


        setTask({ name: "", date: "" })

    }
    function handleEdit(index) {
        setTask(allTask[index]);
        setEditIndex(index);


    }
    function handleDelete(index) {
        const removeTask = allTask.filter((_, i) => i !== index);
        setAllTask(removeTask);
    }

    return (
        <div className="todo-container">
            <div className="head">My_Task</div>
            <form>
                <input type="text" name="name" placeholder="Add your new task..." value={task.name} onChange={handleChange} />
                <input type="date" name="date" value={task.date} onChange={handleChange} />
                <button type="submit" onClick={handleClick}>Add</button>
            </form>

            <h5 className="tk-count">{allTask.length} tasks lefts</h5>
            {
                allTask.map((a, index) => (
                    (
                        <div className="tk-group" key={a.index+1}>
                            <div className="index">{a.index}</div>
                            <h1 className="tk-name">{a.name}</h1>
                            <h1 className="tk-date">{a.date}</h1>

                            <button onClick={() => { handleEdit(index) }} type="submit">Edit</button>
                            <button type="submit" onClick={() => { handleDelete(index) }}>Delete</button>
                        </div>
                    )))
            }
        </div>
    )
}