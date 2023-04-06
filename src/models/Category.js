module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      id: { allowNull: false,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            primaryKey: true},
      name: DataTypes.STRING,
    },  
    {
        timestamps: false,
        tableName: 'users',
        underscored: true,
    });
  
    return Category;
  };