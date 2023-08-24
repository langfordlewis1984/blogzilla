import { getCategories, getPostsByCategory } from "@/lib/posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type CategoryParams = {
  params: {
    catslug: string;
  };
};

export function generateStaticParams({ params }: CategoryParams) {
  const categories = getCategories();

  return categories.map((category) => {
    return { category: params.catslug };
  });
}

export default function CatSlugPage({ params }: CategoryParams) {
  const posts = getPostsByCategory(params.catslug);

  if (!posts) {
    notFound();
  }

  // @ts-ignore
  const uppercaseCat =
    params.catslug.charAt(0).toUpperCase() + params.catslug.slice(1);

  return (
    <div className="px-4 py-8 md:px-8">
      <h2 className="text-4xl font-bold text-center mb-6">
        {uppercaseCat} Posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl m-auto">
        {posts.map((post) => {
          return (
            <div
              key={post.slug}
              className="circuit-board border-2 border-red-700 p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
            >
              <p className="text-gray-600 text-center">Date: {post.date}</p>
              <div className="flex-grow">
                <h3 className="stomp text-xl drop-shadow font-semibold mb-2 text-center">
                  <Link className="finger" href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <div className="flex justify-center items-center relative">
                  <div className="image-container aspect-w-1 aspect-h-1 w-64 h-64 relative">
                    <div className="finger stomp absolute bottom-0 left-0 z-10 p-2 bg-green-500 text-white rounded-tr-lg rounded-bl-lg text-xs ml-4 mb-2 drop-shadow">
                      <Link
                        className="finger"
                        href={`/blog/categories/${post.category}`}
                      >
                        {post.category}
                      </Link>
                    </div>

                    <div className="aspect-content">
                      <Link className="finger" href={`/blog/${post.slug}`}>
                        <Image
                          src={post.img_url}
                          alt={post.img_url}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
