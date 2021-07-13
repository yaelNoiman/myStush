const express = require('express');
const _ = require('lodash');
const { Post, validatePost, generateBizNumber } = require('../models/post');
const auth = require('../middleware/auth');
const router = express.Router();

router.get("/my-posts", auth , async (req,res)=>{
  if (!req.user.biz){
    return res.status(401).send("Access Denied");
  }
  const posts= await Post.find({user_id: req.user._id});
  res.send(posts)
});

router.delete('/:id', auth, async (req, res) => {

  const post = await Post.findOneAndRemove({ _id: req.params.id, user_id: req.user._id });
  if (!post) return res.status(404).send('The post with the given ID was not found.');
  res.send(post);

});

router.put('/:id', auth, async (req, res) => {

  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let post = await Post.findOneAndUpdate({ _id: req.params.id, user_id: req.user._id }, req.body);
  if (!post) return res.status(404).send('The post with the given ID was not found.');

  post = await Post.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(post);

});

router.get('/:id', auth, async (req, res) => {

  const post = await Post.findOne({ _id: req.params.id, user_id: req.user._id });
  if (!post) return res.status(404).send('The post with the given ID was not found.');
  res.send(post);

});

router.post('/', auth, async (req, res) => {

  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let post = new Post(
    {
      bizName: req.body.bizName,
      bizDescription: req.body.bizDescription,
      bizAddress: req.body.bizAddress,
      bizPhone: req.body.bizPhone,
      bizImage: req.body.bizImage ? req.body.bizImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      bizNumber: await generateBizNumber(Post),
      user_id: req.user._id
    }
  );

  post = await post.save();
  res.send(post);

});

module.exports = router; 