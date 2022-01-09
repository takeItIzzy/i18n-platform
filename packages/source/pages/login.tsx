import Layout from 'components/Layout';
import Form from 'components/Form';

const { Input } = Form;

const Login = () => {
  return (
    <Layout>
      <Layout.FirstScreen>
        <Layout.HeadBar />
        <Layout.Main>
          <Form
            onSubmit={(data) => {
              console.log(data);
            }}
          >
            <Input name="username" className="mb-[24px]" label />
            <Input name="password" type="password" className="mb-[24px]" label />
          </Form>
        </Layout.Main>
      </Layout.FirstScreen>
    </Layout>
  );
};

export default Login;
