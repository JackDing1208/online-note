const Sequelize =require('sequelize')

var sequelize = new Sequelize(undefined, undefined,undefined, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './database/database.sqlite'
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


// const Note = sequelize.define('user', {
//   // attributes
//   firstName: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: Sequelize.STRING
//     // allowNull defaults to true
//   }
// }
