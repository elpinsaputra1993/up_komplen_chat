import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const handleSelect = (e) => {
  console.log(e);
};
function App() {
  return (
    <div className="App">
      <br />
      <div className="row">
        <div className="col">
          <h2>Hello</h2>
        </div>
        <div className="col">
          <div className=" float-right">
            <DropdownButton
              alignRight
              title="Dropdown right"
              id="dropdown-menu-align-right"
              onSelect={handleSelect}
            >
              <Dropdown.Item eventKey="option-1a">option-1</Dropdown.Item>
              <Dropdown.Item eventKey="option-2a">option-2</Dropdown.Item>
              <Dropdown.Item eventKey="option-3a">option 3</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="some linka">some link</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
