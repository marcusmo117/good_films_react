import React from "react";
import { Dropdown } from "react-bootstrap";

function FilterDropdown() {
  return (
    <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Genre
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item className='action' href="/movies/Action/28">Action</Dropdown.Item>
            <Dropdown.Item className='animation' href="/movies/Animation/16">Animation</Dropdown.Item>
            <Dropdown.Item className='comedy' href="/movies/Comedy/35">Comedy</Dropdown.Item>
            <Dropdown.Item className='crime' href="/movies/Crime/80">Crime</Dropdown.Item>
            <Dropdown.Item className='Documentary' href="/movies/Documentary/99">Documentary</Dropdown.Item>
            <Dropdown.Item className='Drama' href="/movies/Drama/18">Drama</Dropdown.Item>
            <Dropdown.Item className='Family' href="/movies/Family/10751">Family</Dropdown.Item>
            <Dropdown.Item className='Fantasy' href="/movies/Fantasy/14">Fantasy</Dropdown.Item>
            <Dropdown.Item className='History' href="/movies/History/36">History</Dropdown.Item>
            <Dropdown.Item className='Horror' href="/movies/Horror/27">Horror</Dropdown.Item>
            <Dropdown.Item className='Music' href="/movies/Music/10402">Music</Dropdown.Item>
            <Dropdown.Item className='Mystery' href="/movies/Mystery/9648">Mystery</Dropdown.Item>
            <Dropdown.Item className='Romance' href="/movies/Romance/10749">Romance</Dropdown.Item>
            <Dropdown.Item className='Science-fiction' href="/movies/Science-Fiction/878">Science Fiction</Dropdown.Item>
            <Dropdown.Item className='tv-movie' href="/movies/TV-Movie/10770">TV Movie</Dropdown.Item>
            <Dropdown.Item className='Thriller' href="/movies/Thriller/53">Thriller</Dropdown.Item>
            <Dropdown.Item className='War' href="/movies/War/10752">War</Dropdown.Item>
            <Dropdown.Item className='Western' href="/movies/Western/37">Western</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
  )
}

export default FilterDropdown;