import User from "../model/user.js";
import bcrpty from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config()

export async function handlesignin(req, res) {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Already signed up', email });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrpty.hash(password, saltRounds);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { email, id: newUser._id },
            process.env.SECRET_KEY,
            { expiresIn: '7h' } 
        );

        return res.status(201).json({"token": token });
    } catch (error) {
        console.error('Error during user sign up:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
}

export async function handlelogin(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrpty.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign(
            { email, id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: '7h' } // Optional: set token expiration time
        );

        return res.status(200).json({"token": token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
}


export const handleupdateuserinfo=async (req,res)=>{
  const formdata = req.body;
  const user = req.user
  await User.findByIdAndUpdate(user,formdata).then((resp)=>{
    return res.json({task:"completed"})
  }).catch(err=>{
    return res.json({task:"failed"})
 } )

}
