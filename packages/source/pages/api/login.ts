import APIReturnMessage from 'services/APIReturnMessage';
import bcrypt from 'bcryptjs';
import clientPromise from 'libs/mongodb';
import createToken, { ILoginSuccessRes } from 'libs/auth';

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB);
    const reply = await db.collection('user-info').findOne({ username });
    if (!!reply) {
      const isPasswordMatch = await bcrypt.compare(password, reply.password);
      if (isPasswordMatch) {
        const token = await createToken(username);
        res.status(200).json(
          new APIReturnMessage<ILoginSuccessRes>().success({
            token,
            username: reply.username,
          })
        );
      } else {
        res.status(401).json(new APIReturnMessage().error('e_10003'));
      }
    } else {
      res.status(401).json(new APIReturnMessage().error('e_10002'));
      return;
    }
  } catch (e) {
    res.status(500).json(new APIReturnMessage().error('e_10001'));
  }
};

export default login;
