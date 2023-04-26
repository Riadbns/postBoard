"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormPost() {
  const [title, setTitle] = useState("");
  const router = useRouter();
  async function submitPost(e: React.FormEvent) {
    e.preventDefault();
    const data = await fetch(`${window.location.origin}/api/createPost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const res = await data.json();
    router.refresh();
    setTitle("")
    if (!res.ok) console.log(res);
  }

  async function handledelete(){
    try {
      const res = await fetch(`http://localhost:3000/api/deleteAllPost`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        
      });
      router.refresh();
      console.log(`all Post deleted`);
      if (!res.ok) {
        throw new Error("Failed to delete post");
      }
    } catch (error) {
      console.error(error);
    } 
  }

  return (
      <form
        onSubmit={submitPost}
        className=" flex flex-wrap  gap-5 w-auto mt-10 h-auto items-center justify-center "
      >
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="type text here"
          className="flex-1 flex-shrink-0 max-h-[90px] min-w-[200px] max-w-[500px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <button
          type="submit"
          className="inline-flex items-center px-1 py-1 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          submit
        </button>
        <p
          onClick={handledelete}
          className=" items-center px-1 py-1 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Delete All
      </p>
      </form>
  );
}
