import Post from '../../../models/Post';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  // const post = await Post.findById(id);
  // res.status(200).json({ success: true, data: post });

  switch (method) {
    case 'GET':
      try {
        const post = await Post.findById(id);
        if (!post) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: post });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
        if (!post) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: post });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: post });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
