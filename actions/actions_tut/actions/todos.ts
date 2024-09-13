import { revalidatePath, revalidateTag } from "next/cache";

export const addTodoToDb = async (e: FormData) => {
  // can be in @/actions/todos.ts file
  "use server";

  const title = e.get("title");
  const description = e.get("description");

  const newTodo = { title, description };
  await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify(newTodo),
  });
  revalidateTag("todos"); //refetch all REQUESTS with tag "todos"
  revalidatePath("/todos"); //refetch all requests on /todos routePage
};
