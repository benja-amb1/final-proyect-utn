import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { RegisterUser } from '../validators/user.validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

class UserController {
  static register = async (req: Request, res: Response): Promise<any | Request> => {
    try {
      const { email, password } = req.body;
      const validator = RegisterUser.safeParse({ email, password });

      if (!email || !password) {
        return res.status(400).json({ success: false, error: "Todos los campos son obligatorios." });
      }

      const existingEmail = await User.findOne({ email });

      if (existingEmail) {
        return res.status(404).json({ success: false, message: "El email ingresado ya se encuentra registrado." });
      }

      if (!validator.success) {
        return res.status(400).json({ success: false, errors: validator.error.flatten().fieldErrors });
      }

      const hash = await bcrypt.hash(password, 10);

      const user = new User({
        email: validator.data.email,
        password: hash
      });

      await user.save();

      return res.status(201).json({ success: true, message: "Usuario registrado correctamente." });
    } catch (error) {
      const e = error as Error;
      return res.status(500).json({ success: false, error: e.message });
    }
  };

  static login = async (req: Request, res: Response): Promise<any | Request> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ success: false, error: "Todos los campos son obligatorios." });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ success: false, error: "No autorizado" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ success: false, error: "No autorizado" });
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        partitioned: true
      });

      return res.status(200).json({ success: true, message: "Login exitoso." });

    } catch (error) {
      const e = error as Error;
      return res.status(500).json({ success: false, error: e.message });
    }
  };

  static logout = async (req: Request, res: Response): Promise<any | Request> => {
    try {
      const token = req.cookies;

      if (!token) {
        return res.status(400).json({ success: false, error: "Token no proporcionado." });
      }

      res.clearCookie('token');

      return res.status(200).json({ success: true, message: 'Logout exitoso.' })

    } catch (error) {
      const e = error as Error;
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  static getSession = async (req: Request, res: Response): Promise<any | Response> => {
    try {
      const { token } = req.cookies;
      const user = req.user;

      if (!token) {
        return res.status(400).json({ success: false, error: "Token no proporcionado." });
      }

      if (!user) {
        return res.status(401).json({ success: false, error: "No hay usuario proporcionado." });
      }

      return res.status(200).json({ success: true, message: 'El usuario tiene sesión', data: user })


    } catch (error) {
      const e = error as Error;
      return res.status(500).json({ success: false, error: e.message });
    }
  }
}

export { UserController };
