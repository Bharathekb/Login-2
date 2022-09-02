import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import "./index.css";
const App = () => {
  const [data, setData] = useState({
    name: "",
    password: "",
  });
  const handler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submit = (e) => {
    e.preventDefault();
    fetch("https://test-api-b-default-rtdb.firebaseio.com/data.json", {
      method: "post",
      body: JSON.stringify(data),
    }).then((res) => {
      if (data.name == "" && data.password == "") {
        document.getElementById("demo").innerHTML =
          " Name and Password Should Not Be Empty";
        document.getElementById("demo").style.display = "block";
      } else if (data.name == "") {
        document.getElementById("demo").innerHTML = "Please Enter Name";
        document.getElementById("demo").style.display = "block";
      } else if (data.password == "") {
        document.getElementById("demo").innerHTML = "Please Enter Password";
        document.getElementById("demo").style.display = "block";
      } else if (data.name.length < 5 || data.password.length < 5) {
        document.getElementById("demo").innerHTML =
          "Name or Password Must Be 5 Charecters";
        document.getElementById("demo").style.display = "block";
      } else {
        document.getElementById("demo").style.display = "none";

        handleShow();
      }
    });
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <body>
      <div className="container ">
        <center>
          <div className="row">
            <div className="col-md-12">
              <h4>Login Form</h4>
              <form onSubmit={submit}>
                <lable>User Name</lable>
                <br />
                <input type="text" name="name" onChange={handler} />
                <br />
                <lable>Password</lable>
                <br />
                <input type="Password" name="password" onChange={handler} />
                <br />
                <br />
                <input type="submit" value="Log In" id="btn" />
                <br />
                <h5 id="demo"></h5>
              </form>
            </div>
          </div>
        </center>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="modal-title">Welcome</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal-body">
          Login Success! Data Posted To Database
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </body>
  );
};

export default App;
