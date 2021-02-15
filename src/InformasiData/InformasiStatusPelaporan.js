import React, { Component } from "react";
import "./InformasiData.css";
import axios from "axios";
import moment from "moment";
import Chatbox from "../components/Chatbox";

class InformasiStatusPelaporan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {}

  async getData() {
    axios.get("api/tindaklanjut").then((res) => {
      const getData = res.data.data;
      console.log("tes : " + JSON.stringify(res.data.data));
      this.setState({ lists: getData });
      console.log(this.state);
    });
  }

  render() {
    const statusToRender = this.state.lists.filter((list) => list.name);
    const numRows = statusToRender.length;
    const isEmpty = !statusToRender.length;
    return (
      <div className="container">
        <h2>Informasi Status Pelaporan</h2>

        <table id="t01">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Waktu</th>
              <th>Status</th>
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
              this.state.lists.map((data, index) => {
                if (index > -1) {
                  // skip the first element since it's already used above
                  return (
                    <tr key={index.toString()}>
                      <td>{`${++index}.`}</td>
                      <td>{data.name}</td>
                      <td>
                        {moment(this.datetime)
                          .utc()
                          .format("YYYY-MM-DD hh:mm:ss", true)}
                      </td>
                      <td>{data.status}</td>
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

export default InformasiStatusPelaporan;
