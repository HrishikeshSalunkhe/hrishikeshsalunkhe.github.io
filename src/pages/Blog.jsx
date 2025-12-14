import { useEffect, useState, useMemo } from "react";
import { FaCalendarAlt, FaExternalLinkAlt, FaTimes, FaCode, FaPalette, FaGitAlt, FaLinux, FaBookOpen, FaSpinner } from 'react-icons/fa';
import { SiHashnode } from 'react-icons/si';

const HASHNODE_API = "https://gql.hashnode.com";
const BLOG_HOST = "hrishikeshsalunkhe.hashnode.dev";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postContent, setPostContent] = useState(null);
  const [contentLoading, setContentLoading] = useState(false);
  const [contentError, setContentError] = useState(null);

  // Categorize posts based on URL
  const categorizePost = (url) => {
    const urlLower = url.toLowerCase();
    if (urlLower.includes('javascript') || urlLower.includes('es6') || urlLower.includes('clock') || urlLower.includes('stopwatch')) {
      return 'nodejs-javascript';
    }
    if (urlLower.includes('web-design') || urlLower.includes('designing')) {
      return 'web-design';
    }
    if (urlLower.includes('git')) {
      return 'devops-git';
    }
    if (urlLower.includes('linux') || urlLower.includes('ubuntu') || urlLower.includes('terminal') || urlLower.includes('snap') || urlLower.includes('npm')) {
      return 'linux-ubuntu';
    }
    return 'remaining';
  };

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(HASHNODE_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query GetPosts($host: String!) {
                publication(host: $host) {
                  posts(first: 20) {
                    edges {
                      node {
                        title
                        brief
                        url
                        slug
                        publishedAt
                        readTimeInMinutes
                        tags {
                          name
                        }
                      }
                    }
                  }
                }
              }
            `,
            variables: {
              host: BLOG_HOST,
            },
          }),
        });

        const json = await res.json();

        if (json.errors) {
          throw new Error(json.errors[0].message);
        }

        // Map and deduplicate posts by URL
        const postsMap = new Map();
        json.data.publication.posts.edges.forEach(({ node }) => {
          if (node.url && !postsMap.has(node.url)) {
            postsMap.set(node.url, {
              ...node,
              category: categorizePost(node.url),
            });
          }
        });

        const postsData = Array.from(postsMap.values());
        setPosts(postsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Extract slug from URL
  const extractSlugFromUrl = (url) => {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/').filter(Boolean);
      return pathParts[pathParts.length - 1] || '';
    } catch {
      return '';
    }
  };

  // Fetch individual post content for preview
  const fetchPostContent = async (post) => {
    setContentLoading(true);
    setContentError(null);
    setPostContent(null);

    const slug = extractSlugFromUrl(post.url);
    if (!slug) {
      setContentError('Unable to extract post slug from URL');
      setContentLoading(false);
      return;
    }

    try {
      const res = await fetch(HASHNODE_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query GetPost($host: String!, $slug: String!) {
              publication(host: $host) {
                post(slug: $slug) {
                  title
                  brief
                  content {
                    html
                  }
                  publishedAt
                  readTimeInMinutes
                  tags {
                    name
                  }
                  url
                }
              }
            }
          `,
          variables: {
            host: BLOG_HOST,
            slug: slug,
          },
        }),
      });

      const json = await res.json();

      if (json.errors) {
        throw new Error(json.errors[0].message);
      }

      if (json.data?.publication?.post) {
        setPostContent(json.data.publication.post);
      } else {
        throw new Error('Post not found');
      }
    } catch (err) {
      setContentError(err.message);
    } finally {
      setContentLoading(false);
    }
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    fetchPostContent(post);
  };

  const closePostView = () => {
    setSelectedPost(null);
    setPostContent(null);
    setContentError(null);
    setContentLoading(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const categoryConfig = {
    'nodejs-javascript': {
      name: 'Node.js/JavaScript',
      icon: FaCode,
      color: 'text-yellow-400',
    },
    'web-design': {
      name: 'Web Design',
      icon: FaPalette,
      color: 'text-pink-400',
    },
    'devops-git': {
      name: 'DevOps (Git)',
      icon: FaGitAlt,
      color: 'text-orange-400',
    },
    'linux-ubuntu': {
      name: 'Linux and Ubuntu',
      icon: FaLinux,
      color: 'text-green-400',
    },
    'remaining': {
      name: 'Other',
      icon: FaBookOpen,
      color: 'text-gray-400',
    },
  };

  // Organize posts by category using useMemo to prevent unnecessary recalculations
  const categories = useMemo(() => {
    const organized = {};
    posts.forEach(post => {
      if (!post || !post.url || !post.title) return; // Skip invalid posts
      const category = post.category || 'remaining';
      if (!organized[category]) {
        organized[category] = [];
      }
      organized[category].push(post);
    });

    return ['nodejs-javascript', 'web-design', 'devops-git', 'linux-ubuntu', 'remaining']
      .map(key => ({
        key,
        ...categoryConfig[key],
        posts: (organized[key] || []).filter(post => post && post.title && post.url), // Filter out invalid posts
      }))
      .filter(cat => cat.posts.length > 0);
  }, [posts]);

  if (loading) {
    return (
      <div className="min-h-screen section-padding pt-32">
        <div className="container-custom">
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="text-primary-400 text-5xl animate-spin mb-4" />
            <p className="text-gray-400">Loading blogs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen section-padding pt-32">
        <div className="container-custom">
          <div className="glass p-12 text-center animate-fade-in-up">
            <SiHashnode className="text-blue-500 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-100 mb-2">Error Loading Posts</h2>
            <p className="text-gray-400 mb-6">Error: {error}</p>
            <a
              href="https://hrishikeshsalunkhe.hashnode.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <SiHashnode />
              <span>Visit Hashnode Blog</span>
              <FaExternalLinkAlt size={12} />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-padding pt-32">
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
          Blog
        </h1>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Thoughts, tutorials, and insights on software development, web technologies, and best practices.
        </p>

        <div className="max-w-6xl mx-auto">
          {/* Blog Posts by Category */}
          <div className="space-y-8">
            {categories.map((category, categoryIndex) => {
              const Icon = category.icon;
              if (category.posts.length === 0) return null;

              return (
                <div key={category.key} className="animate-fade-in-up" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
                  {/* Category Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <Icon className={`${category.color} text-2xl`} />
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-100">
                      {category.name}
                    </h2>
                    <span className="text-gray-500 text-sm">({category.posts.length})</span>
                  </div>

                  {/* Posts in Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.posts
                      .filter(post => post && post.title && post.url) // Ensure post is valid
                      .map((post) => (
                        <div
                          key={post.url || post.slug || `post-${post.title}`}
                          className="glass p-6 card-hover cursor-pointer"
                          onClick={() => handlePostClick(post)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-bold text-gray-100 hover:text-primary-400 transition-colors duration-200 flex-1">
                              {post.title || 'Untitled Post'}
                            </h3>
                            <FaExternalLinkAlt className="text-primary-400 flex-shrink-0 ml-2" size={14} />
                          </div>
                          
                          <p className="text-gray-400 mb-4 text-sm line-clamp-3">
                            {post.brief || 'Read the full article to learn more.'}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-2">
                              <FaCalendarAlt />
                              <span>{formatDate(post.publishedAt)}</span>
                            </div>
                            {post.readTimeInMinutes && (
                              <div className="flex items-center space-x-2">
                                <span>⏱️ {post.readTimeInMinutes} min</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {categories.length === 0 && (
            <div className="glass p-12 text-center animate-fade-in-up">
              <SiHashnode className="text-blue-500 text-5xl mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-100 mb-2">No Posts Found</h2>
              <p className="text-gray-400 mb-6">
                No blog posts available at the moment.
              </p>
            </div>
          )}
        </div>

        {/* Modal/Overlay for viewing blog post preview */}
        {selectedPost && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={closePostView}
          >
            <div 
              className="glass w-full max-w-3xl max-h-[90vh] flex flex-col animate-fade-in-up overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                <div className="flex items-center space-x-3 flex-1">
                  <SiHashnode className="text-blue-500 text-2xl flex-shrink-0" />
                  <h2 className="text-2xl font-bold text-gray-100 pr-4">
                    {selectedPost.title}
                  </h2>
                </div>
                <button
                  onClick={closePostView}
                  className="text-gray-400 hover:text-gray-100 transition-colors duration-200 p-2 hover:bg-gray-700/50 rounded flex-shrink-0"
                  aria-label="Close"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Content Preview */}
              <div className="flex-1 overflow-y-auto p-6">
                {contentLoading && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <FaSpinner className="text-primary-400 text-4xl animate-spin mb-4" />
                    <p className="text-gray-400">Loading article preview...</p>
                  </div>
                )}

                {contentError && (
                  <div className="space-y-4">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                      <p className="text-red-400 text-sm">{contentError}</p>
                    </div>
                    {/* Fallback to excerpt */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-400 pb-4 border-b border-gray-700/50">
                        <div className="flex items-center space-x-2">
                          <FaCalendarAlt />
                          <span>{formatDate(selectedPost.publishedAt)}</span>
                        </div>
                        {selectedPost.readTimeInMinutes && (
                          <div className="flex items-center space-x-2">
                            <span>⏱️ {selectedPost.readTimeInMinutes} min read</span>
                          </div>
                        )}
                      </div>
                      <div className="py-4">
                        <p className="text-gray-300 text-lg leading-relaxed">
                          {selectedPost.brief || 'Unable to load preview. Click below to read the full article.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {postContent && !contentLoading && !contentError && (
                  <div className="space-y-4">
                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 pb-4 border-b border-gray-700/50">
                      <div className="flex items-center space-x-2">
                        <FaCalendarAlt />
                        <span>{formatDate(postContent.publishedAt)}</span>
                      </div>
                      {postContent.readTimeInMinutes && (
                        <div className="flex items-center space-x-2">
                          <span>⏱️ {postContent.readTimeInMinutes} min read</span>
                        </div>
                      )}
                      {postContent.tags && postContent.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {postContent.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs"
                            >
                              #{tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Brief/Excerpt */}
                    {postContent.brief && (
                      <div className="py-4 border-b border-gray-700/50">
                        <p className="text-gray-300 text-lg leading-relaxed font-medium">
                          {postContent.brief}
                        </p>
                      </div>
                    )}

                    {/* Article Content Preview */}
                    {postContent.content?.html && (
                      <div className="prose prose-invert prose-lg max-w-none">
                        <div
                          className="text-gray-300 leading-relaxed blog-content-preview"
                          dangerouslySetInnerHTML={{
                            __html: postContent.content.html.substring(0, 2000) + 
                            (postContent.content.html.length > 2000 ? '...' : '')
                          }}
                        />
                        {postContent.content.html.length > 2000 && (
                          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                            <p className="text-gray-400 text-sm text-center">
                              This is a preview. Read the full article on Hashnode for complete content.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Hashnode Branding */}
                    <div className="flex items-center space-x-2 text-gray-500 text-sm pt-4 border-t border-gray-700/50">
                      <SiHashnode className="text-blue-500" />
                      <span>Published on Hashnode</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-700/50 bg-gray-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href="https://hrishikeshsalunkhe.hashnode.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm inline-flex items-center space-x-2"
                >
                  <SiHashnode />
                  <span>View All Posts</span>
                  <FaExternalLinkAlt size={10} />
                </a>
                <a
                  href={selectedPost.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center space-x-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaBookOpen />
                  <span>Read Full Article on Hashnode</span>
                  <FaExternalLinkAlt size={12} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
