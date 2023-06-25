// Function to fetch and display comments
const fetchComments = () => {
    fetch('https://thriving-tanuki-c43811.netlify.app/.netlify/functions/get-comments')
        .then(response => response.json())
        .then(data => {
            const commentsHtml = data.map(comment => `
                <div class="comment">
                    <p class="comment-text">${comment.comment}</p>
                    <p class="comment-author">-${comment.name}</p>
                </div>
            `).join('');

            document.getElementById('comments').innerHTML = commentsHtml;
        })
        .catch(error => console.error('Error fetching comments:', error));
};

// Fetch and display comments when the page loads
fetchComments();



