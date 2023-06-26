const { Client, query } = require('faunadb')

/* configure faunaDB Client with our secret */
const client = new Client({ secret: 'fnAFG-Ky5LAATX9wNckFUbX0ngbxY2jv_PlqSUVN' });

const handler = async (event, context) => {
  const { ref } = event.queryStringParameters || {}; // Access the 'ref' parameter from the query string
  console.log(`Function 'read' invoked. Read ref: ${ref}`);

  try {
    const response = await client.query(query.Get(query.Ref(query.Collection('comments'), ref)))
    console.log('success', response)
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    }
  }
}

module.exports = { handler }
