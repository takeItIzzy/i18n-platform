import Link from 'next/link';

const Layout = (props) => {
  const { children } = props;

  return <div>{children}</div>;
};

const FirstScreen = (props) => {
  const { children } = props;

  return <div className="h-screen relative">{children}</div>;
};
Layout.FirstScreen = FirstScreen;

const HeadBar = () => {
  return (
    <div className="absolute w-full h-[60px] p-[20px] flex items-center">
      <div>logo</div>
      <div className="flex-1" />
      <div>
        <Link href="/">
          <a className="p-[10px] border border-gray-500 rounded-[6px]">Console</a>
        </Link>
      </div>
    </div>
  );
};
Layout.HeadBar = HeadBar;

export default Layout;
