// Function to handle form submission
const handleFormSubmit = (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const comment = document.getElementById('comment').value;

  const formData = { name, email, comment };

  fetch('/.netlify/functions/create-comment', {
    method: 'POST',
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Comment added:', data);
      document.getElementById('commentForm').reset();
      appendComment(data); // Append the new comment to the comments div
    })
    .catch(error => console.error('Error adding comment:', error));
};

// Function to append a single comment to the comments div
const appendComment = (comment) => {
  const commentHtml = `
      <div>
          <h3>${comment.name}</h3>
          <p>${comment.comment}</p>
      </div>
  `;

  // Append the new comment to the comments div
  const commentsDiv = document.getElementById('comments');
  commentsDiv.insertAdjacentHTML('beforeend', commentHtml);
};

// Attach event listener to form submission
document.getElementById('commentForm').addEventListener('submit', handleFormSubmit);
