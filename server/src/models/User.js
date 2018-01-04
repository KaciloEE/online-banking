module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    role:{
      type: DataTypes.STRING,
      defaultValue: 'user'
    }
  })

  User.associate = function (models) {

  }

  return User
}
