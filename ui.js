import storage from "./storage.js";


const st = new storage();

export default class ui {
  addToUI(input) {
    const li = document.querySelector("#list");
    const todo = document.createElement("ul");
    todo.className = "task";
    todo.innerHTML = `
    <div class="leftTodo">
        <input type="checkbox" class="checkbox" id="ifChecked">
        <label class="todoLabel" for="ifChecked">${input}</label>
    </div>
    <div class="rightTodo">
        <button type="button" class="btn btn-outline-dark btn-sm edit">
            <i class="fa-solid fa-pen"></i></button>
        <button type="button" class="btn btn-outline-dark btn-sm delete">
            <i class="fas fa-times"></i></button>
    </div>
        `;
    li.appendChild(todo);
  }

  fromStorageToUI() {
    const li = document.querySelector("#list");
    const todos = st.getTodosFromStorage();
    todos.forEach((input) => {
      const todo = document.createElement("ul");
      todo.className = "task";
      todo.innerHTML = `
    <div class="leftTodo">
        <input type="checkbox" class="checkbox" id="ifChecked" ${input[1]==true ? "checked":""}>
        <label class="todoLabel" for="ifChecked">${input[0]}</label>
    </div>
    <div class="rightTodo">
        <button type="button" class="btn btn-outline-dark btn-sm edit">
            <i class="fa-solid fa-pen"></i></button>
        <button type="button" class="btn btn-outline-dark btn-sm delete">
            <i class="fas fa-times"></i></button>
    </div>
        `;
      li.appendChild(todo);
    });
  }

  deleteFromUI(e) {
    e.target.parentElement.parentElement.remove();
  }

  deleteFullUI(){
    const li=document.querySelector("#list");
    li.remove();
    const newLi= document.createElement("li");
    newLi.className="container fullTodo";
    newLi.id="list";
    const tasks=document.querySelector(".tasks");
    tasks.appendChild(newLi);
  }

  editUI(e) {
    const todo =
      e.target.parentElement.parentElement.children[0].children[1].textContent;
    const x = document.createElement("ul");

    x.className = "task";
    x.innerHTML = `
    <div class="leftTodo">
        <input type="checkbox" class="checkbox" ${todo[1]==true ? "checked":""}>
        <input type="text" value="${todo}" class="changeTodo">
    </div>
    <div class="rightTodo">
        <button type="button" class="btn btn-outline-dark btn-sm change">
        <i class="fa-solid fa-check"></i></button>
    </div>
        `;
    e.target.parentElement.parentElement.parentElement.appendChild(x);
    st.deleteFromStorage(todo);
    e.target.parentElement.parentElement.remove();

    const change = document.querySelector(".change");

    change.addEventListener("click", (e) => {
      const nTodo =
        e.target.parentElement.parentElement.children[0].children[1].value;
      this.addToUI(nTodo);
      this.deleteFromUI(e);
      st.addTodoToStorage(nTodo);


      const del = document.querySelectorAll(".delete");
      const edit = document.querySelectorAll(".edit");
      const checkboxes = document.querySelectorAll(".checkbox");


      del.forEach((delBtn) => {
        delBtn.addEventListener("click", (e) => {
          st.deleteFromStorage(
            e.target.parentElement.parentElement.children[0].children[1]
              .textContent
          );
          this.deleteFromUI(e);
        });
      });
      
      edit.forEach((editbtn) => {
        editbtn.addEventListener("click", (e) => {
          this.editUI(e);
        });
      });

      checkboxes.forEach(cbox=>{
        cbox.addEventListener("click",(e)=>{
            st.doCheck(e.target.parentElement.children[1].textContent,!e.target.checked);
        })
    })

    });
  }
}
