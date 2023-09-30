import express from 'express';
const usersRouter = express.Router();

usersRouter.get('/users', (req, res) => {
  res.send('Users router is running!');
});

export default usersRouter;
