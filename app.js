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
        const x=todos.filter(todo=> todo.indexOf(input.value)>=0);
        x.forEach(result=>{
            UI.addToUI(result);
        })
    });
    checkboxes.forEach(cbox=>{
        cbox.addEventListener("click",(e)=>{
            console.log(e.target.checked)
            st.doCheck(e.target.parentElement.children[1].textContent,!e.target.checked);
        })
    })


}


eventListeners();

