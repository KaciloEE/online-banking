module.exports = (app) => {

  app.get('/', (req, res) => {
    res.send('OK')
  })

  app.post('/auth/login/', (req, res) => {
    if (req.body.email == 'admin@admin.com' && req.body.password == '2') {
      res.status(200)
        .json({
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9.J6n4-v0I85zk9MkxBHroZ9ZPZEES-IKeul9ozxYnoZ8'
        })
    } else {
      res.sendStatus(403);
    }
  });
}
