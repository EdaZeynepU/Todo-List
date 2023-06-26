const newTodo = document.querySelector(".addTodo");
const input = document.querySelector(".todoInput");
const sTodo = document.querySelector(".searchTodo");

import storage from "./storage.js";
import ui from "./ui.js";

const st = new storage();
const UI = new ui();

UI.fromStorageToUI();

function eventListeners(){
    newTodo.addEventListener("click",(e)=>{
        st.addTodoToStorage(input.value);
        UI.addToUI(input.value);
        input.value="";
    });

    const del = document.querySelectorAll(".delete");
    const edit = document.querySelectorAll(".edit");
    const checkboxes = document.querySelectorAll(".checkbox");

    del.forEach(delBtn=>{
            delBtn.addEventListener("click",(e)=>{
            st.deleteFromStorage(e.target.parentElement.parentElement.children[0].children[1].textContent);
            UI.deleteFromUI(e);
        });})
    edit.forEach(editbtn=>{
        editbtn.addEventListener("click",(e)=>{
            UI.editUI(e);
        })
    })
    sTodo.addEventListener("click",()=>{
        UI.deleteFullUI();
        const todos=st.getTodosFromStorage();
        const x=todos.filter(todo=> todo[0].indexOf(input.value)>=0);
        x.forEach(result=>{
            UI.onlyOneFromStorageToUI(result);
        })
    });
    checkboxes.forEach(cbox=>{
        cbox.addEventListener("click",(e)=>{
            st.doCheck(e.target.parentElement.children[1].textContent,!e.target.checked);
        })
    })


}


eventListeners();









{/* <ul class="task">
    <div class="leftTodo">
        <input type="checkbox" name="" id="">
        <label>Do your homework</label>
    </div>
<div class="rightTodo">
    <button type="button" class="btn btn-outline-dark btn-sm">
        <i class="fa-solid fa-pen edit"></i></button>
    <button type="button" class="btn btn-outline-dark btn-sm">
        <i class="fas fa-times delete"></i></button>
    </div>
</ul> */}


//this way is hard:
// const todo = document.createElement("ul");
// todo.className="task";
// const left=document.createElement("div");
// left.className="leftTodo";
// const input=document.createElement("input");
// input.type="checkbox";
// const label=document.createElement("label");
// label.appendChild(document.createTextNode(y.value));
// left.appendChild(input);
// left.appendChild(label);
// todo.appendChild(left);