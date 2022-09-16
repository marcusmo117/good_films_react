import { useCallback, useState, useRef, useEffect } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import apis from "../../utils/movie";
import { useNavigate } from "react-router-dom";

const CACHE = {};
const PER_PAGE = 20;

const makeAndHandleRequest = async (query, page = 1) => {
  const response = await apis.searchMovies(query, page);
  const { results, total_results } = response.data;
  const options = results.map((movie) => ({
    movieApiId: movie.id,
    movieTitle: movie.title,
    movieImage: movie.poster_path,
  }));

  return { options, total_results };
};

function SearchMovies() {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState("");
  const typeaheadElement = useRef();
  const navigate = useNavigate();

  const onChange = (values) => {
    if (values.length) {
      typeaheadElement.current.clear();
    }
  };

  const handleInputChange = (queryValue) => {
    setQuery(queryValue);
  };

  const handlePagination = (e, shownResults) => {
    const cachedQuery = CACHE[query];

    // Don't make another request if:
    // - the cached results exceed the shown results
    // - we've already fetched all possible results
    if (
      cachedQuery.options.length > shownResults ||
      cachedQuery.options.length === cachedQuery.total_results
    ) {
      return;
    }

    setIsLoading(true);

    const page = cachedQuery.page + 1;

    makeAndHandleRequest(query, page).then((resp) => {
      const options = cachedQuery.options.concat(resp.options);
      CACHE[query] = { ...cachedQuery, options, page };

      setIsLoading(false);
      setOptions(options);
    });
  };

  // `handleInputChange` updates state and triggers a re-render, so
  // use `useCallback` to prevent the debounced search handler from
  // being cancelled.
  const handleSearch = useCallback((q) => {
    if (CACHE[q]) {
      setOptions(CACHE[q].options);
      return;
    }

    setIsLoading(true);
    makeAndHandleRequest(q).then((resp) => {
      CACHE[q] = { ...resp, page: 1 };

      setIsLoading(false);
      setOptions(resp.options);
    });
  }, []);

  return (
    <AsyncTypeahead
      id="search-movies"
      isLoading={isLoading}
      filterBy={() => true}
      labelKey="movieTitle"
      maxResults={PER_PAGE - 1}
      minLength={2}
      onChange={onChange}
      onInputChange={handleInputChange}
      onPaginate={handlePagination}
      onSearch={handleSearch}
      options={options}
      paginate
      placeholder="Search for a movie..."
      ref={typeaheadElement}
      renderMenuItemChildren={(option) => (
        <div
          key={option.movieApiId}
          onClick={() => {
            navigate(`/movies/${option.movieApiId}`);
          }}>
          <img
            alt={option.movieTitle}
            src={"https://www.themoviedb.org/t/p/w94_and_h141_bestv2" + option.movieImage}
            style={{
              height: "50px",
              marginRight: "10px",
            }}
          />
          <span>{option.movieTitle}</span>
        </div>
      )}
      useCache={false}
    />
  );
}

export default SearchMovies;
