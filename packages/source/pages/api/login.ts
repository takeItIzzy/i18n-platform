import APIReturnMessage from 'services/APIReturnMessage';
import bcrypt from 'bcryptjs';
import clientPromise from 'libs/mongodb';

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB);
    const reply = await db.collection('user-info').findOne({ username });
    if (!!reply) {
      const isPasswordMatch = await bcrypt.compare(password, reply.password);
      if (isPasswordMatch) {
        res.status(200).json(
          new APIReturnMessage({
            status: 'success',
            data: {
              // todo jwt token
              token: 'token',
            },
          })
        );
      } else {
        res.status(401).json(
          new APIReturnMessage({
            status: 'error',
            code: 'e_10003',
          })
        );
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
    res.status(500).json(
      new APIReturnMessage({
        status: 'error',
        code: 'e_10001',
      })
    );
  }
};

export default login;
