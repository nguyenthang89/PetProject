import _ from "lodash";
import express from "express";
import { sequelize } from "../db";
import { bindAuthInfo } from "../auth";
import { UserModel } from "../db/models/user";
import { parsePagination } from "../utilities/middlewares";

export const userRoutes = express.Router();

userRoutes.get('/', parsePagination, (req, resp, next) => {
  UserModel.findAll({ ...req.$pagination, raw: true })
    .then(data => resp.status(200).json(data))
    .catch(next);
});

userRoutes.get('/:id', parsePagination, (req, resp, next) => {
  sequelize.query(
    'SELECT * FROM public.users WHERE userId = $id',
    {
      bind: { id: req.params.id },
      type: QueryTypes.SELECT,
      raw: true 
    }
  )
    .then(data => resp.status(200).json(data))
    .catch(next);
});

userRoutes.post('/', bindAuthInfo, async (req, resp, next) => {
  const { user: authUser } = req.$auth;
  const { userId, email, ...user } = req.body;
  
  try {
    const dbUser = await UserModel.findOne({ where: { email }, raw: true });
    if (dbUser) {
      return resp.status(400).send(`Email [${email}] is registered under another account.`);
    }
  } catch(error) {
    next(error);
  }

  UserModel
    .build({ 
      email, 
      ...user,
      createdBy: authUser,
      updatedBy: authUser
    })
    .save()
    .then(data => resp.status(200).json(data))
    .catch(next);
});

userRoutes.put('/', bindAuthInfo, (req, resp, next) => {
  const { userId, ...user } = req.body;
  const { user: authUser } = req.$auth;
  UserModel
    .update(
      { ...user, updatedBy: authUser},
      { where: { userId } }
    )
    .then(data => resp.status(200).send('Successful'))
    .catch(next);
});

userRoutes.delete('/:id', async (req, resp, next) => {
  try {
    const { id } = req.params;
    const dbUser = await UserModel.findByPk(id);
    if (dbUser) {
      await dbUser.destroy();
      return resp.status(200).send('Successful');
    }
    resp.status(404).send(`User [${id}] is not existed`);
  } catch(error) {
    next(error);
  }
});