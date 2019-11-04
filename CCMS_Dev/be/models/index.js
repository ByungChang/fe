'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

var sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User=require(`./user`)(sequelize,Sequelize);
db.Board=require(`./board`)(sequelize,Sequelize);
db.Board_comment=require(`./board_comment`)(sequelize,Sequelize);
db.Board_post=require(`./board_post`)(sequelize,Sequelize);
db.Company=require(`./company`)(sequelize,Sequelize);
db.Branch=require(`./branch`)(sequelize,Sequelize);
db.User_group=require(`./user_group`)(sequelize,Sequelize);
db.Display=require(`./display`)(sequelize,Sequelize);
db.Branch_device=require(`./branch_device`)(sequelize,Sequelize);
db.Board_file=require(`./board_file`)(sequelize,Sequelize);
db.File=require(`./file`)(sequelize,Sequelize);
db.Device=require(`./device`)(sequelize,Sequelize);

db.Board.belongsTo(db.Board_post,{foreignKey:'boardPostId', targetKey:'id'}); 
db.Board_post.hasMany(db.Board, {foreignKey: 'boardPostId'});

db.Board.belongsTo(db.User,{foreignKey:'userId', targetKey:'id'});
db.User.hasMany(db.Board, {foreignKey: 'userId'});

db.Board_comment.belongsTo(db.Board,{foreignKey:'boardId', targetKey:'id'});
db.Board.hasMany(db.Board_comment, {foreignKey: 'boardId'});

db.Board_comment.belongsTo(db.User,{foreignKey:'userId', targetKey:'id'});
db.User.hasMany(db.Board_comment, {foreignKey: 'userId'});

db.Branch.belongsTo(db.Company,{foreignKey:'companyId', targetKey:'id'});
db.Company.hasMany(db.Branch, {foreignKey: 'companyId'});

db.User.belongsTo(db.User_group,{foreignKey:'userGroupId', targetKey:'id'});
db.User_group.hasMany(db.User, {foreignKey: 'userGroupId'});

db.User_group.belongsTo(db.Branch,{foreignKey:'branchId', targetKey:'id'});
db.Branch.hasMany(db.User_group, {foreignKey: 'branchId'});

db.Display.belongsTo(db.User_group,{foreignKey:'userGroupId', targetKey:'id'});
db.User_group.hasMany(db.Display, {foreignKey: 'userGroupId'});

db.Branch_device.belongsTo(db.Branch,{foreignKey:'branchId', targetKey:'id'});
db.Branch.hasMany(db.Branch_device, {foreignKey: 'branchId'});

db.Board_file.belongsTo(db.Board,{foreignKey:'boardId', targetKey:'id'});
db.Board.hasMany(db.Board_file, {foreignKey: 'boardId'});

db.Board_file.belongsTo(db.File,{foreignKey:'fileId', targetKey:'id'});
db.File.hasMany(db.Board_file, {foreignKey: 'fileId'});

db.Branch_device.belongsTo(db.Device,{foreignKey:'deviceId', targetKey:'id'});

module.exports = db;
