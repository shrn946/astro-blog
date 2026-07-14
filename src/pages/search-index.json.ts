import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');
  const activePosts = posts.filter(post => !post.data.draft);

  // Load all authors to resolve names
  const authors = await getCollection('authors');
  const authorMap = new Map(authors.map(a => [a.id, a.data.name]));

  // Load all categories
  const categories = await getCollection('categories');
  const categoryMap = new Map(categories.map(c => [c.id, c.data.title]));

  const searchIndex = activePosts.map(post => ({
    title: post.data.title,
    slug: post.slug || post.id,
    description: post.data.description,
    tags: post.data.tags,
    category: categoryMap.get(post.data.category.id) || post.data.category.id,
    author: authorMap.get(post.data.author.id) || post.data.author.id,
    content: post.body,
    publishDate: post.data.publishDate,
    featuredImage: post.data.featuredImage
  }));

  return new Response(JSON.stringify(searchIndex), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
