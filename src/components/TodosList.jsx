import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  deleteTodo,
  checkedTodo,
  unCheckedTodo,
  deleteAll,
} from "../features/store/slices";
import { Check, Delete, Trash2, X } from "lucide-react";

const TodosItems = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  return todos.length != 0 ? (
    <div className="mt-10 p-6 mt-4 flex-1">
      <div className="text-white bg-slate-800 dark:bg-slate-700 p-2 rounded-md mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium mb-0 ">Todo Items:</h2>

        <button
          onClick={() => dispatch(deleteAll())}
          disabled={todos.length == 0}
          className={`${
            todos.length == 0
              ? "bg-gray-500 text-gray-800 hover:bg-gray-500"
              : "bg-red-400"
          }  text-white p-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring  ring-red-400 focus:border-red-300`}>
          <Delete />
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            className="mb-2 dark:text-slate-400 flex justify-between items-center">
            <span
              className={`${todo.checked ? "text-gray-400 font-bold" : ""}`}
              style={{
                textDecoration: todo.checked ? "line-through" : "none",
              }}>
              {index + 1}- {todo.text}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={todo.checked}
                onClick={() => dispatch(checkedTodo(todo.id))}
                className={`${
                  todo.checked
                    ? "bg-gray-500 text-gray-800 hover:bg-gray-500"
                    : "bg-green-600 hover:bg-green-600"
                }  text-white p-2 rounded-md  focus:outline-none focus:ring  ring-green-400 focus:border-green-300`}>
                <Check size={16} />
              </button>

              <button
                disabled={!todo.checked}
                onClick={() => dispatch(unCheckedTodo(todo.id))}
                className={`  text-white p-2 rounded-md  focus:outline-none focus:ring  ring-yellow-400 focus:border-yellow-300 ${
                  !todo.checked
                    ? "bg-gray-500 text-gray-800 hover:bg-gray-600"
                    : "bg-yellow-600 hover:bg-yellow-600"
                }`}>
                <X size={16} />
              </button>

              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                className=" bg-red-600 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring  ring-red-400 focus:border-red-300">
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    ""
  );
};

export default TodosItems;
