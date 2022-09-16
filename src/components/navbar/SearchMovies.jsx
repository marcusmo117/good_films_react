import { useEffect, useRef } from "react";
import { AsyncTypeahead, Typeahead, Menu, MenuItem } from "react-bootstrap-typeahead";
import { render } from "react-dom";
import { useNavigate } from "react-router-dom";
import "react-bootstrap-typeahead/css/Typeahead.css";

function SearchMovies() {
  const navigate = useNavigate();

  const typeaheadElement = useRef();

  return (
    <>
      <Typeahead
        minLength={2}
        placeholder="Search"
        options={["harry potter", "thor"]}
        ref={typeaheadElement}
        // renderMenu={(results, menuProps) => (
        //   <Menu {...menuProps}>
        //     {results.map((result, index) => (
        //       <MenuItem
        //         onClick={(e) => {
        //           const username = e.target.innerText;
        //           navigate(`/profiles/${username}`);
        //         }}
        //         option={result}
        //         position={index}>
        //         {result}
        //       </MenuItem>
        //     ))}
        //   </Menu>
        // )}
      />
    </>
  );
}

export default SearchMovies;
