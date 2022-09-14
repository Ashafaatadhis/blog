import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import axios from "../../api/axios";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const CreateCategory = () => {
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState({});
  const [show, setShow] = useState(false);

  const handlerAlert = () => {
    setShow((prev) => !prev);
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(category);
    try {
      console.log(category);
      const data = await axios.post("category", { name: category });
      setMsg(data.data);
      setShow(true);
    } finally {
      setIsLoading(false);
      setCategory("");
    }
  };
  return (
    <section className="admin">
      <div className="admin-jumbotron">
        <div className="bungkus">
          <div className="admin-back">
            <Link to="/">Back To Home</Link>
            <h1 className="mt-3">Add Category</h1>
            <Container>
              <Form onSubmit={handlerSubmit}>
                <Form.Group
                  className="mb-3 mt-4"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Name Category</Form.Label>
                  {show && (
                    <Alert
                      variant={msg.color}
                      onClose={handlerAlert}
                      dismissible
                    >
                      {msg.msg}
                    </Alert>
                  )}

                  <Form.Control
                    type="text"
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category..."
                    value={category}
                  />
                </Form.Group>
                {!isLoading && (
                  <Button variant="primary" className="mt-3" type="submit">
                    Submit
                  </Button>
                )}
              </Form>
            </Container>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateCategory;
