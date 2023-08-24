import { getPosts, getPostBySlug } from "@/lib/posts";
import Image from "next/image";
import { notFound } from "next/navigation";
import { kv } from "@vercel/kv";
import Comments from "@/components/Comments";
import CommentsLoading from "@/components/CommentsLoading";
import { Suspense } from "react";
import Date from "../../../components/Date";

import { Inter } from "next/font/google";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

type BlogPostParams = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  const posts = getPosts();

  return posts.map((post) => {
    return {
      slug: post.slug,
    };
  });
}

export function generateMetadata({ params }: BlogPostParams) {
  const post = getPostBySlug(params.slug);
  return {
    title: post?.title,
    date: "POST: " + post?.date,
  };
}

export default async function IndividualPostPage({ params }: BlogPostParams) {
  const post = getPostBySlug(params.slug);
  const pageViews = await kv.incr(`${post?.slug}: views`);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-5xl m-auto px-4 py-8 md:px-8">
      <article className="circuit-board border-2 border-red-700 p-6 rounded-lg shadow-md gap-8">
        <h2 className="text-3xl font-semibold mb-4 max-w-lg  text-green-900">
          {post.title}
        </h2>
        <div
          dangerouslySetInnerHTML={{ __html: post.body.html }}
          className={inter.className + " mb-8 max-w-lg "}
        ></div>
        <div className="relative">
          <Image
            className="animate-none"
            src={post.img_url}
            alt={post.img_url}
            layout="responsive"
            width={100}
            height={100}
          />
          <div className="stomp finger absolute bottom-0 left-0 z-10 p-2 bg-green-500 text-white rounded-tr-lg rounded-bl-lg text-xl ml-2 mb-2 drop-shadow">
            <Link className="finger" href={`/blog/categories/${post.category}`}>
              {post.category}
            </Link>
          </div>
        </div>
        <p className={inter.className + " text-gray-600 mt-4"}>
          <Date dateString={post.date} />
        </p>
        <p>
          This Post has been viewed by{" "}
          <span className="text-bold text-black">{pageViews}</span> humungous
          pairs of abominable eyeholes
        </p>
        <Suspense fallback={<CommentsLoading />}>
          {/* @ts-ignore */}
          <Comments slug={params.slug} />
        </Suspense>
      </article>
    </div>
  );
}
