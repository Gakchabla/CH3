/* eslint-disable no-unused-vars */
const models = require("../models");

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const browseWithPicture = (req, res) => {
  models.user
    .findAllWithPicture()
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  const { id } = req.params;

  models.user
    .find(id)
    .then(([results]) => {
      if (results[0]) res.send(results[0]);
      else res.sendStatus(404);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const user = req.body;
  models.user
    .insert(user)
    .then(([result]) => {
      res.send(result);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const addLike = (req, res) => {
  const { userId, likedId } = req.body;
  models.user
    .insertLike(userId, likedId)
    .then(([result]) => {
      res.send(result);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const addLikeAndNext = (req, res, next) => {
  const { userId, likedId } = req.body;
  models.user
    .insertLike(userId, likedId)
    .then(next())
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const browseLike = (req, res) => {
  models.user
    .readLikes()
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const addAndNext = (req, res, next) => {
  const user = req.body;
  models.user
    .insert(user)
    .then(([result]) => {
      req.body.userId = result.insterId;
      next();
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const checkMatch = (req, res) => {
  const { userId, likedId } = req.body;

  models.user
    .checkLikes(likedId, userId)
    .then(([results]) => {
      if (results[0]) res.send(results[0]);
      else res.sendStatus(404);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const alreadyLiked = (req, res) => {
  const { userId } = req.params;

  models.user
    .userWithLikeFromId(userId)
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const getMatches = async (req, res) => {
  const { id } = req.params;

  // je récupère tous les users liké par le user connecté

  const likes = await models.user.userLikes(id).catch((error) => {
    console.error(error);
    res.sendStatus(500);
  });

  // je récupère tous les users qui ont liké le user connecté

  const likedBy = await models.user.userIsLiked(id).catch((error) => {
    console.error(error);
    res.sendStatus(500);
  });

  // je compare les deux tableau pour ne gardé que ceux qui correspondent au deux

  const comparedData = likes[0].filter((like) =>
    likedBy[0].some((liked) => liked.user_id === like.user_liked_id)
  );

  // je fait un tableau avec les ids des users qui ont matché le user connecté
  const idsArray = comparedData.map((data) => data.user_liked_id);

  // je récupère tous les users qui ont matché en les recherchant par leurs ids dans un tableau ( select * from user where id in...)

  const userMatched = await models.user
    .selectMultipleUsers(idsArray)
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const changeUserBio = (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  models.user
    .changeUserDescription(id, description)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const deletePicture = await models.picture.deleteUserPicture(id);
  const deleteLikes = await models.user.deleteUserLikes(id);
  const deleteUser = await models.user
    .delete(id)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.sendStatus(204);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  add,
  browse,
  browseLike,
  read,
  addAndNext,
  browseWithPicture,
  addLike,
  addLikeAndNext,
  checkMatch,
  alreadyLiked,
  getMatches,
  changeUserBio,
  destroy,
};
