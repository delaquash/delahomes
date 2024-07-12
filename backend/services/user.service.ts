import { Response } from "express";
import User from "../models/userModel";

// get user by ID
/**
 * The function `getUserByID` retrieves a user by their ID and returns the user data if found, or a
 * "User not found" message if not found.
 * @param {string} id - The `id` parameter is a string representing the unique identifier of a user
 * that you want to retrieve from the database.
 * @param {Response} res - The `res` parameter in the `getUserByID` function is typically used to send
 * the HTTP response back to the client. It is an instance of the `Response` object, which is provided
 * by the Express.js framework in Node.js. This object allows you to send various HTTP responses such
 * as status
 * @returns If the user is not found, a response with status code 404 and a JSON object containing the
 * message "User not found" is being returned. If the user is found, a response with status code 201
 * and a JSON object containing the success status and user data is being returned.
 */
export const getUserByID = async (id: string, res: Response) => {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found"})
        res.status(201).json({
            success: true,
            data: user
    });
}
