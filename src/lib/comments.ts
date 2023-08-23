import short from "short-uuid";
import { kv } from "@vercel/kv";

export async function saveComment(
  username: string,
  comment: string,
  slug: string
) {
  const uuid = short.generate();
  const commentObject = JSON.stringify({
    username,
    comment,
    uuid,
  });

  kv.set(`comment:${uuid}`, commentObject);

  const commentsList = await kv.lpush(`comments:${slug}`, uuid);

  console.log(commentsList);

  return uuid;
}

async function delay(delay: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay);
  });
}

export async function getComments(slug: string) {
  const commentIds = await kv.lrange(`comments:${slug}`, 0, -1);
  const commentKeys = commentIds.map((id) => `comment:${id}`);

  if (commentKeys.length < 1) {
    return [];
  }
  await delay(4000);
  return await kv.mget(...commentKeys);
}
