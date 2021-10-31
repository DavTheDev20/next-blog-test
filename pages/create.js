import { useState } from 'react';
import Head from 'next/head';

const formStyles = {
  marginLeft: '10px',
};

const Create = () => {
  const [post, setPost] = useState({
    title: '',
    content: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;

    switch (name) {
      case 'title':
        setPost((prevValue) => {
          return {
            title: value,
            content: prevValue.content,
          };
        });
        break;
      case 'content':
        setPost((prevValue) => {
          return {
            title: prevValue.title,
            content: value,
          };
        });
        break;
      default:
        break;
    }
  };

  const handlePost = async (event) => {
    event.preventDefault();

    const res = await fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    const result = await res.json();
    console.log(result);
    setPost({
      title: '',
      content: '',
    });
  };

  return (
    <div>
      <Head>
        <title>Create</title>
      </Head>
      <h1>Create</h1>
      <hr />
      <br />
      <form style={formStyles} onSubmit={handlePost}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          placeholder="enter title..."
          value={post.title}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          name="content"
          placeholder="enter post content..."
          rows="10"
          cols="25"
          value={post.content}
          onChange={handleChange}
        ></textarea>
        <br />
        <button>Post</button>
      </form>
    </div>
  );
};

export default Create;
