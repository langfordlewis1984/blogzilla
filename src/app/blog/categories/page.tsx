import { getCategories } from "@/lib/posts";
import Link from "next/link";
import { WEBSITE_URL } from "config";

export default function CategoriesPage() {
  const categories = getCategories();
  return (
    <div className="px-4 py-8 md:px-8">
      <h2 className="text-4xl font-bold text-center mb-6">Categories</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl m-auto">
        {categories.map((category) => {
          return (
            <li key={category.catslug}>
              <Link
                href={`${WEBSITE_URL}/blog/categories/${category.catslug}`}
                className="finger stomp circuit-board border-2 border-red-700 p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
              >
                {category.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
