const dummy = blogs => {
  return 1;
};

const totalLikes = blogs =>
  blogs.map(blog => blog.likes).reduce((acc, val) => acc + val, 0);

const favoriteBlog = blogs =>
  blogs.reduce(
    (best, current) =>
      best === null || current.likes > best.likes ? current : best,
    null
  );

const mostBlogs = blogs => {
  const authorBlogCounts = blogs.map(blog => blog.author).reduce(
    (acc, author) => ({
      ...acc,
      [author]: (acc[author] || 0) + 1
    }),
    {}
  );
  return Object.keys(authorBlogCounts)
    .map(author => ({ author, blogs: authorBlogCounts[author] }))
    .reduce(
      (best, current) =>
        best === null || current.blogs > best.blogs ? current : best,
      null
    );
};

const mostLikes = blogs => {
  const authorLikeSums = blogs.reduce(
    (acc, blog) => ({
      ...acc,
      [blog.author]: (acc[blog.author] || 0) + blog.likes
    }),
    {}
  );
  return Object.keys(authorLikeSums)
    .map(author => ({ author, likes: authorLikeSums[author] }))
    .reduce(
      (best, current) =>
        best === null || current.likes > best.likes ? current : best,
      null
    );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
