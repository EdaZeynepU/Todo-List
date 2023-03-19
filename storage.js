export default class storage{
    getTodosFromStorage(){
        const todos=JSON.parse(localStorage.getItem("todos"));
            if (todos==null){
                return [];
            } else {
                return todos;
            }
    }

    addTodoToStorage(newTodo){
        const todos=this.getTodosFromStorage();
        todos.push([newTodo,false]);
        localStorage.setItem("todos",JSON.stringify(todos));
    }

    deleteFromStorage(todo){
        let todos=this.getTodosFromStorage();
        const newTodos=todos.filter(x => x[0]!==todo);
        // todos.splice(todos.indexOf(todo),1);
        localStorage.setItem("todos",JSON.stringify(newTodos));
    }

    doCheck(cTodo,cBool){
        let todos=this.getTodosFromStorage();
        let indx;
        let i=-1;
        todos.forEach(element => {
            ++i;
            element[0]==cTodo && element[1]==cBool? indx=i:"";
        });
        todos[indx]=[cTodo,!cBool];
        localStorage.setItem("todos",JSON.stringify(todos));
    }
    
}




