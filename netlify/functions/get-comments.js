const { Client, query } = require('faunadb');

/* Configure faunaDB Client with our secret */
const client = new Client({ secret: 'fnAFG-Ky5LAATX9wNckFUbX0ngbxY2jv_PlqSUVN' });

const handler = async () => {
    try {
        const response = await client.query(query.Map(
            query.Paginate(query.Documents(query.Collection('comments'))),
            query.Lambda((x) => query.Get(x))
        ));

        const comments = response.data.map(comment => `
      <div>
        <h3>${comment.data.name}</h3>
        <p>${comment.data.comment}</p>
      </div>
    `);

        const html = `
      <html>
        <head>
          <title>Comments</title>
        </head>
        <body>
          <h2>Comments</h2>
          <div id="comments">
            ${comments.join('')}
          </div>
        </body>
      </html>
    `;

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html',
            },
            body: html,
        };
    } catch (error) {
        console.log('error', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

module.exports = { handler };
