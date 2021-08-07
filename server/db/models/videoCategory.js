;("use strict")

module.exports = (sequelize, DataTypes) => {
  const VideoCategory = sequelize.define(
    "VideoCategory",
    {
      name: DataTypes.STRING,
    },
    {}
  )
  VideoCategory.associate = function (models) {
    // associations can be defined here
  }
  return VideoCategory
}
