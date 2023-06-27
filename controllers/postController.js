const Post = require('../models/post');

exports.createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    await Post.create({ title, content });
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error creating post:', error);
    res.redirect('/dashboard');
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    const plainPosts = posts.map(post => post.get({ plain: true })); // Convert each post to a plain object
    res.render('dashboard', { posts: plainPosts });
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.render('dashboard', { posts: [] });
  }
};
exports.deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    await Post.destroy({
      where: { id: postId },
    });

    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting post:', error);
    res.sendStatus(500);
  }
};