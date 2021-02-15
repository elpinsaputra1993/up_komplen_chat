import React, { Component } from "react";
import "./FormData.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Chatbox from "../components/Chatbox";

export default class Login extends Component {
  fileObj = [];
  fileArray = [];
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit2 = this.onSubmit2.bind(this);
    this.textInput = React.createRef();
    this.onHandleTelephoneChange = this.onHandleTelephoneChange.bind(this);
    this.state = {
      imgCollection: "",
      regexp: /^[0-9\b]+$/,
      input: {},
      errors: {},
      phoneBride: "",
    };
  }

  // handleChange(event) {
  //   // this.setState({ value: event.target.value });
  //   alert(event.target.value);

  //   console.log(event);
  // }

  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
    if (event.target.name == "imgCollection") {
      this.onFileChange(event);
    } else if (event.target.name == "notelp") {
      this.onHandleTelephoneChange(event);
    } else {
      this.setState({
        input,
      });
    }

    // this.validate();
  }

  validasiEkstenFoto(val) {
    let _validFileExtensions = [".jpg", ".jpeg"];
    // let _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];

    if (val.length > 0) {
      var blnValid = 1;
      for (var j = 0; j < _validFileExtensions.length; j++) {
        var sCurExtension = _validFileExtensions[j];
        if (
          val
            .substr(val.length - sCurExtension.length, sCurExtension.length)
            .toLowerCase() == sCurExtension.toLowerCase()
        ) {
          blnValid = 0;
          // return;
        }
      }

      // if (blnValid) {
      //   let msg =
      //     "Format gambar tidak sesuai, ekstensi file yang sesuai, yaitu; " +
      //     _validFileExtensions.join(", ");
      //   alert(msg);
      //   // this.textInput.current.value = "";
      // }
      return blnValid;
    }
  }

  // onHandleTelephoneChange(e) {
  //   let input = this.state.input;
  //   let telephone = e.target.value;

  //   // if (!Number(telephone)) {
  //   //   return;
  //   // }

  //   // if value is not blank, then test the regex
  //   if (telephone === "" || this.state.regexp.test(telephone)) {
  //     // this.setState({ [e.target.name]: telephone });
  //     input[e.target.name] = telephone;
  //     this.setState({
  //       input,
  //     });
  //   }
  // }
  onHandleTelephoneChange(e) {
    let input = this.state.input;

    const phoneBride = e.target.validity.valid
      ? e.target.value
      : this.state.phoneBride;

    this.setState({ phoneBride });
    // input[e.target.name] = this.state.phoneBride;
    // this.setState({
    //   input,
    // });
    // console.log(this.state.phoneBride);
    // console.log(this.state.input);
  }

  onFileChange(e) {
    //=============
    let eks = 0;
    let input = this.state.input;
    this.fileObj = [];
    this.fileArray = [];
    // input[e.target.name] = this.fileArray;
    this.setState({ imgCollection: "" });
    this.setState({ imgCollection: e.target.files });
    //=============
    this.fileObj.push(e.target.files);
    for (let i = 0; i < this.fileObj[0].length; i++) {
      let image = this.fileObj[0][i].name;
      this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
      eks += this.validasiEkstenFoto(image);
      console.log(this.fileObj[0][i]);
      console.log(image);
    }

    console.log(`eks  ${eks}`);
    console.log(this.fileArray);

    if (eks > 0) {
      let _validFileExtensions = [".jpg", ".jpeg"];
      let msg =
        "Format gambar tidak sesuai, ekstensi file yang sesuai, yaitu; " +
        _validFileExtensions.join(", ");

      this.fileObj = [];
      this.fileArray = [];
      this.setState({ imgCollection: "" });
      input[e.target.name] = this.fileArray;
      this.setState({
        input,
      });
      this.textInput.current.value = "";
      alert(msg);
    } else {
      this.setState({ file: this.fileArray });
      // @@@@@@@@@
      input[e.target.name] = this.fileArray;
      this.setState({
        input,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    let input = this.state.input;
    input["notelp"] = this.state.phoneBride;
    this.setState({
      input,
    });
    console.log(this.state.input);
    console.log(this.state.phoneBride);
    if (this.validate()) {
      console.log(this.state);
      // return false;
      var formData = new FormData();
      //=============
      for (const key of Object.keys(this.state.imgCollection)) {
        formData.append("imgCollection", this.state.imgCollection[key]);
      }
      //=============
      // formData.append("multiUpload", this.state.file);
      // @@@@@@@@@
      formData.append("name", this.state.input.name);
      formData.append("notelp", this.state.input.notelp);
      formData.append("email", this.state.input.email);
      formData.append("topik", this.state.input.topik);
      formData.append("location", this.state.input.location);
      formData.append("info", this.state.input.info);
      // formData.append("testinput", "test aja aaa");
      // formData.append("testlagi", "test aja lagi");
      // formData.append("testcoba", "test aja coba");
      console.log(this.state.input.imgCollection);
      console.log([...formData]);

      axios
        .post("http://localhost:5000/api/upload-images", formData, {})
        .then((res) => {
          console.log(res.data);
          this.fileObj = [];
          this.fileArray = [];

          let input = {};
          input["name"] = "";
          input["notelp"] = "";
          input["email"] = "";
          input["topik"] = "";
          input["location"] = "";
          input["info"] = "";
          input["imgCollection"] = "";
          this.setState({ imgCollection: "" });
          this.setState({ phoneBride: "" });
          this.textInput.current.value = "";

          this.setState({ input: input });
        });

      alert("Data berhasil disimpan.");
    }
  }

  onSubmit2(e) {
    e.preventDefault();

    console.log(this.state.input);
    if (this.validate()) {
      console.log(this.state);

      let input = {};
      input["name"] = "";
      input["notelp"] = "";
      input["email"] = "";
      input["topik"] = "";
      input["location"] = "";
      input["info"] = "";
      input["imgCollection"] = "";

      this.setState({ input: input });

      alert("Demo Form is submited");
    }
  }

  validate() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if (!input["name"]) {
      isValid = false;
      errors["name"] = "Mohon masukan nama.";
    }

    if (!input["notelp"]) {
      isValid = false;
      errors["notelp"] = "Mohon masukan no. telpon.";
    }

    if (!input["email"]) {
      isValid = false;
      errors["email"] = "Mohon masukan email.";
    }

    if (typeof input["email"] !== "undefined") {
      var pattern = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
      if (!pattern.test(input["email"])) {
        isValid = false;
        errors["email"] = "Mohon pastikan format email valid.";
      }
    }

    if (!input["topik"]) {
      isValid = false;
      errors["topik"] = "Mohon masukan topik.";
    }

    if (!input["location"]) {
      isValid = false;
      errors["location"] = "Mohon masukan lokasi.";
    }

    if (!input["info"]) {
      isValid = false;
      errors["info"] = "Mohon masukan info.";
    }

    if (!input["imgCollection"] || input["imgCollection"].length == 0) {
      isValid = false;
      errors["imgCollection"] = "Mohon masukan gambar bukti.";
    }

    this.setState({
      errors: errors,
    });

    if (!isValid) {
      alert(
        "Mohon pastikan data sudah diisi.\n Dan email sudah sesuai format email, contoh; `formattest@email.com`"
      );
    }

    return isValid;
  }

  render() {
    return (
      <div>
        <div className="container-fluid col-md-6">
          <div className="card mx-auto ">
            <div className="card-header">
              <div className="col">
                <h3>Form Pengisian Laporan / Pengaduan</h3>
              </div>
            </div>
            <div className="card-body">
              <div className="col">
                <div>
                  <form onSubmit={this.onSubmit}>
                    <div className="data">
                      <div className="form-group">
                        <label htmlFor="name">Nama</label>
                        <div className="text-danger">
                          {this.state.errors.name}
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Masukan nama.."
                          value={this.state.input.name}
                          className="form-control"
                          onChange={this.handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="notelp">No telpon / HP</label>
                        <div className="text-danger">
                          {this.state.errors.notelp}
                        </div>
                        <input
                          type="text"
                          pattern="[0-9]*"
                          id="notelp"
                          name="notelp"
                          placeholder="Masukan nomor telpon.."
                          value={this.state.phoneBride}
                          className="form-control"
                          onChange={this.onHandleTelephoneChange}
                          // onKeyup={this.onHandleTelephoneChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="text-danger">
                          {this.state.errors.email}
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Masukan email"
                          value={this.state.input.email}
                          className="form-control"
                          onChange={this.handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="topik">Topik Laporan/Pengaduan</label>
                        <div className="text-danger">
                          {this.state.errors.topik}
                        </div>
                        <input
                          type="text"
                          id="topik"
                          name="topik"
                          placeholder="Masukan Subjek/Topik.."
                          value={this.state.input.topik}
                          className="form-control"
                          onChange={this.handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="location">
                          Lokasi Laporan/Pengaduan
                        </label>
                        <div className="text-danger">
                          {this.state.errors.location}
                        </div>
                        <textarea
                          id="location"
                          name="location"
                          placeholder="Masukan lokasi.."
                          value={this.state.input.location}
                          className="form-control"
                          onChange={this.handleChange}
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <label htmlFor="info">
                          Informasi Detail Laporan/Pengaduan
                        </label>
                        <div className="text-danger">
                          {this.state.errors.info}
                        </div>
                        <textarea
                          id="info"
                          name="info"
                          placeholder="Masukan Informasi Detail.."
                          value={this.state.input.info}
                          className="form-control"
                          onChange={this.handleChange}
                        ></textarea>
                      </div>

                      <div className="form-group multi-preview">
                        {(this.fileArray || []).map((url) => (
                          <img src={url} alt="..." />
                        ))}
                      </div>
                      <div className="form-group">
                        <label htmlFor="imgCollection">
                          Upload gambar bukti laporan
                        </label>
                        <div className="text-danger">
                          {this.state.errors.imgCollection}
                        </div>
                        <input
                          type="file"
                          name="imgCollection"
                          className="form-control"
                          onChange={this.handleChange}
                          // onClick={this.onFileChange}
                          ref={this.textInput}
                          multiple
                        />
                        <br />
                        <cite style={{ color: "red" }} title="Source Title">
                          Ekstensi gambar "jpg, jpeg"
                        </cite>
                      </div>
                      {/* <button
            type="button"
            className="btn btn-danger btn-block"
            onClick={this.uploadFiles}
          >
            Upload
          </button> */}
                      <br></br>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Proses
                      </button>
                      {/* <input type="submit" value="Submit" /> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Chatbox />
      </div>
    );
  }
}
