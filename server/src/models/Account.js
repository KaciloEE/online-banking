module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    transactionID: DataTypes.STRING,
    date: DataTypes.INTEGER,
    desc: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    user: DataTypes.INTEGER
  })

  Account.associate = function (models) {
  }

  return Account
}
