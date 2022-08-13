import { useState, useEffect } from "react";
import { AiOutlinePlusCircle, AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { FiEdit3 } from "react-icons/fi";
import './Todo.css'
//now we want to make a function with inital values as localstorage values and pass it to our taskList so that on refresh also initially it will be shown only or we could've used use Effect i guess too
const getItems = () => {
  let tList = localStorage.getItem("list");
  if (tList) return JSON.parse(tList);
  else return [];
};

const Todo = () => {
  const objId = uuidv4();
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(getItems());
  const [toggle, setToggle] = useState(false); //this is to toggle btw add and edit button, false means do not show edit button
  const [editItemId, setEditItemId] = useState(null);
  const addItems = () => {
    //now in setTaskList set the objects instead of directly data
    const modifiedTaskObj = { id: objId, name: task };

    if (task.length && toggle) {
      setTaskList(
        //task list m set krde updated data
        taskList.map((elem) => {
          if (elem.id === editItemId) return { ...elem, name: task };
          return elem;
        })
      );
      setTask("");
      setToggle(!toggle);
      setEditItemId(null);
    } else if (task.length) {
      setTaskList([...taskList, modifiedTaskObj]);
      setTask("");
    }
  };
  const deleteItem = (id) => {
    console.log("Item deleting", id);
    const updatedList = taskList.filter((task, i) => {
      return id !== task.id;
    });
    setTaskList(updatedList);
  };
  const editItem = (id) => {
    const editItem = taskList.find((elem) => {
      return id === elem.id;
    });
    console.log(editItem);
    setToggle(true);
    setTask(editItem.name);
    setEditItemId(id); //set krde taki hme pta chl jae kisko edit krne k lie click kia tha and then usi ko edit krne k bad update krde
  };
  //to set tasks to local storage whenver our tasklist changes
  useEffect(() => {
    // localStorage.setItem('taskList',taskList.toString())
    localStorage.setItem("list", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <>
    <h1>YOUR NOTES HERE</h1>
    <div
      className="d-flex align-items-center justify-content-center flex-column"
      // style={{ marginTop: "10rem" }}
    >
      <div className=" d-flex align-items-center justify-content-around">
        <input
          type="text"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
          className="inputData"
          placeholder="Add a Task"
        ></input>
        {toggle ? (
          <FiEdit3 onClick={addItems} className="ms-2" />
        ) : (
          <AiOutlinePlusCircle onClick={addItems} className="ms-2" />
        )}
      </div>
      {taskList.length ? (
        <div className=" mt-3" style={{ width: "20rem" }}>
          {taskList.map((task) => {
            return (
              <div className="d-flex justify-content-center" key={task.id}>
                <div className="list-group ">
                  <ul>
                    <li className="list-group-item">{task.name}</li>
                  </ul>
                </div>
                <div
                  className="edit-icon ms-2 mt-2"
                  onClick={() => {
                    editItem(task.id);
                  }}
                >
                  <FiEdit3 />
                </div>
                <div
                  className="delete-icon ms-2 mt-2"
                  onClick={() => {
                    deleteItem(task.id);
                  }}
                >
                  <AiFillDelete />
                </div>

                <hr />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card mt-3" style={{ padding: "10px" }}>
          LET'S ADD UP SOME TASKS!!
        </div>
      )}
      <button
        className="remove-all btn btn-danger mt-4"
        disabled={!taskList.length}
        onClick={() => {
          setTaskList([]);
        }}
      >
        Remove All
      </button>
    </div>
  </>
  );
};

export default Todo;
