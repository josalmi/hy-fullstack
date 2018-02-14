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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
