module.exports = (db, type) => {
  return db.define('categories', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: type.STRING,
      allowNull: false
    }
  })
}