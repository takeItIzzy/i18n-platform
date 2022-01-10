import APIReturnMessage from 'services/APIReturnMessage';
import connectDB from 'libs/mongodb';

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { db } = await connectDB();
    const reply = await db.collection('user-info').findOne({ username });
    if (reply) {
      // todo encrypt password
      if (reply.password !== password) {
        res.status(401).json(
          new APIReturnMessage({
            status: 'error',
            message: 'Invalid password',
          })
        );
      }
    } else {
      res.status(401).json(
        new APIReturnMessage({
          status: 'error',
          message: 'Invalid username',
        })
      );
    }
  } catch (e) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      token: 'token',
    },
  });
};

export default login;
