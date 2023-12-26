import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, loadTodos } from "../features/store/slices";
const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(addTodo(newTodo.trim()));
    setNewTodo("");
  };

  useEffect(() => {
    dispatch(loadTodos());
  }, []);

  return (
    <div className="flex-1 mt-0 p-6">
      {/* Todo Form */}
      <form onSubmit={addTodoHandler}>
        {/* Todo Input */}
        <div className="mb-4">
          <label
            htmlFor="todo"
            className="block text-sm font-medium text-slate-900 dark:text-gray-200 ">
            New Todo:
          </label>
          <input
            type="text"
            id="todo"
            name="todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            autoComplete="off"
            className="mt-1 p-2 border rounded-md w-full focus:outline-none text-slate-800 dark:text-slate-400 dark:bg-slate-700 dark:border-slate-400  "
          />
        </div>

        {/* Add Todo Button */}
        <button
          disabled={!newTodo.trim()}
          type="submit"
          className={` ${
            newTodo.trim() ? "bg-indigo-600" : "bg-gray-400"
          } text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 ${
            newTodo.trim() == "" &&
            "opacity-75 bg-gray-400 hover:bg-gray-400 transition-colors duration-300 ease-in-out"
          }`}>
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default TodoList;
