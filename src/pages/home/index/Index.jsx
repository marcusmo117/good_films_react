import React, { useEffect, useState } from "react";
import FilterDropdown from "../filter/FilterDropdown";
import MovieSection from "../movie-section/MovieSection";
import styles from "./Index.scss";
import apis from "../../../utils/movie";
import { Dropdown, Container, Row, Col} from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { CircularProgress } from "@mui/material";

function Index() {
  const [popularMovies, setPopularMovies] = useState({});
  const [topMovies, setTopMovies] = useState({});
  const [genreList, setGenreList] = useState({});
  
  useEffect(() => {
    const fetchMovies = async () => {
      const popular = await apis.getMovie("popular");
      const top = await apis.getMovie("top_rated");
      const allGenres = await apis.getListOfGenres();
      setPopularMovies(popular);
      setTopMovies(top);
      setGenreList(allGenres);
    };
    
    fetchMovies();
  }, []);

  return (
    <div className="section">

      {
        !genreList.data && !popularMovies.data && !topMovies.data ?
        (
          <CircularProgress />
        )
        : 
        (
          <div>
            <Container>
              <Row>
                <Col className="filter">
                  <h5>Browse By</h5>
                  <div>
                    {genreList.data && (
                      <FilterDropdown dropdownGenres={genreList}/>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="section">
                    {popularMovies.data && (
                      <MovieSection section={popularMovies.data.results} title="Popular" />
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="section">
                    {topMovies.data && <MovieSection section={topMovies.data.results} title="Top Rated" />}
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        )
      }
    </div>
  );
}

export default Index;
