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
            fetchComments(); // Refresh comments after adding a new one
        })
        .catch(error => console.error('Error adding comment:', error));
};

// Attach event listener to form submission
document.getElementById('commentForm').addEventListener('submit', handleFormSubmit);
