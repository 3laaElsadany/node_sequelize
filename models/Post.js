module.exports = (db, type) => {
  return db.define('posts', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: type.STRING,
      allowNull: false
    },
    body: {
      type: type.STRING,
      allowNull: false
    }
  })
}