const Post = require('../models/post');

exports.createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    await Post.create({ title, content });
    res.redirect('/');
  } catch (error) {
    console.error('Error creating post:', error);
    res.redirect('/');
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.render('home', { posts });
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.render('home', { posts: [] });
  }
};
