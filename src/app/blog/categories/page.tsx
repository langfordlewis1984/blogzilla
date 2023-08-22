import { getCategories } from "@/lib/posts";
import Link from "next/link";

export default function CategoriesPage() {
  const categories = getCategories();
  return (
    <div className="px-4 py-8 md:px-8">
      <h2 className="text-4xl font-bold text-center mb-6">Categories</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          return (
            <li key={category.catslug}>
              <Link
                href={`/blog/categories/${category.catslug}`}
                className="bg-red-500 border-2 border-red-700 p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:-translate-y-1 block"
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
