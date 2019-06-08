const Sequelize = require('sequelize')

var sequelize = new Sequelize(undefined, undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './database/database.sqlite'
});

// 测试代码
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });


const Note = sequelize.define('note', {
  text: {
    type: Sequelize.STRING,
  },
  time: {
    type: Sequelize.STRING
  }
})

// Note.sync().then(() => {
//   Note.create({
//     text: 'Hello,World!',
//     time: '2019年6月8日 22:21'
//   }).then(()=>{
//     Note.findAll({raw:true}).then((notes)=>{
//       console.log(notes);
//     })
//   })
// });

module.exports.Note = Note
