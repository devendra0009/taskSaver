
import { useState,useEffect } from "react";
import {AiOutlinePlusCircle,AiFillDelete} from "react-icons/ai"

//now we want to make a function with inital values as localstorage values and pass it to our taskList so that on refresh also initially it will be shown only or we could've used use Effect i guess too
const getItems=()=>{
  let tList=localStorage.getItem('list')
  if(tList)
  return JSON.parse(tList)
  else 
  return []
}

const Todo = () => {
  const [task, setTask] = useState("");
  const [taskList,setTaskList] =useState(getItems())
  const addItems=()=>{
    if(task.length){
        setTaskList([...taskList,task])
        setTask('')
    }
  }
  const deleteItem=(id)=>{
    console.log('Item deleting',id);
    const updatedList=taskList.filter((task,i)=>{
      return id!==i
    })
    setTaskList(updatedList)
  }
  //to set tasks to local storage whenver our tasklist changes
  useEffect(() => {
    // localStorage.setItem('taskList',taskList.toString()) 
    localStorage.setItem('list',JSON.stringify(taskList)) 
  }, [taskList])
  

  return (
    <div
      className="d-flex align-items-center justify-content-center flex-column"
      style={{ marginTop:"10rem" }}
    >
      <div className=" d-flex align-items-center justify-content-around">
        <input
          type="text"
          value={task}
          onChange={(e)=>{setTask(e.target.value)}}
          className="inputData"
          placeholder="Add a Task"
        ></input> 
        <AiOutlinePlusCircle onClick={addItems} className="ms-2"/>
        </div>
        {taskList.length ? (<div className=" mt-3" style={{ width: "20rem" }}>
        {
            taskList.map((task,ind)=>{
                return(
                  <div className="d-flex justify-content-center" key={ind}>
                  <div className="list-group ">  
                  <ul >
                    <li className="list-group-item">{task}</li>
                  </ul>
                  </div>
        <div className="delete-icon mt-2" onClick={()=>{deleteItem(ind)}}><AiFillDelete/></div>
        
        <hr/>
        </div>
                )
        })
        }
        
      </div>
      ) 
      
      : <div className="card mt-3" style={{ padding:"10px" }}>LET'S ADD UP SOME TASKS!!</div>
        }
      <button className="remove-all btn btn-danger mt-4" disabled={!taskList.length} onClick={()=>{setTaskList([])}}>Remove All</button>
    </div>
  );
};

export default Todo;
