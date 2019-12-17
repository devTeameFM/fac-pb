
module.exports = (sequelize, DataTypes) => {
  const PB_CorrectionTime = sequelize.define('PB_CorrectionTime', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      idServiceName: {
        type: DataTypes.INTEGER
      },
      idSLA: {
        type: DataTypes.INTEGER
      },
      idPriorityName: {
        type: DataTypes.INTEGER
      },
      typeName: {
        type: DataTypes.TEXT
      },      
      definition: {
        type: DataTypes.TEXT
      },            
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
  }, {});
  PB_CorrectionTime.associate = function(models) {
    

  };
  return PB_CorrectionTime;
};
