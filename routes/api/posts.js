const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post');
const User = require('../../models/User');

// ---------------------------------------------------------
//@route   POST api/posts  <---the route endpoint
//@desc    Create a post     <---what is this?
//@access  Private         <--is this a protected route?
// ---------------------------------------------------------

router.post(
  '/',
  // [auth, [check('title', 'title is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }

    try {
      // When making new post, first find the user that is making this post.
      // Find the id by grabbing the x-auth-token in the request

      // const user = await User.findById(req.user.id).select('-password');

      // console.log(`User: ${user}`);

      // Create a new post inside of the DB based on the info passed in the request
      const newPost = new Post({
        title: req.body.title,
        post: req.body.post,
        tags: req.body.tags,
        video: req.body.video,
        image: req.body.image,
        // user: req.user.id,
      });

      // Save this post into the DB
      const post = await newPost.save();

      // Return this post
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// ---------------------------------------------------------
//@route   GET api/posts  <---the route endpoint
//@desc    Get all posts    <---what is this?
//@access  Public         <--is this a protected route?
// ---------------------------------------------------------

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ---------------------------------------------------------
//@route   GET api/posts/:id  <---the route endpoint
//@desc    Get post by id   <---what is this?
//@access  Public         <--is this a protected route?
// ---------------------------------------------------------

router.get('/:id', async (req, res) => {
  try {
    //Finds the post in the DB by checking the id we passed as a parameter
    const post = await Post.findById(req.params.id);

    // Returns that post we just found
    res.json(post);

    //If there is no post, return an error message
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
  } catch (err) {
    console.error(err.message);

    // If the error that we got is 'ObjectId' (we passed the wrong id)
    // Then send an error stating we couldn't find a post with that id.
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

// ---------------------------------------------------------
//@route   DELETE api/posts/:id  <---the route endpoint
//@desc    Delete post by id   <---what is this?
//@access  Private         <--is this a protected route?
// ---------------------------------------------------------

router.delete('/:id', auth, async (req, res) => {
  try {
    // Grab the id of the post from the params
    // Find that post id inside of the database
    const post = await Post.findById(req.params.id);
    // If this post id isn't in the DB return an error message
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Remove the post
    await post.remove();

    // Send a response to say the post was deleted
    res.json({ msg: 'Post deleted' });
  } catch (err) {
    // Log the error message
    console.error(err.message);

    // If the kind of error response that we get is 'ObjectId'
    // State that the post was not found
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.status(500).send('Server error');
  }
});

// ---------------------------------------------------------
//@route   POST  api/posts/:id  <---the route endpoint
//@desc    Update a post by id   <---what is this?
//@access  Private         <--is this a protected route?
// ---------------------------------------------------------

router.post('/:id', auth, async (req, res) => {
  try {
    // Grabs the data you want to update from the request.
    const updates = req.body;
    const options = { new: true };

    // Finds the post that you want to update by it's param id
    // Passes the updates and the options that you set
    const post = await Post.findByIdAndUpdate(req.params.id, updates, options);

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
