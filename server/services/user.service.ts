import userModel from "../models/usermodel";
import { NextFunction, Request, Response } from "express";
import { redis } from "../utils/redis";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";

// export const getUserById = async (id: string, res: Response) => {
//   const user = await userModel.findById(id);
//   res.status(201).json({
//     success: true,
//     user,
//   });
// };

// get user by id
export const getUserById = async (id: string, res: Response) => {
  const userJson = await redis.get(id);
  if (userJson) {
    const user = JSON.parse(userJson);
    res.status(201).json({ success: true, user });
  }
};

// Get All user
export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 });
  res.status(201).json({
    success: true,
    users,
  });
};

//update user role
export const updateUserRoleService = async (
  res: Response,
  id: string,
  role: string
) => {
  const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });

  res.status(201).json({
    success: true,
    user,
  });
};