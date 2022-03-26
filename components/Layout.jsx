import React from 'react';
import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import { Fragment } from 'react/cjs/react.production.min';
import Navbar from './Navbar';
import Footer from './Footer';
const Layout = ({ children }) => {
  return (
    <Fragment>
      <Head>
        <title>Real Estate Apps</title>
        <link rel="shortcut icon" href="/logo.png" />
      </Head>
      <Box maxWidth="1280px" m="auto">
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </Box>
    </Fragment>
  );
};

export default Layout;
