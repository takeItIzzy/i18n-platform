import Link from 'next/link';

const Layout = (props) => {
  const { children } = props;

  return <div className="relative">{children}</div>;
};

const FirstScreen = (props) => {
  const { children, center = true } = props;

  return (
    <div className={`h-screen relative ${center ? 'flex justify-center items-center' : ''}`}>
      {children}
    </div>
  );
};
Layout.FirstScreen = FirstScreen;

const HeadBar = () => {
  return (
    <div className="absolute top-0 w-full h-[60px] px-[20px] flex items-center">
      <div>
        <Link href="/">
          <a>logo</a>
        </Link>
      </div>
      <div className="flex-1" />
      <div>
        <Link href="/login">
          <a className="button-padding border border-gray-500 rounded-[6px]">Sign In / Sign Up</a>
        </Link>
      </div>
    </div>
  );
};
Layout.HeadBar = HeadBar;

const Main = (props) => {
  const { children, className } = props;

  return <div className={className}>{children}</div>;
};
Layout.Main = Main;

export default Layout;
