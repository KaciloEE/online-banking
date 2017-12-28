const {User} = require('./models');
const jwt = require('jsonwebtoken');
const config = require('./config/config');

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = (app) => {

  app.post('/auth/register/', (req, res) => {
    try {
      User.create(req.body)
        .then(user => {
          const userJson = user.toJSON()
          res.send({
            //user: userJson,
            token: jwtSignUser(userJson)
          })
        })
        .catch(err => {
          console.log(err)
          res.sendStatus(400);
        })
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  }
)

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
