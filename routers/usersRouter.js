import { Router } from "express";
import {usersCreatePost, usersListGet, usersUpdateGet, usersUpdatePost, usersCreateGet, usersDeletePost, usersSearchGet} from "../controllers/userController.js"


const usersRouter = Router()
usersRouter.get("/", usersListGet)
usersRouter.get("/create", usersCreateGet)
usersRouter.get("/:id/update", usersUpdateGet);
usersRouter.post("/create", usersCreatePost)
usersRouter.post("/:id/update", usersUpdatePost);
usersRouter.post('/:id/delete', usersDeletePost)
usersRouter.get('/search', usersSearchGet)


export {usersRouter}
