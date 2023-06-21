/* bootstrap database in your FaunaDB account - use with `netlify dev:exec <path-to-this-file>` */
const { Client, query } = require('faunadb')

const createFaunaDB = async function () {
  /* configure faunaDB Client with our secret */
  const client = new Client({ secret: 'fnAFG-Ky5LAATX9wNckFUbX0ngbxY2jv_PlqSUVN' });

  /* Based on your requirements, change the schema here */
  try {
    await client.query(query.CreateCollection({ name: 'comments' }))

    console.log('Created comments class')
    return await client.query(
      query.CreateIndex({
        name: 'all_comments',
        source: query.Collection('comments'),
        active: true,
      }),
    )
  } catch (error) {
    if (error.requestResult.statusCode === 400 && error.message === 'instance not unique') {
      console.log('DB already exists')
    }
    throw error
  }
}

createFaunaDB()
