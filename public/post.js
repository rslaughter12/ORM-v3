const postForm = document.querySelector('#post-form');

// Add an event listener for the form submission
postForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Get the user input values
  const title = document.querySelector('#post-title').value;
  const content = document.querySelector('#post-content').value;

  // Create an object with the user credentials
  const credentials = {
    title,
    content,
  };

  try {
    // Send a POST request to the server to handle the login
    const response = await fetch('/posts', {
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
      const errorElement = document.querySelector('#post-error');
      errorElement.textContent = errorData.error;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    // Display a generic error message on the page
    const errorElement = document.querySelector('#post-error');
    errorElement.textContent = 'An error occurred. Please try again.';
  }
});
