const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {User, Account} = require('./models');
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

  app.get('/api/balance/', (req, res) => {
    const decoded = jwt.decode(req.headers.token);

    Account.findAll({
      where: {
        user: decoded.role === 'admin' ? req.query.user : decoded.id
      },
      order: [['updatedAt', 'DESC']],
      raw : true
    }).then(result => res.send({accData: result}))
      .catch((err) => {
      res.status(400).send({message: 'Something went wrong with your Signin'});
    });

  });

  app.get('/api/allUser/', (req, res) => {
    User.findAll({
      where: {
        role: 'user'
      },
      raw : true
    }).then(result => res.send({users: result}))
      .catch((err) => {
        res.status(400).send({message: 'Something went wrong with your Signin'});
      });

  });

  app.post('/api/transfer/', (req, res) => {
    // const decoded = jwt.decode(req.headers.token);
    Account.create(req.body.depositTrans)
      .then((data) => {
        res.send(data)
      })
  });
}
