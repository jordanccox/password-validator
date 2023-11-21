# Password Validator

This is a password validation app built with React. It allows a user to enter a password and then verifies that the password is between 8 and 16 characters long, contains only alphanumeric characters, has at least one digit, and contains no words found in the English dictionary.

## Run Locally

To install, clone this repo by typing `git clone https://github.com/jordanccox/password-validator.git` into your command line. Once cloned, type:

```
cd password-validator
npm install
npm run dev
```

Visit localhost:5173 in your web browser of choice. Enter a password into the input and click "Try Password" to see if it falls within the defined constraints. If it doesn't meet the requirements, you will get an error message telling you why your password was not valid. If it meets the requirements, you will get a success message.
