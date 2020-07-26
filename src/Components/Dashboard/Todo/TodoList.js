import React, { useState,useEffect } from "react";

import Swal from 'sweetalert2';
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars'; //https://github.com/malte-wessel/react-custom-scrollbars
import firebase from '../../Firebase/Firebase_Config';

export default function TodoList(props) { 
  // Creating a local state to have currently writing
  // todo item that will be sent to the global store.
  const [todo, setTodo] = useState("");
  const [allTodos, setAllTodos] = useState(props.todo);
  useEffect(() => { setAllTodos(props.todo)}, [props.todo] )
  const [user] = useState(props.user);

  function handleTodoChange(e) {
    setTodo(e.target.value);
  }

  function handleTodoAdd() {
    //dispatch({ type: "ADD_TODO", payload: todo });
    let todos = allTodos;
    let checkDuplicate = todos.filter((obj)=>{return obj.text.toLowerCase() === todo.toLowerCase()}).length;
    if(!checkDuplicate){
      let todoObj = {
        userid : user.userid,
        text : todo,
        isopen : true,
        date : moment().format()
      };
      firebase.firestore().collection('todos').doc().set(todoObj).then(()=>{
        todos.push(todoObj);
        setAllTodos(todos);
        setTodo("");
        swtoast("success","todo added");
      }).catch(()=>{
        swtoast("error","something wents wrong, try again");
      });
    }else{
      swtoast("error","todo already exists");
    }
  }

  function handleSubmitForm(event) {
    if (event.keyCode === 13) handleTodoAdd();
  }

  function handlerTodoDelete(docid) {
    firebase.firestore().collection('todos').doc(docid).delete();
  }

  function handlerTodoComplete(docid) {
    let selectedTodo = allTodos.filter((todo)=>{return todo.id === docid});
    selectedTodo[0].isopen = false;
    firebase.firestore().collection('todos').doc(docid).update(selectedTodo[0]).then(()=>{
      let objIndex = allTodos.findIndex((obj => obj.id === docid));
      let todosUpdate = allTodos;
      todosUpdate[objIndex].isopen = false;
      setAllTodos(todosUpdate);
      swtoast("success","Hurray! you completed on task");
    }).catch(()=>{
      swtoast("error","something wents wrong, try again");
    });
  }

  function swtoast(icon, title) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
    Toast.fire({
        icon: icon,
        title: title
    });
  }

  const emptyTodoElem = <div className="col-md-12">
                          <br />
                          <h4>Yay! All todos are done! Take a rest!</h4>
                        </div>

  function todoBinding(condition,key,needCondition,stage) {
    let todoElem;
    const todoRending = <Scrollbars 
                          style={{ height: 200 }} 
                          autoHide 
                          autoHideTimeout={1000}
                          autoHideDuration={200}
                          autoHeight
                          autoHeightMin={0}
                          autoHeightMax={200}
                          >
                          <ul className="list-group list-group-flush ul-todo">
                            {(allTodos.length) ?  allTodos.map(t => {
                                                          if(t[key] === condition || !needCondition){
                                                            todoElem = 
                                                              <li key={t.text} className="list-group-item">
                                                                <i class={"fas fa-circle "+((t.isopen) ? "text-warning" : "text-success")} style={{float:'left',marginRight:'8px',fontSize:'10px',marginTop:'7px'}}></i>
                                                                {
                                                                  t.text
                                                                }
                                                                {
                                                                (t.isopen) ?
                                                                  <>
                                                                  <i class="float-right fa fa-trash" aria-hidden="true" style={{ marginLeft: 10,marginTop:6,fontSize:14,cursor:'pointer' }} onClick={() => handlerTodoDelete(t.id)} ></i>
                                                                  <i class="float-right fa fa-check-circle" aria-hidden="true" style={{ marginLeft: 10,marginTop:6,fontSize:14,cursor:'pointer' }} onClick={() => handlerTodoComplete(t.id)}></i>
                                                                  </> : 
                                                                  <i class="float-right fa fa-trash" aria-hidden="true" style={{ marginLeft: 10,marginTop:6,fontSize:14,cursor:'pointer' }} onClick={() => handlerTodoDelete(t.id)}></i>
                                                                }
                                                              </li>
                                                              return todoElem;
                                                          }
                                                        }) : emptyTodoElem}
                          </ul>
                        </Scrollbars>
    return todoRending;
  }
  return (
        <div className="row">
          <div className="col-md-12">
            <div className="input-group">
              <input
                className="form-control"
                value={todo}
                autoFocus={false}
                placeholder="Enter new todo"
                onKeyUp={handleSubmitForm}
                onChange={handleTodoChange}
              />
              <div className="input-group-append">
                <button className="btn btn-primary" >
                  Add
                </button>
              </div>
            </div>
            <ul className="nav nav-tabs" id="todoTab" role="tablist" style={{marginTop:'10px'}}>
              <li className="nav-item">
                <a className="nav-link" id="all-tab" data-toggle="tab" href="#all" role="tab" aria-controls="all" aria-selected="true">All</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" id="active-tab" data-toggle="tab" href="#active" role="tab" aria-controls="active" aria-selected="false">Active</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="completed-tab" data-toggle="tab" href="#completed" role="tab" aria-controls="completed" aria-selected="false">Completed</a>
              </li>
            </ul>
            <div className="tab-content" id="myTodoContent">
              <div className="tab-pane fade" id="all" role="tabpanel" aria-labelledby="all-tab">
               {todoBinding("","isopen",false,"All")}
              </div>
              <div className="tab-pane fade show active" id="active" role="tabpanel" aria-labelledby="active-tab">
               {todoBinding(true,"isopen",true,"Active")}
              </div>
              <div className="tab-pane fade" id="completed" role="tabpanel" aria-labelledby="completed-tab">
               {todoBinding(false,"isopen",true,"Completed")}
            </div>
          </div>
        </div>
      </div>
  );
}
