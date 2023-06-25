// Function to handle form submission
const handleFormSubmit = (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const comment = document.getElementById('comment').value;

    const formData = { name, email, comment };

    fetch('/.netlify/functions/add-comment', {
        method: 'POST',
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(result => {
            console.log('Comment added:', result);
            document.getElementById('commentForm').reset();
            appendComment(result.data); // Append the new comment to the comments div
        })
        .catch(error => console.error('Error adding comment:', error));
};

// Function to append a single comment to the comments div
const appendComment = (comment) => {
    const commentHtml = `
    <div class="comment">
    <p class="comment-text">${comment.comment}</p>
    <p class="comment-author">-${comment.name}</p>
</div>
    `;

    // Append the new comment to the comments div
    const commentsDiv = document.getElementById('comments');
    commentsDiv.insertAdjacentHTML('beforeend', commentHtml);
};

// Attach event listener to form submission
document.getElementById('commentForm').addEventListener('submit', handleFormSubmit);
