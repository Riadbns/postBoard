"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

interface Props {
  postId: number;
}

export default function Trashdelete(props: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const res = await fetch(`http://localhost:3000/api/deletePost`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: props.postId }),
      });
      router.refresh();
      console.log(`Post ${props.postId} deleted`);
      if (!res.ok) {
        throw new Error("Failed to delete post");
      }
    } catch (error) {
      console.error(error);
    } 
  }
  return (
    <>
      <button onClick={handleDelete}>
        {isDeleting ? (
          "Deleting..."
        ) : (
          <FontAwesomeIcon icon={faTrashAlt} className="h-10 w-6" />
        )}
      </button>
    </>
  );
}
