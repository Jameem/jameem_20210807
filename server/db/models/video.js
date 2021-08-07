;("use strict")

module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define(
    "Video",
    {
      title: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      fileName: DataTypes.STRING,
      filePath: DataTypes.STRING,
      thumbnail64: DataTypes.STRING,
      thumbnail128: DataTypes.STRING,
      thumbnail256: DataTypes.STRING,
    },
    {}
  )
  Video.associate = function (models) {
    // associations can be defined here
    Video.belongsTo(models.VideoCategory, {
      foreignKey: "categoryId",
    })
  }
  return Video
}
