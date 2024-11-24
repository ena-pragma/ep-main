// Blog queries
export const allPostsQuery = `*[_type == "post"] {
  _id,
  title,
  slug,
  mainImage {
    asset-> {
      _id,
      _ref,
      _type,
      url
    }
  },
  publishedAt,
  excerpt,
  author-> {
    name,
    authorImage {  // Changed from 'image' to 'authorImage' to match schema
      asset-> {
        _id,
        _ref,
        _type,
        url
      }
    }
  },
  categories[]-> {
    title
  }
} | order(publishedAt desc)`;

export const singlePostQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage {
    asset-> {
      _id,
      _ref,
      _type,
      url
    }
  },
  body,
  publishedAt,
  author-> {
    name,
    authorImage {
      asset-> {
        _id,
        _ref,
        _type,
        url
      }
    },
    bio
  },
  categories[]-> {
    title
  }
}`;