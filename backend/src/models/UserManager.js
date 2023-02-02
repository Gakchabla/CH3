const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  find(id) {
    return this.connection.query(
      `select id, firstname, lastname, description, birthdate, city, email from  ${this.table} where id = ?`,
      [id]
    );
  }

  findAll() {
    return this.connection.query(
      `select id, firstname, lastname, description, birthdate, city, email from  ${this.table}`
    );
  }

  insert(users) {
    return this.connection.query(
      `insert into ${this.table} (firstname, lastname, birthdate, city, email, hashedPassword) values (?, ?, ?, ?, ?, ?)`,
      [
        users.firstname,
        users.lastname,
        users.birthdate,
        users.city,
        users.email,
        users.hashedPassword,
      ]
    );
  }

  isUserAdmin(id) {
    return this.connection.query(
      `select is_admin from  ${this.table} where id = ?`,
      [id]
    );
  }

  findAllWithPicture() {
    return this.connection.query(`select user.*, picture.picture_url from user
    inner join picture on picture.user_id = user.id;`);
  }

  findByEmailWithPassword(email) {
    return this.connection.query(
      `select * from  ${this.table} where email = ?`,
      [email]
    );
  }

  insertLike(userId, likedId) {
    return this.connection.query(
      `insert into user_has_liked (user_id, user_liked_id) values (?, ?)`,
      [userId, likedId]
    );
  }

  readLikes() {
    return this.connection.query(`select * from  user_has_liked`);
  }

  checkLikes(userId, likedId) {
    return this.connection.query(
      `select * from  user_has_liked where user_id = ? and user_liked_id = ?`,
      [userId, likedId]
    );
  }

  userWithLikeFromId(id) {
    return this.connection.query(
      `select user_liked_id from user_has_liked as uhl
      inner join user on user.id = uhl.user_id
      where user.id = ? group by user_liked_id`,
      [id]
    );
  }

  userLikes(id) {
    return this.connection.query(
      `select uhl.* from user_has_liked as uhl
    inner join user on user.id = uhl.user_id
    where uhl.user_id = ?;`,
      [id]
    );
  }

  userIsLiked(id) {
    return this.connection.query(
      `select uhl.* from user_has_liked as uhl
      inner join user on user.id = uhl.user_id
      where uhl.user_liked_id = ?;`,
      [id]
    );
  }

  selectMultipleUsers(idsString) {
    return this.connection.query(
      `SELECT user.id, firstname, lastname, description, birthdate, city, email, picture.picture_url
FROM ${this.table}
inner join picture on picture.user_id = user.id
WHERE user.id IN (?);`,
      [idsString]
    );
  }

  changeUserDescription(id, description) {
    return this.connection.query(
      `update ${this.table} set description = ? where id = ?`,
      [description, id]
    );
  }

  deleteUserLikes(id) {
    return this.connection.query(
      `delete from user_has_liked where user_id = ? or user_liked_id = ?`,
      [id, id]
    );
  }
}
module.exports = UserManager;
