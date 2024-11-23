import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { client, urlFor } from '../lib/sanity';
import { singlePostQuery } from '../lib/queries';
import { formatDate } from '../utils/formatDate';
import PortableText from './PortableText';

interface PostData {
  _id: string;
  title: string;
  mainImage: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  body: any[];
  publishedAt: string;
  author: {
    name: string;
    image: any;
    bio: string;
  };
  categories: { title: string }[];
}

interface BlogPostProps {
  slug: string;
}

export default function BlogPost({ slug }: BlogPostProps) {
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await client.fetch(singlePostQuery, { slug });
        console.log('Fetched post:', result); // Debug log
        setPost(result);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const getImageUrl = (image: any) => {
    if (!image?.asset?._ref) return null;
    return urlFor(image)
      .width(1200)
      .height(675)
      .fit('crop')
      .quality(80)
      .url();
  };

  return (
    <article className="pt-32 pb-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : !post ? (
          <div className="flex justify-center items-center h-64">
            <h1 className="text-2xl text-gray-600">Post not found</h1>
          </div>
        ) : (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
              <div className="flex justify-center gap-2 mb-6">
                {post.categories?.map((category) => (
                  <span
                    key={category.title}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
                {post.title}
              </h1>
              <div className="flex items-center justify-center mb-8">
                {post.author?.image && (
                  <img
                    src={getImageUrl(post.author.image)}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                )}
                <div className="text-left">
                  <p className="font-medium text-gray-900">{post.author?.name}</p>
                  <time className="text-sm text-gray-500">
                    {formatDate(post.publishedAt)}
                  </time>
                </div>
              </div>
            </div>

            {post.mainImage && (
              <div className="relative w-full h-[400px] mb-12">
                <img
                  src={getImageUrl(post.mainImage)}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <PortableText value={post.body} />
            </div>

            {post.author?.bio && (
              <div className="mt-16 p-8 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-4">
                  {post.author.image && (
                    <img
                      src={getImageUrl(post.author.image)}
                      alt={post.author.name}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">About {post.author.name}</h3>
                    <p className="text-gray-600">{post.author.bio}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </article>
  );
}