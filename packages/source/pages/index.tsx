import Layout from 'components/Layout';

function HomePage() {
  return (
    <Layout>
      <Layout.FirstScreen>
        <Layout.HeadBar />
        <div className="h-full flex justify-center items-center">slogan</div>
      </Layout.FirstScreen>
    </Layout>
  );
}

export default HomePage;
