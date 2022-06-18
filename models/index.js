const User = require('./user');
const Cost = require('./cost');
const Maintenance = require('./maintenance');


// set up relationships
User.hasMany(Cost, {
    foreignKey: 'user_id'
});

Cost.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Maintenance, {
    foreignKey: 'user_id'
});

Maintenance.belongsTo(User, {
    foreignKey: 'user_id'
});
module.exports = { User, Cost, Maintenance };