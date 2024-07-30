import { Response } from "express";
import { redis } from "../utils/redis";
import User from "../models/userModel";

/**
 * The function `getUserByID` retrieves a user by ID from a Redis database and sends a JSON response
 * with the user data if found.
 * @param {string} id - The `id` parameter is a string representing the unique identifier of the user
 * whose information we want to retrieve.
 * @param {Response} res - The `res` parameter in the `getUserByID` function is typically used to send
 * a response back to the client making the request. It is commonly an instance of the `Response`
 * object from a web framework like Express.js. By using `res.status(201).json()`, the function is
 */
export const getUserByID = async (id: string, res: Response) => {
  const userJSON = await redis.get(id);
  if (userJSON) {
    const user = JSON.parse(userJSON);
    res.status(201).json({
      success: true,
      user,
    });
  }
};

export const getAllUserServices = async (res: Response) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.status(201).json({
    success: true,
    users,
  });
};

export const updateUserRoleServices = async (
  res: Response,
  id: string,
  role: string
) => {
  const user = await User.findByIdAndUpdate(
    id,
    { role },
    {
      new: true,
    }
  );
  res.status(201).json({
    success: true,
    user
    });
};
