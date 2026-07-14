import React, { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import { Search as SearchIcon, X, CornerDownLeft, Sparkles } from 'lucide-react';

interface SearchItem {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  category: string;
  author: string;
  content: string;
  publishDate: string;
  featuredImage: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchData, setSearchData] = useState<SearchItem[]>([]);
  const fuseRef = useRef<Fuse<SearchItem> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      inputRef.current?.focus();
      
      // Load search index if not already loaded
      if (searchData.length === 0) {
        fetch('/search-index.json')
          .then(res => res.json())
          .then(data => {
            setSearchData(data);
            fuseRef.current = new Fuse(data, {
              keys: [
                { name: 'title', weight: 0.4 },
                { name: 'description', weight: 0.2 },
                { name: 'tags', weight: 0.15 },
                { name: 'category', weight: 0.1 },
                { name: 'author', weight: 0.05 },
                { name: 'content', weight: 0.1 }
              ],
              threshold: 0.3,
              ignoreLocation: true
            });
          })
          .catch(err => console.error('Failed to load search index:', err));
      }
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!fuseRef.current || !query) {
      setResults([]);
      return;
    }
    const searchResults = fuseRef.current.search(query).map(r => r.item);
    setResults(searchResults);
    setSelectedIndex(0);
  }, [query]);

  // Handle Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(results.length, 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % Math.max(results.length, 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          window.location.href = `/blog/${results[selectedIndex].slug}`;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[10vh] bg-black/60 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-2xl overflow-hidden rounded-2xl glass shadow-2xl flex flex-col max-h-[80vh] border border-white/10"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-white/10">
          <SearchIcon className="w-5 h-5 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search articles, tags, authors..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent border-0 text-white outline-none placeholder-gray-500 text-lg py-1"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-2">
          {query === '' ? (
            <div className="text-center py-12 text-gray-400">
              <Sparkles className="w-8 h-8 mx-auto mb-3 text-purple-400 animate-pulse" />
              <p className="text-base font-semibold">Search the Premium AI Knowledge Base</p>
              <p className="text-sm text-gray-500 mt-1">Type keywords, categories, or author names</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No results found for "{query}"</p>
            </div>
          ) : (
            results.map((item, index) => (
              <a
                key={item.slug}
                href={`/blog/${item.slug}`}
                className={`flex items-start p-3 rounded-xl transition-all border ${
                  index === selectedIndex
                    ? 'bg-purple-600/30 border-purple-500/50 text-white scale-[1.01]'
                    : 'border-transparent hover:bg-white/5 text-gray-300'
                }`}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <img 
                  src={item.featuredImage} 
                  alt={item.title} 
                  className="w-16 h-12 object-cover rounded-lg mr-4 border border-white/10"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase tracking-wider font-semibold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {item.author}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold truncate">{item.title}</h4>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{item.description}</p>
                </div>
                {index === selectedIndex && (
                  <span className="self-center ml-2 text-purple-300 flex items-center gap-1 text-[10px] opacity-70">
                    <span>Enter</span>
                    <CornerDownLeft className="w-3 h-3" />
                  </span>
                )}
              </a>
            ))
          )}
        </div>

        {/* Keyboard Hints Footer */}
        <div className="px-4 py-2 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] text-gray-400">
          <div className="flex gap-4">
            <span><kbd className="bg-white/10 px-1 py-0.5 rounded">↑↓</kbd> Navigate</span>
            <span><kbd className="bg-white/10 px-1 py-0.5 rounded">Enter</kbd> Select</span>
            <span><kbd className="bg-white/10 px-1 py-0.5 rounded">Esc</kbd> Close</span>
          </div>
          <div>Powered by Fuse.js</div>
        </div>
      </div>
    </div>
  );
}
