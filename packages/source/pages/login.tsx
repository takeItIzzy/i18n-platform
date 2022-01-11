import Layout from 'components/Layout';
import Form from 'components/Form';
import * as React from 'react';
import fetchAuth from 'services/auth';
import StatusCode from 'constants/statusCode';

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
              const res = await fetchAuth(data, 'login');
              setLoading(false);

              if (res.status === 'success') {
                console.log(res);
              } else if (
                res.code === 'e_10002' &&
                confirm('username does not exist, will you create a new account?')
              ) {
                setLoading(true);
                await fetchAuth(data, 'register');
                setLoading(false);
              } else {
                alert(StatusCode[res.code]);
              }
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
