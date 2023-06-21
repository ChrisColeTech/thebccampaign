const { Client, query } = require('faunadb')

/* configure faunaDB Client with our secret */
const client = new Client({ secret: 'fnAFG-Ky5LAATX9wNckFUbX0ngbxY2jv_PlqSUVN' });

const handler = async (event) => {
  const { id } = event
  console.log(`Function 'delete' invoked. delete id: ${id}`)
  try {
    const response = await client.query(query.Delete(query.Ref(query.Collection('comments'), id)))
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
