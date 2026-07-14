import React, { useState, useMemo } from 'react';
import { Grid, List, Search, ArrowUpDown, ChevronLeft, ChevronRight, Clock, Tag, User } from 'lucide-react';

interface Post {
  title: string;
  slug: string;
  description: string;
  publishDate: string;
  readingTime: string;
  category: { id: string; name: string };
  author: { id: string; name: string; photo: string };
  tags: string[];
  difficulty: string;
  featuredImage: string;
  featured: boolean;
}

interface BlogListingProps {
  initialPosts: Post[];
  categories: { id: string; name: string }[];
  authors: { id: string; name: string }[];
}

export default function BlogListing({ initialPosts, categories, authors }: BlogListingProps) {
  // States
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'az' | 'reading-time' | 'featured'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    initialPosts.forEach(post => post.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [initialPosts]);

  // Filter & Sort logic
  const filteredAndSortedPosts = useMemo(() => {
    let result = [...initialPosts];

    // Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter(post => post.category.id === selectedCategory);
    }

    // Author Filter
    if (selectedAuthor !== 'all') {
      result = result.filter(post => post.author.id === selectedAuthor);
    }

    // Tag Filter
    if (selectedTag !== 'all') {
      result = result.filter(post => post.tags.includes(selectedTag));
    }

    // Search query filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sort mapping
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
      }
      if (sortBy === 'az') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'reading-time') {
        const timeA = parseInt(a.readingTime) || 0;
        const timeB = parseInt(b.readingTime) || 0;
        return timeA - timeB;
      }
      if (sortBy === 'featured') {
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
      return 0;
    });

    return result;
  }, [initialPosts, selectedCategory, selectedAuthor, selectedTag, search, sortBy]);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedAuthor, selectedTag, search, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return filteredAndSortedPosts.slice(start, start + postsPerPage);
  }, [filteredAndSortedPosts, currentPage]);

  return (
    <div className="space-y-8">
      {/* Search and Filters Control bar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center p-4 rounded-2xl glass border border-white/5">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search filtered posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-500 transition-all"
          />
        </div>

        {/* Filters and sorting */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Select */}
          <select 
            value={selectedCategory} 
            onChange={e => setSelectedCategory(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300 outline-none focus:ring-1 focus:ring-purple-500"
          >
            <option value="all" className="bg-[#121118]">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id} className="bg-[#121118]">{c.name}</option>)}
          </select>

          {/* Author Select */}
          <select 
            value={selectedAuthor} 
            onChange={e => setSelectedAuthor(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300 outline-none focus:ring-1 focus:ring-purple-500"
          >
            <option value="all" className="bg-[#121118]">All Authors</option>
            {authors.map(a => <option key={a.id} value={a.id} className="bg-[#121118]">{a.name}</option>)}
          </select>

          {/* Sort Select */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl px-2.5 py-2 text-xs text-gray-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
            <select 
              value={sortBy} 
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-transparent border-0 outline-none pr-1 cursor-pointer"
            >
              <option value="newest" className="bg-[#121118]">Newest</option>
              <option value="oldest" className="bg-[#121118]">Oldest</option>
              <option value="az" className="bg-[#121118]">A-Z</option>
              <option value="reading-time" className="bg-[#121118]">Reading Time</option>
              <option value="featured" className="bg-[#121118]">Featured</option>
            </select>
          </div>

          {/* View Toggles */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
            <button 
              onClick={() => setView('grid')}
              className={`p-1.5 rounded-lg transition-colors ${view === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
              aria-label="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-1.5 rounded-lg transition-colors ${view === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tags Quick Filter bar */}
      <div className="flex flex-wrap gap-2 items-center p-3 rounded-xl bg-white/2 border border-white/5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mr-2">Quick Tags:</span>
        <button 
          onClick={() => setSelectedTag('all')}
          className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
            selectedTag === 'all' 
              ? 'bg-purple-500/20 border-purple-500 text-purple-400' 
              : 'border-transparent text-gray-400 hover:bg-white/5'
          }`}
        >
          All
        </button>
        {allTags.map(tag => (
          <button 
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
              selectedTag === tag 
                ? 'bg-purple-500/20 border-purple-500 text-purple-400' 
                : 'border-transparent text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Posts Render Grid / List */}
      {paginatedPosts.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-base font-semibold">No articles found matching filters.</p>
          <button 
            onClick={() => {
              setSelectedCategory('all');
              setSelectedAuthor('all');
              setSelectedTag('all');
              setSearch('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/10"
          >
            Reset Filters
          </button>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPosts.map(post => (
            <article key={post.slug} className="flex flex-col rounded-2xl glass border border-white/5 overflow-hidden hover:scale-[1.01] hover:border-purple-500/20 transition-all">
              <a href={`/blog/${post.slug}`} className="block h-48 overflow-hidden relative">
                <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                {post.featured && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-purple-600 text-white text-[9px] font-bold tracking-wider">
                    FEATURED
                  </span>
                )}
              </a>
              <div className="p-5 flex flex-col flex-grow">
                <span className="text-[10px] uppercase font-bold text-purple-400 mb-1">{post.category.name}</span>
                <h3 className="text-base font-bold line-clamp-2 hover:text-purple-400 transition-colors mb-2">
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </h3>
                <p className="text-xs text-gray-400 line-clamp-3 mb-4 leading-relaxed">{post.description}</p>
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={post.author.photo} alt={post.author.name} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-[11px] text-gray-400">{post.author.name}</span>
                  </div>
                  <span className="text-[10px] text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readingTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedPosts.map(post => (
            <article key={post.slug} className="rounded-2xl glass border border-white/5 overflow-hidden hover:border-purple-500/20 transition-all flex flex-col sm:flex-row gap-6 p-4">
              <a href={`/blog/${post.slug}`} className="block w-full sm:w-48 h-32 rounded-xl overflow-hidden relative self-center flex-shrink-0">
                <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
              </a>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] uppercase font-bold text-purple-400">{post.category.name}</span>
                    <span className="text-gray-600 text-xs">•</span>
                    <span className="text-[10px] text-gray-500">{new Date(post.publishDate).toLocaleDateString('en-US', { dateStyle: 'short' })}</span>
                  </div>
                  <h3 className="text-lg font-bold hover:text-purple-400 transition-colors mb-1">
                    <a href={`/blog/${post.slug}`}>{post.title}</a>
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{post.description}</p>
                </div>
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <img src={post.author.photo} alt={post.author.name} className="w-5 h-5 rounded-full object-cover" />
                    <span className="text-[11px] text-gray-400">{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-gray-500">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readingTime}</span>
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] uppercase tracking-wider text-purple-300">{post.difficulty}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-xl glass border border-white/5 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`w-9 h-9 rounded-xl text-xs font-bold transition-all border ${
                currentPage === pageNum
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'glass border-white/5 text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl glass border border-white/5 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
            aria-label="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
