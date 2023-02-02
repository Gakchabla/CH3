const models = require("../models");

const addAtRegistration = (req, res) => {
  req.body.userId = req.params.userId;
  const photo = req.body;
  models.picture
    .insert(photo)
    .then(([result]) => {
      res.location(`/user/${result.insertId}`).sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const browse = (req, res) => {
  models.picture
    .findAll()
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const browseByUser = (req, res) => {
  const { id } = req.params;
  models.picture
    .findAllByUser(id)
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const changeUserPicture = (req, res) => {
  const { userId } = req.params;
  const { url } = req.body;
  models.picture
    .changeUserPictureUrl(userId, url)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = { addAtRegistration, browse, browseByUser, changeUserPicture };
