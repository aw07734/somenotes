const Sequelize = require('sequelize');

const UserModel = require('./model/user');

const sequelize = new Sequelize('demo', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log('success');
    })
    .catch(e => {
        console.log('err', e);
    });

const User = UserModel(sequelize, Sequelize.DataTypes);

// User.sync()
//     .then(() => {
//         return User.bulkCreate([
//             {
//                 id: '1',
//                 username: 'aw',
//                 password: 'awsl',
//                 userId: '123456789012345678901234567890123456'
//             },
//             {
//                 id: '2',
//                 username: 'aw2',
//                 password: 'awsl2',
//                 userId: '123456789012345678901234567890123456'
//             },
//             {
//                 id: '3',
//                 username: 'aw3',
//                 password: 'awsl3',
//                 userId: '123456789012345678901234567890123456'
//             }
//         ])
//     });

// User.findOne({
//     where: {
//         id: '3'
//     }
// }).then(res => {
//     console.log(res);
// });

sequelize.User = User;

module.exports = sequelize;