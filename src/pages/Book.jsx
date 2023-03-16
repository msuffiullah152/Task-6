import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorAlert from '../components/ErrorAlert';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Container from '../components/Container';
import "./Style.css"

const Book = () => {

    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const {id} = useParams();

    const getData = async () => {
        const url = `https://api.matgargano.com/api/books/${id}`;
        setLoading(true);
        setError(false);
        try {
            const request = await fetch(url);
            const response = await request.json();
            setBook(response);
           
        } catch(e) {
            setError('Error: ' + e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);


    return (
    <Container>
        {error && <ErrorAlert>{error}</ErrorAlert>}
        {!error && loading && <div className="max-w-[230px]"><Skeleton count="10" /></div>}
        {!error && !loading && 
            <>
            {book && (
             <div>
                <p>TITLE: {book.title}</p>
                <p>AUTHOR: {book.author}</p>
                <p>PUBLISHER: {book.publisher}</p>
                <p>Year {book.year}</p>
                <p>Number Of Pages: {book.pages}</p>
                <p>Country Origin: {book.country}</p>
                <img  src={book.imageURL} alt="" />
                  
                </div>
            )} 

            </>  
            
        }
         </Container>
    );
};

export default Book;
