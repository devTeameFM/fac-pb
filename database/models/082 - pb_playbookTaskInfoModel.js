
module.exports = (sequelize, DataTypes) => {
  const PB_PlaybookTaskInfo = sequelize.define('PB_PlaybookTaskInfo', {
    coverImage: DataTypes.STRING
  }, {});
  PB_PlaybookTaskInfo.associate = function(models) {
    PB_PlaybookTaskInfo.hasMany(models.PB_Playbook, {
        foreignKey: 'taskId',
        as: 'taskInfo',
        onDelete: 'CASCADE',
      });
  };
  return PB_PlaybookTaskInfo;
};
