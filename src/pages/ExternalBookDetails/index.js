import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col } from "antd";
import moment from "moment";

function ExternalBookDetails() {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
      try {
        const response = await axios.get(url);
        setBookDetails(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
        // Handle error
      }
    };

    if (bookId) {
      fetchBookDetails();
    }
  }, [bookId]);

  if (!bookDetails) {
    return <div>Loading...</div>;
  }

  const { volumeInfo } = bookDetails;

  return (
    <div>
      <Row gutter={[16, 16]} align="middle" justify="center">
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          className="flex flex-col gap-2"
        >
          <h1 className="text-2xl text-secondary uppercase font-bold mt-2">
            {volumeInfo.title}
          </h1>
          <hr />
          {volumeInfo.imageLinks?.thumbnail && (
            <div className="flex justify-center">
              <img
                src={volumeInfo.imageLinks.thumbnail}
                alt={`Cover of ${volumeInfo.title}`}
                height={400}
                width={400}
              />
            </div>
          )}

          <p>{volumeInfo.description}</p>
          <div className="flex justify-between">
            <h1 className="text-md">Author</h1>
            <h1 className="text-md">{volumeInfo.authors?.join(", ")}</h1>
          </div>
          <div className="flex justify-between">
            <h1 className="text-md">Publisher</h1>
            <h1 className="text-md">{volumeInfo.publisher}</h1>
          </div>
          <div className="flex justify-between">
            <h1 className="text-md">Published Date</h1>
            <h1 className="text-md">
              {volumeInfo.publishedDate
                ? moment(volumeInfo.publishedDate).format("MMMM Do YYYY")
                : "N/A"}
            </h1>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ExternalBookDetails;
