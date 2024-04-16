module.exports = (sequelize, force) => {
  sequelize
    .sync({ force })
    .then(() => console.log('Sequelize Start!'))
    .catch((err) => console.log('Sequelize Error => ', err));
};
