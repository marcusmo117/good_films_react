import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { Dropdown } from "react-bootstrap";
import apis from "../../../utils/movie";

function FilterDropdown(props) {

  const listOfGenres = props.dropdownGenres.data;
  console.log("Genres:", listOfGenres)

  return (
    <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Genres
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {!listOfGenres? 
            ("Unable to get list of genres") :
            (listOfGenres.map(g => (
              <Dropdown.Item key={g.id} as={Link} to={`/movies/${g.name}/${g.id}`}>{g.name}</Dropdown.Item>
            )))
            }
          </Dropdown.Menu>
        </Dropdown>
      </div>
  )
}

export default FilterDropdown;