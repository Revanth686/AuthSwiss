//meant to be used as reference for server actions
//server actions in server comp
import { addTodoToDb } from "./actions/todos";

export default async function ActionTut() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    cache: "no-cache",
    next: { tags: ["todos"] },
  });
  const todos = await res.json();

  return (
    <div>
      <main>
        <form action={addTodoToDb}>
          <input name="title" type="text" />
          <input name="description" type="text" />
        </form>
      </main>
      {todos}
    </div>
  );
}
