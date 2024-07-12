import { Response } from "express";
import User from "../models/userModel";

// get user by ID
export const getUserByID = async (id: string, res: Response) => {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found"})
        res.status(200).json({
            success: true,
            data: user
    });
}
