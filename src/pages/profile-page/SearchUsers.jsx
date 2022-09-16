import { useEffect, useRef } from "react";
import { Typeahead, Menu, MenuItem } from "react-bootstrap-typeahead";
import { useNavigate } from "react-router-dom";
import "react-bootstrap-typeahead/css/Typeahead.css";

function SearchUsers({ followeeOptions, profileInViewUsername }) {
  const navigate = useNavigate();

  const typeaheadElement = useRef();

  useEffect(() => {
    typeaheadElement.current.clear();
  }, [profileInViewUsername]);

  return (
    <>
      <Typeahead
        minLength={2}
        placeholder="Find someone new to follow!"
        options={followeeOptions}
        ref={typeaheadElement}
        renderMenu={(results, menuProps) => (
          <Menu {...menuProps}>
            {results.map((result, index) => (
              <MenuItem
                onClick={(e) => {
                  const username = e.target.innerText;
                  navigate(`/profiles/${username}`);
                }}
                option={result}
                position={index}>
                {result}
              </MenuItem>
            ))}
          </Menu>
        )}
      />
    </>
  );
}

export default SearchUsers;
