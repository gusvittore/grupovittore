import { getAllBlogPosts } from "@/lib/blog/content";
import { BlogHomeClient } from "./blog-home-client";

export function BlogHome() {
  const posts = getAllBlogPosts();

  return <BlogHomeClient posts={posts} />;
}