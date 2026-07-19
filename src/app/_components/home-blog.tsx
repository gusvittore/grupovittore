import { getHomeBlogPosts } from "@/lib/blog/content";
import { HomeBlogClient } from "./home-blog-client";

export function HomeBlog() {
  const articles = getHomeBlogPosts();

  return <HomeBlogClient articles={articles} />;
}