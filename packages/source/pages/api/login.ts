import APIReturnMessage from 'services/APIReturnMessage';
import connectDB from 'libs/mongodb';
import bcrypt from 'bcryptjs';

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { db } = await connectDB();
    const reply = await db.collection('user-info').findOne({ username });
    if (!!reply) {
      if (bcrypt.compareSync(password, reply.password)) {
        res.status(401).json(
          new APIReturnMessage({
            status: 'error',
            code: 'e_10003',
          })
        );
        return;
      }
    } else {
      res.status(401).json(
        new APIReturnMessage({
          status: 'error',
          code: 'e_10002',
        })
      );
      return;
    }
  } catch (e) {
    res.status(500).json({
      status: 'error',
      code: 'e_10001',
    });
    return;
  }

  res.status(200).json({
    status: 'success',
    data: {
      // todo jwt token
      token: 'token',
    },
  });
};

export default login;
