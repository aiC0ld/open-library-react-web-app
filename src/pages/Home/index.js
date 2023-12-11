import { Col, message, Row, Table, Badge } from "antd";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteBook, GetAllBooks } from "../../apicalls/books";
import { SearchExternalBooks } from "../../apicalls/books";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import Button from "../../components/Button";
import _ from "lodash";

function Home() {
  const [books, setBooks] = React.useState([]);
  const [filteredBooks, setFilteredBooks] = React.useState([]);
  const [externalBooks, setExternalBooks] = useState([]);
  const [externalSearchTerm, setExternalSearchTerm] = useState("");
  const [externalQuery, setExternalQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getBooks = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllBooks();
      dispatch(HideLoading());
      if (response.success) {
        setBooks(response.data);
        setFilteredBooks(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const searchBooks = async (title) => {
    const filtered = books.filter((book) => {
      return book.title.toLowerCase().includes(title.toLowerCase());
    });
    setFilteredBooks(filtered);
  };

  const handleExternalSearch = () => {
    navigate(`/external-results?query=${encodeURIComponent(externalQuery)}`);
  };

  const debouncedSearchExternalBooks = useCallback(
    _.debounce(async (title) => {
      if (!title) return;
      try {
        dispatch(ShowLoading());
        const response = await SearchExternalBooks(title);
        dispatch(HideLoading());
        if (response.success) {
          setExternalBooks(response.data.items);
        } else {
          message.error(response.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        message.error("Failed to search external books");
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearchExternalBooks(externalSearchTerm);
  }, [externalSearchTerm, debouncedSearchExternalBooks]);

  return (
    <div className="mt-2">
      <div
        class="search-bar"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="search"
          placeholder="Search by title"
          className="search-input"
          id="search"
          onChange={() => searchBooks(document.getElementById("search").value)}
          style={{ marginTop: "10px", marginBottom: "30px", width: "50%" }}
        ></input>
      </div>

      {/* New search bar for external books */}
      <div
        className="search-bar"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="search"
          placeholder="Search more books outside our library"
          className="search-input"
          id="external-search"
          onChange={(e) => setExternalQuery(e.target.value)}
          style={{ marginBottom: "30px", width: "50%" }}
        ></input>
        <Button style={{ marginLeft: "10px" }}
          className="flex justify-end"
          title="Search"
          onClick={handleExternalSearch}
        ></Button>
      </div>

      {/* Rendering internal books */}
      <Row gutter={[16, 16]}>
        {filteredBooks.map((book) => {
          return (
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              key={book._id}
              onClick={() => navigate(`/book/${book._id}`)}
            >
              <Badge.Ribbon
                text={book.availableCopies > 0 ? "Available" : "Not Available"}
                color={book.availableCopies > 0 ? "green" : "red"}
              >
                <div className="rounded bg-white p-2 shadow flex flex-col gap-1">
                  <img src={book.image} height="350px" />
                  <h1 className="text-md text-secondary uppercase font-bold mt-2">
                    {book.title}
                  </h1>
                </div>
              </Badge.Ribbon>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Home;
