import React, { useState, useEffect } from 'react';
import Container from '../components/Container';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const useBookData = (bookId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.matgargano.com/api/books/${bookId}`);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [bookId]);

  return [data, loading, error];
};

const Book = () => {
  const { bookId } = useParams();
  const [data, loading, error] = useBookData(bookId);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      <Link to="/">Back to Books</Link>
      <h1>{data.title}</h1>
      <p>Author: {data.author}</p>
      <p>Description: {data.description}</p>
      {/* display other relevant book data */}
    </Container>
    
  );
};

export default Book;
