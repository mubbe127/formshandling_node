import { body, validationResult } from "express-validator";
import usersStorage from "../storages/usersStorage.js";

const usersListGet = (req, res) => {
  res.render("index", {
    title: "User list",
    users: usersStorage.getUsers(),
  });
};
const usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUser", {
    title: "Update user",
    user: user,
  });
};

const usersCreateGet = (req, res) => {
  res.render("createUser", {
    title: "Create user",
  });
};

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body("email")
  .isEmail()
  .withMessage("Must be an email"),
  body("bio")
  .isLength({ max: 200 })
  .withMessage("Max length 200 characters"),
  body("age")
    .isInt({ min: 18, max: 120 })
    .withMessage("Age must be between 18 and 120"),
];
// We can pass an entire array of middleware validations to our controller.
const usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/");
  },
];
const usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.updateUser(req.params.id, { firstName, lastName, email, age, bio });
    res.redirect("/");
  },
];
const usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};

const usersSearchGet = (req, res) => {
    
    console.log(req.query.search)
    console.log("jalla jiep")
    res.render("index", {
        title: "Search list",
        search: usersStorage.getSearch(req.query.search),
      });


}

export {
  usersCreatePost,
  usersListGet,
  usersUpdateGet,
  usersUpdatePost,
  usersCreateGet,
  usersDeletePost,
  usersSearchGet,
};
