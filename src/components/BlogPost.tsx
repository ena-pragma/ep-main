import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { client } from '../lib/sanity';
import { singlePostQuery } from '../lib/queries';
import { formatDate } from '../utils/formatDate';
import PortableText from './PortableText';

interface PostData {
  _id: string;
  title: string;
  mainImage: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
      url: string;  // Added url field
    };
  };
  body: any[];
  publishedAt: string;
  author: {
    name: string;
    authorImage: {  // Changed from 'image' to 'authorImage'
      _type: 'image';
      asset: {
        _ref: string;
        _type: 'reference';
        url: string;  // Added url field
      };
    };
    bio: string;
  };
  categories: { title: string }[];
}

interface BlogPostProps {
  slug: string;
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80';

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
        console.log('Fetched post data:', result);
        setPost(result);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const getImageUrl = (image: any) => {
    // First try to use the direct URL if available
    if (image?.asset?.url) {
      return image.asset.url;
    }
    
    // Fallback to constructing URL from _ref if available
    if (!image?.asset?._ref) {
      console.warn('No image asset reference or URL found:', image);
      return DEFAULT_IMAGE;
    }

    const imageUrl = `https://cdn.sanity.io/images/${import.meta.env.VITE_SANITY_PROJECT_ID}/${import.meta.env.VITE_SANITY_DATASET}/${image.asset._ref
      .replace('image-', '')
      .replace('-jpg', '.jpg')
      .replace('-png', '.png')
      .replace('-webp', '.webp')}`;

    return imageUrl || DEFAULT_IMAGE;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-white">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl text-gray-600">Post not found</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen pt-32 pb-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Header */}
          <header className="text-center space-y-6">
            <div className="flex justify-center gap-2">
              {post.categories?.map((category) => (
                <span
                  key={category.title}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                >
                  {category.title}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              {post.title}
            </h1>
            <div className="flex items-center justify-center space-x-4">
              {post.author?.authorImage && (  // Changed from image to authorImage
                <img
                  src={getImageUrl(post.author.authorImage)}  // Changed from image to authorImage
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_IMAGE;
                  }}
                />
              )}
              <div className="text-left">
                <p className="font-medium text-gray-900">{post.author?.name}</p>
                <time className="text-sm text-gray-500">
                  {formatDate(post.publishedAt)}
                </time>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.mainImage && (
            <div className="relative aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
              <img
                src={getImageUrl(post.mainImage)}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  console.error('Image load error:', e);
                  e.currentTarget.src = DEFAULT_IMAGE;
                }}
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <PortableText value={post.body} />
          </div>

          {/* Author Bio */}
          {post.author?.bio && (
            <div className="mt-16 p-8 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-4">
                {post.author.authorImage && (  // Changed from image to authorImage
                  <img
                    src={getImageUrl(post.author.authorImage)}  // Changed from image to authorImage
                    alt={post.author.name}
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_IMAGE;
                    }}
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
      </div>
    </article>
  );
}