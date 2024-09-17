module.exports = (db, type) => {
  return db.define('users', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: type.STRING,
      allowNull: false,
      validate: {
        is: ['^[a-z]+$', 'i']
      }
    }
  })
}