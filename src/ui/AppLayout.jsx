import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';

function AppLayout({ children }) {
  return (
    <>
      <Header />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default AppLayout;
