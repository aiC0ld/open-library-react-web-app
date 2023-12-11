import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SearchExternalBooks } from "../../apicalls/books";
import { Col, Row } from "antd";

function ExternalBookResults() {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const query = searchParams.get("query");
      if (query) {
        const response = await SearchExternalBooks(query);
        if (response.success) {
          setBooks(response.data.items);
        }
      }
    };

    fetchBooks();
  }, [searchParams]);

  const navigate = useNavigate();

  const handleBookClick = (bookId) => {
    navigate(`/book-detail/${bookId}`);
  };

  return (
    <div>
      <h1>External Book Results</h1>
      <Row gutter={[16, 16]}>
        {books.map((book, index) => (
          <Col
            key={index}
            onClick={() => handleBookClick(book.id)}
            xs={24}
            sm={12}
            md={8}
            lg={6}
          >
            <div className="rounded bg-white p-2 shadow flex flex-col gap-1">
              {book.volumeInfo.imageLinks?.thumbnail && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  style={{ width: "100%", height: "auto" }}
                />
              )}
              <h1 className="text-md text-secondary uppercase font-bold mt-2">{book.volumeInfo.title}</h1>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ExternalBookResults;
