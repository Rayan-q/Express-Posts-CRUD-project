let posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
  { id: 4, title: "Post Four" },
];

// @desc Get all posts
// @route GET /api/posts
export const getPosts = (req, res) => {
  // res.send() could be used here

  // Dealing with query strings
  // console.log(req.query);
  const limit = req.query.limit;

  // You need to handle queries correctly to avoid SQL injection
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
};

// @desc Get singe post
// @route GET /api/posts/:id

export const getPost = (req, res, next) => {
  // Use req.params() to get the id
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json(post);
};

// @desc Post new post
// @route POST /api/posts
export const createPost = (req, res, next) => {
  const title = req.body.title;
  const newId = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;

  if (!title || title.trim() === "") {
    const error = new Error(`Please include a valid title`);
    error.status = 400;
    return next(error);
  }
  const newPost = {
    id: newId,
    title: title,
  };

  posts.push(newPost);

  res.status(201).json(newPost);
};

// @desc Update post
// @route PUT /api/posts/:id
export const updatePost = (req, res, next) => {
  // Use req.params() to get the id
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  // make sure the post to be updated exists
  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  const newTitle = req.body.title;

  if (!newTitle || newTitle.trim() === "") {
    const error = new Error(`Please include a valid title`);
    error.status = 400;
    return next(error);
  }

  post.title = newTitle;
  res.status(200).json(post);
};

// @desc delete post
// @route DELETE /api/posts/:id
export const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  // make sure the post to be updated exists
  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  posts = posts.filter((post) => post.id !== id);
  res.status(200).json({ message: `Post ${id} deleted`, deletedPost: post });
};
