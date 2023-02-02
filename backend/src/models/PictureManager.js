const AbstractManager = require("./AbstractManager");

class PictureManager extends AbstractManager {
  constructor() {
    super({ table: "picture" });
  }

  insert(photo) {
    return this.connection.query(
      `insert into ${this.table} (picture_url, user_id) values (?, ?)`,
      [photo.url, photo.userId]
    );
  }

  findAllByUser(id) {
    return this.connection.query(
      `select * from  ${this.table} where user_id = ?`,
      [id]
    );
  }

  changeUserPictureUrl(id, pictureUrl) {
    return this.connection.query(
      `update ${this.table} set picture_url = ? where user_id = ?`,
      [pictureUrl, id]
    );
  }

  deleteUserPicture(id) {
    return this.connection.query(
      `delete from ${this.table} where user_id = ?`,
      [id]
    );
  }
}
module.exports = PictureManager;
