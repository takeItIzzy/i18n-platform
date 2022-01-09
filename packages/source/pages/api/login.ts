import APIReturnMessage from '../../services/APIReturnMessage';

const login = async (req, res) => {
  const { username, password } = req.body;

  const Redis = require('ioredis');
  let client = new Redis(process.env.REDIS_URL);

  try {
    const reply = await client.get(username);
    if (reply) {
      if (reply !== password) {
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
