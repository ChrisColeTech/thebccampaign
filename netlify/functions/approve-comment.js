const { Client, query } = require('faunadb');

// Configure faunaDB Client with your secret
const client = new Client({ secret: 'fnAFG-Ky5LAATX9wNckFUbX0ngbxY2jv_PlqSUVN' });

const updateComment = async (commentRef) => {
    try {
        const response = await client.query(
            query.Update(commentRef, {
                data: {
                    approved: true, // Update the 'approved' field to 'true'
                },
            })
        );

        console.log('Comment updated:', response);
    } catch (error) {
        console.error('Error updating comment:', error);
    }
};

// Usage: Pass the comment's reference to the updateComment function
const commentRef = query.Ref(query.Collection('comments'), '368163016641871945');
updateComment(commentRef);
