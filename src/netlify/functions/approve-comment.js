const { Client, query } = require('faunadb');

/* Configure faunaDB Client with our secret */
const client = new Client({ secret: 'fnAFG-Ky5LAATX9wNckFUbX0ngbxY2jv_PlqSUVN' });

const handler = async (event) => {
    const data = JSON.parse(event.body);
    const { ref } = data;
    console.log(`Function 'update' invoked. Update comment with ref: ${ref}`);

    try {
        const response = await client.query(query.Update(query.Ref(query.Collection('comments'), ref), {
            data: {
                approved: true, // Set the 'approved' field to 'true'
            },
        }))

        console.log('Success', response);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            },
            body: JSON.stringify(response),
        };
    } catch (error) {
        console.log('Error', error);
        return {
            statusCode: 400,
            body: JSON.stringify(error),
        };
    }
};

module.exports = { handler };
