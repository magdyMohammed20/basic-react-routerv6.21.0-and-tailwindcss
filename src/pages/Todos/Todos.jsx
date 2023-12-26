import TodoList from "../../components/Todos";
import TodosItems from "../../components/TodosList";

const Todos = () => {
  return (
    <div className="dark:bg-slate-900 py-16">
      <h1 className="text-4xl font-bold dark:text-white text-center">
        Todo List
      </h1>
      <div className="flex">
        <TodoList className="flex-1" />
        <TodosItems className="flex-1" />
      </div>
    </div>
  );
};

export default Todos;
