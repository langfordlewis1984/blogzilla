import { WEBSITE_URL } from "config";
import CommentForm from "./CommentForm";
import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Comments({ slug }: { slug: string }) {
  let comments = [];
  try {
    const commentsRes = await fetch(`${WEBSITE_URL}/api/comments/${slug}`, {
      next: { revalidate: 5 },
    });
    comments = await commentsRes.json();
  } catch (err) {
    console.log(err);
  }

  const user: User | null = await currentUser();

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4 border rounded bg-green-500">
      {user ? (
        <>
          {/* @ts-ignore */}
          <CommentForm slug={slug} username={user.username} />
        </>
      ) : (
        <Link href="/sign-in">Please sign in to Comment</Link>
      )}
      <h3 className="text-lg font-semibold mb-2 mt-6">Comments</h3>
      <ul className="space-y-4">
        {/* @ts-ignore */}
        {comments.map((comment) => {
          return (
            <li
              key={comment.uuid}
              className="bg-white p-4 border rounded shadow-sm"
            >
              <span className="text-green-500 font-bold">
                {comment.username} says...
              </span>
              <br />
              <span className="text-black">{comment.comment}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
