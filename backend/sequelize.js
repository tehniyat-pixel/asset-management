// sequelize.js

import { Sequelize, DataTypes } from 'sequelize';


  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql', // or 'postgres'
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
