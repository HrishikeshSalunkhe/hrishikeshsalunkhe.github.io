import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt, FaSpinner, FaCalendarAlt, FaGlobe } from 'react-icons/fa';
import { SiHashnode } from 'react-icons/si';
import { useState, useEffect } from 'react';
import {
  getLocalPostBySlug,
  CHATGPT_CREDIT_URL,
  HOW_BROWSERS_WORK_REFERENCE_URL,
} from '../data/localBlogPosts';

const DEFAULT_DOCUMENT_TITLE = 'Hrishikesh Salunkhe - Software Engineer';
const DEFAULT_META_DESCRIPTION =
  'Hrishikesh Salunkhe - Software Engineer with 3+ years of experience. Portfolio showcasing projects, skills, and experience.';
const DEFAULT_META_KEYWORDS = 'software engineer, web developer, React, portfolio';

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

      const local = getLocalPostBySlug(slug);
      if (local) {
        setPost({
          title: local.title,
          brief: local.brief,
          content: { html: local.contentHtml },
          publishedAt: local.publishedAt,
          readTimeInMinutes: local.readTimeInMinutes,
          tags: local.tags,
          isLocal: true,
          seoTitle: local.seoTitle,
          seoDescription: local.seoDescription,
          seoKeywords: local.seoKeywords,
        });
        setLoading(false);
        return;
      }

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

  useEffect(() => {
    if (!post?.isLocal) return;

    const seoTitle = post.seoTitle || post.title;
    const seoDesc = post.seoDescription || post.brief;
    const keywords = post.seoKeywords;

    const prevTitle = document.title;
    const metaDescEl = document.querySelector('meta[name="description"]');
    const prevDesc = metaDescEl?.getAttribute('content') ?? DEFAULT_META_DESCRIPTION;
    const metaKwEl = document.querySelector('meta[name="keywords"]');
    const prevKw = metaKwEl?.getAttribute('content') ?? DEFAULT_META_KEYWORDS;

    document.title = `${seoTitle} | Hrishikesh Salunkhe`;
    if (metaDescEl) metaDescEl.setAttribute('content', seoDesc);
    if (metaKwEl && keywords) metaKwEl.setAttribute('content', keywords);

    let script = document.getElementById('article-jsonld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'article-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: post.title,
      description: seoDesc,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      author: {
        '@type': 'Person',
        name: 'Hrishikesh Salunkhe',
      },
      keywords: keywords,
      ...(pageUrl
        ? {
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': pageUrl,
            },
          }
        : {}),
    });

    return () => {
      document.title = prevTitle;
      if (metaDescEl) metaDescEl.setAttribute('content', prevDesc);
      if (metaKwEl && keywords) metaKwEl.setAttribute('content', prevKw);
      document.getElementById('article-jsonld')?.remove();
    };
  }, [post]);

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
            <article
              className="glass p-8 md:p-12 animate-fade-in-up"
              itemScope
              itemType="https://schema.org/TechArticle"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-100" itemProp="headline">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-8 pb-6 border-b border-gray-700/50">
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt />
                  <time dateTime={post.publishedAt} itemProp="datePublished">
                    {formatDate(post.publishedAt)}
                  </time>
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
                  <p className="text-gray-300 text-lg leading-relaxed font-medium" itemProp="description">
                    {post.brief}
                  </p>
                </div>
              )}

              {post.content?.html && (
                <div
                  className={`prose prose-invert prose-lg max-w-none blog-content-preview ${
                    post.isLocal ? 'blog-content-preview--rich' : ''
                  }`}
                >
                  <div
                    className="text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: post.content.html }}
                  />
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-gray-700/50 space-y-6">
                {post.isLocal ? (
                  <>
                    <div className="flex items-center space-x-2 text-gray-500 text-sm">
                      <FaGlobe className="text-sky-400" />
                      <span>Hosted on this site</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Sources:{' '}
                      <a
                        href={CHATGPT_CREDIT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-400 hover:text-primary-300"
                      >
                        ChatGPT
                      </a>
                      {' · '}
                      <a
                        href={HOW_BROWSERS_WORK_REFERENCE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
                      >
                        How browsers work — The rendering engine
                        <FaExternalLinkAlt size={12} />
                      </a>
                    </p>
                  </>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
