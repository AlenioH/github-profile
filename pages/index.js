import Head from 'next/head';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const githubQuery = gql`
  query profileQuery($name: String!) {
    github {
      user(username: "AlenioH") {
        id
        login
        avatar_url
        repos {
          id
          name
        }
      }
    }
  }
`;

const client = new ApolloClient({
  uri: 'https://www.graphqlhub.com/graphql',
});

const Profile = () => {
  const { loading, error, data } = useQuery(githubQuery);
  if (loading) return <p>loading...</p>;
  if (error) return <p>smth went wrong...</p>;
  return (
    <div>
      <Head>
        <title>{data.github.user.login}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img src={data.github.user.avatar_url} lt="azhu" />
      <ul>
        {data.github.user.repos.map((repo) => {
          return <li key={repo.id}>{repo.name}</li>;
        })}
      </ul>
    </div>
  );
};

export function Home(props) {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <h1 className="title">Hello!</h1>
        <Profile username={props.username} />
      </div>
    </ApolloProvider>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      username: context.params.name,
    },
  };
}
