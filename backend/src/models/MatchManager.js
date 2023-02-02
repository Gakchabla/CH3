const AbstractManager = require("./AbstractManager");

class MatchManager extends AbstractManager {
  constructor() {
    super({ table: "user_has_liked" });
  }
}
module.exports = MatchManager;
