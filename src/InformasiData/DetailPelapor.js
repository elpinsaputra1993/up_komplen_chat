import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Chatbox from "../components/Chatbox";

const images = [];
// const images = [
//   "//placekitten.com/1500/500",
//   "//placekitten.com/4000/3000",
//   "//placekitten.com/800/1200",
//   "//placekitten.com/1500/1500",
// ];
class DetailPelapor extends Component {
  fileObj = [];
  images2 = [];
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      photoIndex: 0,
      isOpen: false,
      txtTest: "Dropdown right",
      statusList: "",
      idProses: "",
    };
  }

  componentDidMount() {
    this.getData();
  }

  handleSelect = (e) => {
    console.log(e);
    let idx = this.state.idProses;
    axios
      .patch("api/update_status/" + idx, {
        status: e,
      })
      .then((res) => {
        console.log("👉 Returned data:", res);
      });
    this.setState({ txtTest: e });
    this.setState({ statusList: e });
  };

  async getData() {
    let getIdx = this.props.match.params.idx;
    axios.defaults.baseURL = window.location.href.origin;
    // axios.defaults.baseURL = "http://api.openweathermap.org";
    axios.get(getIdx).then((res) => {
      const getUser = res.data.data;
      console.log("tes : " + JSON.stringify(res.data.data));
      console.log(res.data);
      this.setState({
        user: getUser,
        statusList: res.data.data_tindaklanjut.status,
        idProses: res.data.data_tindaklanjut._id,
      });
      console.log(this.state);
      this.fileObj.push(this.state.user.imgCollection);
      for (let i = 0; i < this.fileObj[0].length; i++) {
        images.push(this.fileObj[0][i]);
        // console.log(this.fileObj[0][i]);
      }
      console.log("fsfsfsdfds");
      console.log(this.fileObj);
      console.log(this.fileObj[0].length);
      console.log(this.fileObj[0]);
    });
  }

  render() {
    const { photoIndex, isOpen } = this.state;
    return (
      <div>
        <div className="container-fluid">
          <div className="card mx-auto ">
            <div className="card-header">
              <h3>Informasi Lengkap dari : {this.state.user.name}</h3>
              {/* <h3>Informasi Lengkap Pelapor {this.props.match.params.idx}</h3> */}
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  {/* <h2>Hello</h2> */}
                  <h3 className="card-title">{this.state.user.topic}</h3>
                  <p className="card-text">{this.state.user.location}</p>
                  <a href="#" className="card-link">
                    {this.state.user.phone}
                  </a>
                  <a href="#" className="card-link">
                    {this.state.user.email}
                  </a>
                  <br />
                  <br />
                  <p className="card-text">{this.state.user.info}</p>
                  <a
                    href="#"
                    className="btn btn-primary"
                    onClick={() => {
                      //   this.images = [];
                      this.setState({ isOpen: true });
                    }}
                  >
                    Bukti gambar
                  </a>
                  <hr />
                  <footer className="blockquote-footer">
                    Waktu pelaporan/pengaduan;&nbsp;&nbsp;
                    {/* {this.state.user.datetime} */}
                    {moment(this.state.user.datetime)
                      .utc()
                      .format("YYYY-MM-DD hh:mm:ss", true)}
                    {/* {() => {
                  var date = new Date(this.state.userdatetime);
                  var YYYY = date.getFullYear();
                  var DD = date.getMonth() + 1;
                  var MM = date.getDate();
                  var HH = date.getHours();
                  var mm = date.getMinutes();
                  var ss = date.getSeconds();

                  return (
                    YYYY + "-" + MM + "-" + DD + " " + HH + ":" + mm + ":" + ss
                  );
                }} */}
                    {/* Someone famous in <cite title="Source Title">Source Title</cite> */}
                  </footer>
                </div>
                <div className="col">
                  <div className="float-right">
                    <DropdownButton
                      alignRight
                      title={this.state.statusList}
                      id="dropdown-menu-align-right"
                      onSelect={this.handleSelect}
                    >
                      <Dropdown.Item eventKey="Menunggu Antrian">
                        Menunggu Antrian
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Dalam Penanganan Pihak Terkait">
                        Dalam Penanganan Pihak Terkait
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Selesai">Selesai </Dropdown.Item>
                      {/* <Dropdown.Divider />
                      <Dropdown.Item eventKey="some linka">
                        some link
                      </Dropdown.Item> */}
                    </DropdownButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}
        <Chatbox />
      </div>
    );
  }
}

DetailPelapor.propTypes = {};

export default DetailPelapor;
