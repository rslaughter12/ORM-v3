const Post = require('../models/post');

exports.createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
   const post = await Post.create({ title, content });
    res.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.json(error);
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    const plainPosts = posts.map(post => post.get({ plain: true })); // Convert each post to a plain object
    res.render('dashboard', { posts: plainPosts });
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.json({ posts: [], error });
  }
};
exports.deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    await Post.destroy({
      where: { id: postId },
    });

    res.sendStatus(200).json({ message: 'Post deleted' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.sendStatus(500).json({ message: error });
  }
};