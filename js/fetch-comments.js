// Function to fetch and display comments
const fetchComments = () => {
    fetch('/.netlify/functions/get-comments')
        .then(response => response.json())
        .then(data => {
            // Iterate over the comments data and create HTML markup
            const commentsHtml = data.map(comment => `
                <div>
                    <h3>${comment.name}</h3>
                    <p>${comment.comment}</p>
                </div>
            `).join('');

            // Inject the comments HTML into the comments div
            document.getElementById('comments').innerHTML = commentsHtml;
        })
        .catch(error => console.error('Error fetching comments:', error));
};

// Fetch and display comments when the page loads
fetchComments();
