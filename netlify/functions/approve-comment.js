const { Client, query } = require('faunadb');

/* Configure faunaDB Client with our secret */
const client = new Client({ secret: 'fnAFG-Ky5LAATX9wNckFUbX0ngbxY2jv_PlqSUVN' });

const handler = async (event) => {
    const data = JSON.parse(event.body);
    const { id } = event;
    console.log(`Function 'update' invoked. update id: ${id}`);
    try {
        const response = await client.query(
            query.Update(
                query.Ref(query.Collection('comments'), commentId),
                {
                    data: {
                        approved: true, // Set the 'approved' field to 'true'
                    },
                }
            )
        );
        console.log('success', response);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            },
            body: JSON.stringify(response),
        };
    } catch (error) {
        console.log('error', error);
        return {
            statusCode: 400,
            body: JSON.stringify(error),
        };
    }
};

module.exports = { handler };
