const { Client, query } = require('faunadb');

/* Configure faunaDB Client with our secret */
const client = new Client({ secret: 'fnAFG-Ky5LAATX9wNckFUbX0ngbxY2jv_PlqSUVN' });

const handler = async (event) => {
    try {
        const { id } = JSON.parse(event.body);

        // Update the comment's 'approved' field to true
        const response = await client.query(
            query.Update(query.Ref(query.Collection('comments'), id), {
                data: { approved: true }
            })
        );

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            },
            body: JSON.stringify({ message: 'Comment approved successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

module.exports = { handler };
