import React, { Component } from "react";
import "./InformasiData.css";
import axios from "axios";
// import { Button } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import Chatbox from "../components/Chatbox";

class InformasiData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {}

  async getData() {
    axios.get("api/pelapor").then((res) => {
      const getUsers = res.data.data;
      console.log("tes : " + JSON.stringify(res.data.data));
      this.setState({ users: getUsers });
      console.log(this.state);
    });
  }

  render() {
    const usersToRender = this.state.users.filter((user) => user.name);
    const numRows = usersToRender.length;
    const isEmpty = !usersToRender.length;
    console.log(usersToRender);
    console.log(numRows);
    console.log(isEmpty);

    return (
      <div className="container">
        {/* <Button variant="primary" onClick={handleShow}>
          Launch static backdrop modal
        </Button> */}

        <h2>Informasi Data Pelapor</h2>

        <table id="t01">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Laporan</th>
              {/* <th>Tindaklanjut</th> */}
            </tr>
          </thead>
          <tbody>
            {isEmpty ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  Data belum ada
                </td>
              </tr>
            ) : (
              this.state.users.map((user, index) => {
                if (index > -1) {
                  // skip the first element since it's already used above
                  return (
                    <tr key={index.toString()}>
                      <td>{`${++index}.`}</td>
                      <td>
                        {/* <Link to={`/data_pelapor/${user._id}`}>{user.name}</Link> */}
                        <Nav.Link href={`/data_pelapor/${user._id}`}>
                          {user.name}
                        </Nav.Link>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.topic}</td>
                      {/* <td>{</td> */}
                    </tr>
                  );
                }
              })
            )}
          </tbody>
        </table>
        <Chatbox />
      </div>
    );
  }
}

export default InformasiData;
