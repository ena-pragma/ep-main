import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';
import { allPostsQuery } from '../lib/queries';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  publishedAt: string;
  excerpt: string;
  author: {
    name: string;
    image: any;
  };
  categories: { title: string }[];
}

export default function BlogArchive() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await client.fetch(allPostsQuery);
        console.log('Fetched posts:', result); // Debug log
        setPosts(result);
        setError(null);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getImageUrl = (image: any) => {
    if (!image?.asset?._ref) return null;
    return urlFor(image)
      .width(600)
      .height(400)
      .fit('crop')
      .quality(80)
      .url();
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24 bg-white">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Our Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights and updates from our team
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {post.mainImage && (
                <div className="relative h-48">
                  <img
                    src={getImageUrl(post.mainImage)}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories?.map((category) => (
                    <span
                      key={category.title}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  <Link
                    to={`/blog/${post.slug.current}`}
                    className="text-gray-900 hover:text-gray-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {post.author?.image && (
                      <img
                        src={getImageUrl(post.author.image)}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                    )}
                    <span className="text-sm text-gray-600">{post.author?.name}</span>
                  </div>
                  <time className="text-sm text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}