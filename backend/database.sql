DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `description` VARCHAR(300) NULL,
  `city` VARCHAR(100) NOT NULL,
  `birthdate` DATETIME NOT NULL,
  `hashedPassword` VARCHAR(500) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `mydb`.`picture`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `picture` ;

CREATE TABLE IF NOT EXISTS `picture` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `picture_url` VARCHAR(200) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_picture_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `hackatinder`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mydb`.`user_has_liked`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_has_liked` ;

CREATE TABLE IF NOT EXISTS `user_has_liked` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `user_liked_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_has_liked_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `hackatinder`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_liked_user2`
    FOREIGN KEY (`user_liked_id`)
    REFERENCES `hackatinder`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mydb`.`message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `message` ;

CREATE TABLE IF NOT EXISTS `message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `message_text` VARCHAR(300) NOT NULL,
  `sender_id` INT NOT NULL,
  `receiver_id` INT NOT NULL,
  `sending_time` DATETIME NOT NULL,
  PRIMARY KEY (`id`),

  CONSTRAINT `fk_message_user1`
    FOREIGN KEY (`sender_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_message_user2`
    FOREIGN KEY (`receiver_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


    INSERT INTO `hackatinder`.`user`
(`firstname`,
`lastname`,
`description`,
`city`,
`birthdate`,
`hashedPassword`,
`email`)
VALUES
("Vincent",
"Chabosson",
"",
"Lyon",
"1990-12-23",
"$argon2id$v=19$m=65536,t=5,p=1$bPcVwcvokK3nSJZ5K4jf5g$I259KRRGCtmnhfMe3jGC0flZp2A9P3GYWJj+n/lNqx0",
"chabosson@live.fr"), ("Daryl",
"Chaise",
"",
"Lyon",
"1995-08-22",
"$argon2id$v=19$m=65536,t=5,p=1$wcxvNFCygauDW1WAUAjybA$QvmoPROpIOtIhGZbrPM+Q1z2UtEEWbKFL8Xb1mUBt0Q",
"123123@123.live"), ("Jeff",
"Bezos",
"Viens louer des voitures avec moi!",
"Boston",
"1964-01-11",
"$argon2id$v=19$m=65536,t=5,p=1$DEGhMWbmxZ4HNlqpdfiKbg$NF5fueRiSxu9Bz6CTKpdGCO0IRjQNJ5JrjGnrsA5JW0","Jeff@amazon.aws"),
("Morpheus",
"Capitaine",
"Tu vas la prendre cette pillule bleue ?!",
"Zion",
"1961-07-29",
"$argon2id$v=19$m=65536,t=5,p=1$JjdyBimgSKLrJkBkf8k3fw$hR0SGRsrAGv/NXyXzUHIb6orTjTTWspIkC5H9dQXck8",
"morpheus@live.fr"),
("Jerry",
"Smith",
"Hungry for apples?",
"Oldtown",
"1982-07-29",
	"$argon2id$v=19$m=65536,t=5,p=1$JjdyBimgSKLrJkBkf8k3fw$hR0SGRsrAGv/NXyXzUHIb6orTjTTWspIkC5H9dQXck8",
	"Moprheus@live.fr")
;


INSERT INTO `hackatinder`.`picture`
(`picture_url`,
`user_id`)
VALUES
(
	"https://res.cloudinary.com/dzogtfd21/image/upload/v1675299671/n00hjesvyhu3gmz5vgeg.jpg",
1),(
		"https://res.cloudinary.com/dzogtfd21/image/upload/v1675299692/haao857qrajudxsmmr4j.png",
2),(
		"https://res.cloudinary.com/dzogtfd21/image/upload/v1675330392/kk1uow0pbw1dcwcspymh.jpg",
3),(
		"https://res.cloudinary.com/dzogtfd21/image/upload/v1675330667/h1hvybdumt7apbig05uv.jpg",
4),
(
		"https://res.cloudinary.com/dzogtfd21/image/upload/v1675331067/azhymclppwts353gbjjz.png",
5)
;