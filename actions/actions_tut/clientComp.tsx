"use client";

import { useTransition } from "react";
//actions in a spt file with 'use server' on top
import { addTodoToDb } from "@/actions/actions_tut/actions/todos";

export default async function AddTodosBtn() {
  const [_, startTransition] = useTransition();
  const formData = new FormData();
  formData.append("title", "new todo");
  formData.append("description", "new todo description");
  return (
    <div>
      <button
        onClick={() => {
          startTransition(() => {
            addTodoToDb(formData);
          });
        }}
      >
        Submit
      </button>
    </div>
  );
}
