const dummy = blogs => {
  return 1;
};

const totalLikes = blogs =>
  blogs.map(blog => blog.likes).reduce((acc, val) => acc + val, 0);

module.exports = {
  dummy,
  totalLikes
};
