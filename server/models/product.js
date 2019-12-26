'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    productName: DataTypes.STRING,
    categoryID: DataTypes.INTEGER,
    brandID: DataTypes.INTEGER,
    specification: DataTypes.STRING
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Brands)
    Product.belongsTo(models.Category)
  };
  return Product;
};