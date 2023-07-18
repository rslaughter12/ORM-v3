// login.js

// Get a reference to the login form
const loginForm = document.querySelector('#login-form');

// Add an event listener for the form submission
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Get the user input values
  const email = document.querySelector('#login-email').value;
  const password = document.querySelector('#login-password').value;

  // Create an object with the user credentials
  const credentials = {
    email,
    password,
  };

  try {
    // Send a POST request to the server to handle the login
    const response = await fetch('/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const errorData = await response.json();
    console.log(errorData);

    if (response.ok) {
      // Redirect to the dashboard or desired page on successful login
      window.location.href = '/dashboard';
    } else {
      // Handle the error case where the login was unsuccessful

      // Display the error message on the page
      const errorElement = document.querySelector('#login-error');
      errorElement.textContent = errorData.error;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    // Display a generic error message on the page
    const errorElement = document.querySelector('#login-error');
    errorElement.textContent = 'An error occurred. Please try again.';
  }
});


const signupForm = document.querySelector('#signup-form');

// Add an event listener for the form submission
signupForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Get the user input values
  const email = document.querySelector('#signup-email').value;
  const password = document.querySelector('#signup-password').value;
  const username = document.querySelector('#signup-username').value;

  // Create an object with the user credentials
  const credentials = {
    email,
    password,
    username
  };

  try {
    // Send a POST request to the server to handle the login
    const response = await fetch('/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const errorData = await response.json();
    console.log(errorData);

    if (response.ok) {
      // Redirect to the dashboard or desired page on successful login
      window.location.href = '/dashboard';
    } else {
      // Handle the error case where the login was unsuccessful

      // Display the error message on the page
      const errorElement = document.querySelector('#login-error');
      errorElement.textContent = errorData.error;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    // Display a generic error message on the page
    const errorElement = document.querySelector('#login-error');
    errorElement.textContent = 'An error occurred. Please try again.';
  }
});