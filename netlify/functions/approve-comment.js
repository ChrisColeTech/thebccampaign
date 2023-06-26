/* Import faunaDB sdk */
const process = require('process')

const { Client, query } = require('faunadb')

/* Configure faunaDB Client with our secret */
const client = new Client({ secret: 'fnAFG-Ky5LAATX9wNckFUbX0ngbxY2jv_PlqSUVN' });

const handler = async (event) => {
    const { id } = event
    console.log(`Function 'update' invoked. Update id: ${id}`)
    try {
        const response = await client.query(
            query.Update(
                query.Ref(query.Collection('comments'), id),
                { data: { approved: true } }
            )
        );
        console.log('Success:', response);
        return {
            statusCode: 200,
            body: JSON.stringify(response),
        };
    } catch (error) {
        console.error('Error updating comment:', error);
        return {
            statusCode: 400,
            body: JSON.stringify(error),
        };
    }
}

module.exports = { handler }
