import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Layout from "../components/Layout";
import "../styles/globals.css";

const client = new ApolloClient({
  uri: 'https://b2cdemo.getswift.asia/graphql',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
