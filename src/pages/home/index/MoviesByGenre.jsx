import React, { useEffect, useState } from "react";
import apis from "../../../utils/movie";
import MovieSection from "../movie-section/MovieSection";
import FilterDropdown from "../filter/FilterDropdown";
import styles from "./Index.scss";
import { useParams } from "react-router-dom";
import { Container, Row, Col} from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import { Pagination } from "@mui/material";

const MoviesByGenre = () => {
  const params = useParams();
  const [genre, setGenre] = useState({});
  const [genreList, setGenreList] = useState({});
  const [page, setPage] = useState(1);

  // Fetch list of genres and movies by genres
  const fetchGenre = async () => {
    const genreResults = await apis.getGenreResults(params.genreId, page);
    const allGenres = await apis.getListOfGenres();
    setGenre(genreResults);
    setGenreList(allGenres);
  };

  useEffect(() => {
    fetchGenre();
  });

  // Pagination to allow user to change page
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="section">
      {
        !genre.data ? 
        ( < CircularProgress /> )
        :
        (
          <div>
            <Container>
              <Row>
                <Col className="filter">
                  <h5>Browse By</h5>
                  <div>{ genreList.data? <FilterDropdown dropdownGenres={genreList} /> : "Unable to get list of genres" }</div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="section">{genre.data ? <MovieSection section={genre.data} title={params.genre} /> : "No movies in this genre"}</div>
                </Col>
              </Row>
              <Row>
                <Col className="pagination">
                  <Pagination
                    count={10}
                    page={page}
                    onChange={handleChange}
                    size="large"
                    />
                </Col>
              </Row>
            </Container>
          </div>
        )
      } 
    </div>
  );
}

export default MoviesByGenre;
