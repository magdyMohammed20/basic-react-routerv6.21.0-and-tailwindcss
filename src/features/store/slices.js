import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: []
}

const todoSlice = createSlice({
    name: 'todos',
    initialState: initialState,
    reducers: {
        addTodo: (state, action) => {
            console.log(state , action)
            const newTodo = {
                id: nanoid(),
                text: action.payload
            }

            state.todos.push(newTodo);
            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        deleteTodo: (state, action) => {
            const id = action.payload
            //console.log(state.todos.filter(item => item.id != id))
            state.todos = state.todos.filter(item => item.id != id)
            console.log(state.todos)

            if (state.todos.length == 0) {
                localStorage.removeItem('todos')
            } else {
                localStorage.setItem('todos', JSON.stringify(state.todos))

            }
        },
        loadTodos: (state) => { 
            if (localStorage.getItem('todos')) {
                state.todos = JSON.parse(localStorage.getItem('todos'))
            }
        },
        checkedTodo: (state, action) => {
            const id = action.payload;
        
            state.todos = state.todos.map(item => {
                if (item.id === id) {
                    return { ...item, checked: true };
                } else {
                    return item;
                }
            });
        
            // Update local storage outside the reducer
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        unCheckedTodo: (state, action) => {
            const id = action.payload;
        
            state.todos = state.todos.map(item => {
                if (item.id === id) {
                    return { ...item, checked: false };
                } else {
                    return item;
                }
            });
        
            // Update local storage outside the reducer
            localStorage.setItem('todos', JSON.stringify(state.todos));
        },
        deleteAll: (state) => {
        
           state.todos = []
        
            // Update local storage outside the reducer
            localStorage.removeItem('todos');
        },
        
    }
})

export const { addTodo, deleteTodo , loadTodos , checkedTodo , unCheckedTodo , deleteAll} = todoSlice.actions

export default todoSlice.reducer