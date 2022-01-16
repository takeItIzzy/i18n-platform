import APIReturnMessage from 'services/APIReturnMessage';
import clientPromise from 'libs/mongodb';
import bcrypt from 'bcryptjs';
import createToken, { ILoginSuccessRes } from 'libs/auth';

const genEncryptPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB);
    const reply = await db.collection('user-info').findOne({ email });
    if (reply) {
      res.status(401).json(new APIReturnMessage().error('e_10004'));
      return;
    } else {
      const encryptPassword = await genEncryptPassword(password);
      await db.collection('user-info').insertOne({
        email,
        password: encryptPassword,
      });
      // auto login
      const token = await createToken(email);
      res.status(200).json(
        new APIReturnMessage<ILoginSuccessRes>().success({
          token,
          email,
        })
      );
      return;
    }
  } catch (e) {
    res.status(500).json(new APIReturnMessage().error('e_10001'));
    return;
  }
};

export default register;
