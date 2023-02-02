const models = require("../models");

const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const { email, pseudo } = req.body;
  models.user
    .findByEmailWithPassword(email, pseudo)
    .then(([users]) => {
      if (users[0]) {
        [req.users] = users;
        next();
      } else res.sendStatus(401);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};
// A utiliser après VerifyToken
const isUserAllowed = (req, res, next) => {
  const id = req.payloads.sub;

  // eslint-disable-next-line eqeqeq
  if (id == req.params.id) next();
  else res.sendStatus(401);
};

module.exports = {
  getUserByEmailWithPasswordAndPassToNext,
  isUserAllowed,
};
