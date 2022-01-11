import APIReturnMessage from 'services/APIReturnMessage';
import clientPromise from 'libs/mongodb';
import bcrypt from 'bcryptjs';

const genEncryptPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB);
    const reply = db.collection('user-info').findOne({ username });
    if (reply) {
      res.status(401).json(
        new APIReturnMessage({
          status: 'error',
          code: 'e_10004',
        })
      );
      return;
    } else {
      // todo add user to db
      res.status(200).json({
        status: 'success',
        data: {
          // todo jwt token
          token: 'token',
        },
      });
      return;
    }
  } catch (e) {
    res.status(500).json({
      status: 'error',
      code: 'e_10001',
    });
    return;
  }
};

export default register;
