import Layout from 'components/Layout';
import Form from 'components/Form';
import * as React from 'react';
import fetchLogin from '../services/login';

const { Input } = Form;

const Login = () => {
  const [loading, setLoading] = React.useState(false);

  return (
    <Layout>
      <Layout.FirstScreen>
        <Layout.HeadBar />
        <Layout.Main>
          <Form
            onSubmit={async (data) => {
              setLoading(true);
              await fetchLogin(data);
              setLoading(false);
            }}
            loading={loading}
          >
            <Input name="username" className="mb-[24px]" label required />
            <Input
              name="password"
              type="password"
              maxLength={16}
              className="mb-[24px]"
              label
              required
            />
          </Form>
        </Layout.Main>
      </Layout.FirstScreen>
    </Layout>
  );
};

export default Login;
