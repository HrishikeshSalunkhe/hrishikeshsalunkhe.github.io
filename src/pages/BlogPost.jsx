import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt, FaSpinner, FaCalendarAlt } from 'react-icons/fa';
import { SiHashnode } from 'react-icons/si';
import { useState, useEffect } from 'react';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError('No post slug provided');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const query = `
        query {
          publication(host: "hrishikeshsalunkhe.hashnode.dev") {
            post(slug: "${slug}") {
              id
              title
              brief
              content {
                html
                markdown
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
      `;

      try {
        const response = await fetch('https://gql.hashnode.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        const data = await response.json();

        if (data.errors) {
          throw new Error(data.errors[0]?.message || 'Failed to fetch post');
        }

        if (data.data?.publication?.post) {
          setPost(data.data.publication.post);
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen section-padding pt-32">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 mb-8 transition-colors duration-200"
          >
            <FaArrowLeft />
            <span>Back to Blog</span>
          </Link>

          {loading && (
            <div className="glass p-12 text-center animate-fade-in-up">
              <FaSpinner className="text-primary-400 text-5xl animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading article...</p>
            </div>
          )}

          {error && (
            <article className="glass p-8 md:p-12 animate-fade-in-up text-center">
              <SiHashnode className="text-blue-500 text-6xl mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-100">
                Post Not Found
              </h1>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                {error}
              </p>
              <a
                href="https://hrishikeshsalunkhe.hashnode.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <SiHashnode />
                <span>Visit My Hashnode Blog</span>
                <FaExternalLinkAlt size={14} />
              </a>
            </article>
          )}

          {post && !loading && !error && (
            <article className="glass p-8 md:p-12 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-100">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-8 pb-6 border-b border-gray-700/50">
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                {post.readTimeInMinutes && (
                  <div className="flex items-center space-x-2">
                    <span>⏱️ {post.readTimeInMinutes} min read</span>
                  </div>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded text-xs font-medium border border-primary-500/30"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {post.brief && (
                <div className="mb-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                  <p className="text-gray-300 text-lg leading-relaxed font-medium">
                    {post.brief}
                  </p>
                </div>
              )}

              {post.content?.html && (
                <div className="prose prose-invert prose-lg max-w-none blog-content-preview">
                  <div
                    className="text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: post.content.html }}
                  />
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-gray-700/50 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                  <SiHashnode className="text-blue-500" />
                  <span>Published on Hashnode</span>
                </div>
                {post.url && (
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center space-x-2 text-sm"
                  >
                    <span>Read on Hashnode</span>
                    <FaExternalLinkAlt size={12} />
                  </a>
                )}
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
