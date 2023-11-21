import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function App() {
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState("password");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = (event) => {
    
    if (event.target.value == "false") {
      setShowPassword("text");
      setChecked(true);
    } else {
      setShowPassword("password");
      setChecked(false);
    }
  };

  return (
    <>
      <Container className="text-light">
        <Row>
          <Col>
            <h1 className="text-center mt-3">Validate a Password</h1>
          </Col>
        </Row>
        <hr />
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword}
                placeholder="Enter a password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Form.Check type="checkbox">
                <Form.Check.Input
                  type="checkbox"
                  id="showPassword"
                  label="Show password"
                  onClick={toggleShowPassword}
                  value={checked}
                />
                <Form.Check.Label>Show password</Form.Check.Label>
              </Form.Check>
              <Form.Text className="danger">Error message goes here</Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Try Password
            </Button>
          </Form>
        </Row>
      </Container>
    </>
  );
}

export default App;
