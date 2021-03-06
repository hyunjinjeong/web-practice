import React from 'react';
import fetch from 'isomorphic-fetch';
import Layout from '../components/Layout';
import MainPage from '../components/MainPage';

export interface Robot {
  name: string;
  email: string;
  id: number;
}

export interface AppProps {
  robots: Array<Robot>;
  isError: boolean;
}

// eslint-disable-next-line
export const prefix =
  process.env.NODE_ENV === 'production'
    ? 'https://hyunjin95.github.io/web-practice'
    : '';

export interface StatelessPage<P> extends React.FC<P> {
  getInitialProps?: () => Promise<P>;
}

const Index: StatelessPage<AppProps> = ({
  robots = [],
  isError = false,
}: AppProps): JSX.Element => (
  <Layout prefix={prefix}>
    <MainPage robots={robots} isError={isError} />
  </Layout>
);

Index.getInitialProps = async (): Promise<AppProps> => {
  let robots: Array<Robot> = [];
  let isError = false;

  try {
    const req = await fetch('https://jsonplaceholder.typicode.com/users');
    robots = await req.json();
  } catch (err) {
    isError = true;
  }

  return {
    robots,
    isError,
  };
};

export default Index;
