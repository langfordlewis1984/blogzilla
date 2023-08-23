import { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/posts";
import Image from "next/image";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Behold, my Barrage of Blog Posts!",
  description: "This is all the Blog Posts in my Barrage",
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className={inter.className + "px-4 py-8 md:px-8"}>
      <h2 className="text-4xl font-bold text-center mb-6">All Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          return (
            <div
              key={post.slug}
              className="circuit-board border-2 border-red-700 p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
            >
              <p className="text-gray-600 text-center">Date: {post.date}</p>
              <div className="flex-grow">
                <h3 className="text-xl drop-shadow font-semibold mb-2 text-center">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <div className="flex justify-center items-center relative">
                  <div className="absolute bottom-0 left-0 z-10 p-2 bg-green-500 text-white rounded-tr-lg rounded-bl-lg text-xs m-2 drop-shadow">
                    <Link href={`/blog/categories/${post.category}`}>
                      {post.category}
                    </Link>
                  </div>
                  <Image
                    src={post.img_url}
                    alt={post.img_url}
                    layout="responsive"
                    width={1}
                    height={1}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
