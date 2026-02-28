export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  content: string
}

export const posts: BlogPost[] = [
  // Add your own posts here using this format:
  //
  // {
  //   slug: "my-first-post",
  //   title: "My First Post",
  //   excerpt: "A short summary of the post that appears on the blog listing.",
  //   date: "February 28, 2026",
  //   readTime: "5 min read",
  //   category: "Essays",
  //   content: `Your full article content goes here.
  //
  // ## You Can Use Markdown-Style Headings
  //
  // And write multiple paragraphs separated by blank lines.
  //
  // **Bold text** works too.`,
  // },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getAllPosts(): BlogPost[] {
  return posts
}
