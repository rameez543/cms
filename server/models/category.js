'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    categoryName: DataTypes.STRING,
    parentCategory: DataTypes.INTEGER
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
  
  };
  return Category;
};