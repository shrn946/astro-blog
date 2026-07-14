import rss from '@astrojs/rss';
import { getActivePosts } from '../utils/blog';

export async function GET(context: any) {
  const posts = await getActivePosts();
  return rss({
    title: 'Antigravity.AI Blog',
    description: 'An enterprise-quality engineering blog covering AI, React, and clean web development.',
    site: context.site || 'https://astro-premium-blog.vercel.app',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>en</language>`,
  });
}
