import Head from 'next/head';

const Post = (props) => {
  return (
    <div>
      <Head>
        <title>{props.data.title}</title>
      </Head>
      <h1>{props.data.title}</h1>
      <p>{props.data.content}</p>
    </div>
  );
};

export async function getStaticProps(context) {
  const id = context.params.id;
  const res = await fetch(`http://localhost:3000/api/posts/${id}`);
  const post = await res.json();

  return {
    props: post,
  };
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/posts');
  const posts = await res.json();
  return {
    paths: [
      ...posts.data.map((post) => {
        return { params: { id: post._id } };
      }),
    ],
    fallback: false,
  };
}

export default Post;
