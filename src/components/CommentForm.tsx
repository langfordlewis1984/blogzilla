"use client";
import { WEBSITE_URL } from "config";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function CommentForm({ slug }: { slug: string }) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    // @ts-ignore
    const username = event.target.username.value || "anonymous";
    // @ts-ignore
    const comment = event.target.comment.value;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("comment", comment);

    const options = { body: formData, method: "POST" };
    const res = await fetch(`${WEBSITE_URL}/api/comments/${slug}`, options);
    console.log(res);

    // @ts-ignore
    event.target.username.value = "";
    // @ts-ignore
    event.target.comment.value = "";

    startTransition(() => {
      router.refresh();
      console.log("relocation  of formData");
    });
  }
  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="username">Name</label>
      <br />
      <input name="username" className="text-black" />
      <br />
      <br />
      <label htmlFor="comment">Comment</label>
      <br />
      <textarea
        name="comment"
        cols={30}
        rows={10}
        className="text-black"
        required
      ></textarea>
      <br />
      <br />
      <button
        type="submit"
        disabled={isPending}
        className="bg-red-500 border rounded p-4"
      >
        {isPending ? "Sending..." : "Send Comment"}
      </button>
    </form>
  );
}
