import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { UserPayload } from "../interfaces/userpayload.interface";

const AuthMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ success: false, error: "No tienes permiso para realizar esta acción." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: "Token inválido o expirado." });
  }
};

export default AuthMiddleware;
