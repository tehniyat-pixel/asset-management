// sequelize.js

import { Sequelize, DataTypes } from 'sequelize';


  const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const Asset = sequelize.define('Asset', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  purchaseDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  deliveryDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  depreciationValue: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});


export default sequelize;
