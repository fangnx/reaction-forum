import express from 'express';
import keys from '../../config/config';
import Post from '../../models/Post';

const router = express.Router();

// Add a Post endpoint
router.post('/add', (req, res) => {
  // TODO: validation

  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    timeStamp: req.body.timeStamp,
    tags: req.body.tags,
    viewCount: req.body.viewCount,
    likeCount: req.body.likeCount
  });

  newPost
    .save()
    .then(post => res.json(post))
    .catch(err => console.log(err));
});

export { router as posts };
