import Head from 'next/head';
import Link from 'next/link';

const Posts = (props) => {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>

      <div className="Posts">
        <h1>Posts</h1>
        <hr />
        {props.data.map((post) => {
          const postRoute = '/posts/' + post._id;
          return (
            <div key={post._id}>
              <h2>{post.title}</h2>
              <p>
                {post.content.slice(0, 20)}...{' '}
                <Link href={postRoute} style={{ textDecoration: 'underline' }}>
                  Read More
                </Link>
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/posts');
  const data = await res.json();

  return {
    props: data,
  };
}

export default Posts;
