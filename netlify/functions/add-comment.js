const { Client, query } = require('faunadb');

/* Configure faunaDB Client with our secret */
const client = new Client({ secret: 'fnAFG-Ky5LAATX9wNckFUbX0ngbxY2jv_PlqSUVN' });

/* Export our lambda function as named "handler" export */
const handler = async (event) => {
  /* Parse the string body into a usable JS object */
  const data = JSON.parse(event.body);
  console.log('Function `create` invoked', data);
  const { name, email, comment } = data;
  const item = { data: { name, email, comment, timestamp: new Date().toISOString(), approved: false } };

  /* Construct the fauna query */
  try {
    const response = await client.query(query.Create(query.Collection('comments'), item));
    console.log('Success', response);
    /* Success! Return the response with statusCode 200 */
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
    /* Error! Return the error with statusCode 400 */
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};

module.exports = { handler };
