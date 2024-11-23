// Blog queries
export const allPostsQuery = `*[_type == "post"] {
  _id,
  title,
  slug,
  mainImage {
    asset-> {
      _id,
      url
    }
  },
  publishedAt,
  excerpt,
  author-> {
    name,
    image
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
      url
    }
  },
  body,
  publishedAt,
  author-> {
    name,
    image,
    bio
  },
  categories[]-> {
    title
  }
}`;