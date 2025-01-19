import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [queryTitle, setQueryTitle] = useState('');
  const [pageContent, setPageContent] = useState(null);

  // Adjust baseURL according to your server's address
  const api = axios.create({
    baseURL: 'http://localhost:4000', 
  });

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/page', {
        title,
        content,
      });
      console.log(response.data);
      alert('Page created/updated');
    } catch (error) {
      console.error(error);
      alert('Error creating/updating page');
    }
  };

  const handleGetPage = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get(`/page/${queryTitle}`);
      setPageContent(response.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching page');
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h1>Blockchain Wiki</h1>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Create/Update Page</h2>
        <form onSubmit={handleCreateOrUpdate}>
          <div>
            <label>Title: </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Content: </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button type="submit">Save Page</button>
        </form>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Retrieve Page</h2>
        <form onSubmit={handleGetPage}>
          <div>
            <label>Title: </label>
            <input
              value={queryTitle}
              onChange={(e) => setQueryTitle(e.target.value)}
            />
          </div>
          <button type="submit">Get Page</button>
        </form>
        {pageContent && (
          <div style={{ marginTop: '1rem' }}>
            <h3>Page Title: {pageContent.title}</h3>
            <p>Content: {pageContent.content}</p>
            <p>Creator: {pageContent.creator}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
