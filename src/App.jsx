import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

// Helper functions

const validatePasswordLength = (password) => {
  if (password.length < 8 || password.length > 16) {
    return false;
  }

  return true;
};

const validatePasswordCharacters = (password) => {
  const allowedCharacters = /^[A-Za-z0-9]*$/;

  const match = password.match(allowedCharacters);

  if (!match) {
    return false;
  }

  return true;
};

const validateAtLeastOneDigit = (password) => {
  const digitRegex = /[0-9]+/g;

  const foundDigit = password.match(digitRegex);

  if (!foundDigit) {
    return false;
  }

  return true;
};

const splitPasswordAtDigits = (password) => {
  const substrings = password.split(/[0-9]+/);

  const returnArray = [];

  substrings.forEach((substring) => {
    if (substring.length > 0) {
      returnArray.push(substring);
    }
  });

  return returnArray;
};

function App() {
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState("password");
  const [validPassword, setValidPassword] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const handleTryPassword = () => { 
    event.preventDefault();
    setIsLoading(true);
    setErrors({});
    setValidPassword(null);

    if (validatePasswordLength(password) === false) {
      setIsLoading(false);
      setErrors({
        message: "Password must be between 8 and 16 characters"
      });
      return;
    }

    if (validatePasswordCharacters(password) === false) {
      setIsLoading(false);
      setErrors({
        message: "Password must only contain alphanumeric characters"
      });
      return;
    }

    if (validateAtLeastOneDigit(password) === false) {
      setIsLoading(false);
      setErrors({
        message: "Password must contain at least one digit"
      });
      return;
    }

    const wordsInPassword = splitPasswordAtDigits(password);

    wordsInPassword.forEach((word) => searchDictionary(word));
  };

  const searchDictionary = async (searchTerm) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`
      );

      if (response.status === 200) {
        setErrors({
          message: "Password cannot contain words found in the English dictionary",
        });
      }

      if (response.status === 404) {
        setIsLoading(false);
        setValidPassword(password)
      }
    } catch (err) {
      console.error(err);
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
                className="mb-2"
              />
              {errors.message ? (
                <Form.Text className="bg-danger text-light ps-2 pe-2">
                  {errors.message}
                </Form.Text>
              ) : (
                ""
              )}
              <Form.Check type="checkbox" className="mt-2">
                <Form.Check.Input
                  type="checkbox"
                  id="showPassword"
                  label="Show password"
                  onClick={toggleShowPassword}
                  value={checked}
                />
                <Form.Check.Label>Show password</Form.Check.Label>
              </Form.Check>
              <Button
                variant="primary"
                type="submit"
                className="mt-4"
                onClick={handleTryPassword}
              >
                Try Password
              </Button>
            </Form.Group>
          </Form>
        </Row>
        <Row>
          { isLoading ? (
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : ""}
          { errors.message || validPassword == null ? "" : <h3 className="text-validated">Success! &quot;{validPassword}&quot; is a valid password</h3> }
        </Row>
      </Container>
    </>
  );
}

export default App;
