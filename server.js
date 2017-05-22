const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {

  const server = express()

  server.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/api/posts', (req, res) => {
    return res.json({
      Results: [
        {
          id: "post-01",
          Title: "Post 01",
          Description: "Lorem ipsum."
        },
        {
          id: "post-02",
          Title: "Post 02",
          Description: "Lorem ipsum."
        }
      ]
    })
  })

  server.get('/api/post/:id', (req, res) => {
    return res.json({
      id: "post-01",
      Title: "Post 01",
      Description: "Lorem ipsum."
    })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })

})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
