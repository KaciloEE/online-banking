const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {User} = require('./models');
const config = require('./config/config');

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = (app) => {

  app.post('/auth/register/', (req, res) => {
    // newUser.password = bcrypt.hashSync(req.body.password, 10);

    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function (user) {
      if (user) {
        res.status(401).json({message: 'That email is already taken.'})
      } else {

        const data = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10)
        }

        User.create(data)
          .then((newUser) => {
            const userJson = newUser.toJSON()
            res.send({token: jwtSignUser(userJson)})
          })
      }
    })
  });

  app.post('/auth/login/', (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then((user) => {
      if (!user) {
        res.status(401).json({message: 'Authentication failed. User not found'});
      }
      const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)

      if (!isPasswordValid) {
        return res.status(403).send({
          message: 'The login information was incorrect'
        })
      }

      const userJson = user.toJSON()
      res.send({token: jwtSignUser(userJson)})

    }).catch((err) => {
      res.status(400).send({message: 'Something went wrong with your Signin'});
    });
  });
}
