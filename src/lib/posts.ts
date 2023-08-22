import { allPosts as POSTS } from "contentlayer/generated";

const CATEGORIES = [
  { name: "Fun", catslug: "fun" },
  { name: "Academic", catslug: "academic" },
  { name: "Work", catslug: "work" },
];

export function getPosts() {
  return POSTS;
}

export function getPostBySlug(slug: string) {
  return POSTS.find((post) => post.slug === slug);
}

export function getPostsByCategory(catslug: string) {
  return POSTS.filter((post) => post.category === catslug);
}

export function getCategories() {
  return CATEGORIES;
}
