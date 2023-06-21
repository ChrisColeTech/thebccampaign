const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async (event) => {
    try {
        const { name, email, comment } = JSON.parse(event.body);

        const client = new faunadb.Client({ secret: 'fnAFG-Ky5LAATX9wNckFUbX0ngbxY2jv_PlqSUVN' });
        const result = await client.query(
            q.Create(q.Collection('comments'), {
                data: { name, email, comment, timestamp: new Date().toISOString() },
            })
        );

        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
