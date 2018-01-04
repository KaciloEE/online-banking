module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    transactionID: DataTypes.STRING,
    date: DataTypes.STRING,
    desc: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    user: DataTypes.INTEGER
  })

  Account.associate = function (models) {
  }

  return Account
}
