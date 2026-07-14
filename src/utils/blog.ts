import { getCollection, type CollectionEntry } from 'astro:content';

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const cleanContent = content.replace(/[#*`_\[\]()\-]/g, ' '); // strip basic markdown
  const words = cleanContent.trim().split(/\s+/).filter(w => w.length > 0).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export async function getActivePosts() {
  const posts = await getCollection('blog');
  return posts
    .filter(post => !post.data.draft)
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}

export function getRelatedPosts(currentPost: CollectionEntry<'blog'>, allPosts: CollectionEntry<'blog'>[], limit = 3) {
  return allPosts
    .filter(post => post.id !== currentPost.id && !post.data.draft)
    .map(post => {
      let score = 0;
      if (post.data.category.id === currentPost.data.category.id) {
        score += 3;
      }
      const commonTags = post.data.tags.filter(tag => currentPost.data.tags.includes(tag));
      score += commonTags.length;
      return { post, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}
