import { Request, Response } from 'express';
import { Propiedad } from '../models/propiedad.model';

class PropiedadController {
  static addPropiedad = async (req: Request, res: Response): Promise<any | Response> => {
    try {

    } catch (error) {
      const e = error as Error;
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  static updatePropiedad = async (req: Request, res: Response): Promise<any | Response> => {
    try {

    } catch (error) {
      const e = error as Error;
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  static deletePropiedad = async (req: Request, res: Response): Promise<any | Response> => {
    try {

    } catch (error) {
      const e = error as Error;
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  static getPropiedades = async (req: Request, res: Response): Promise<any | Response> => {
    try {

    } catch (error) {
      const e = error as Error;
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  static getPropiedad = async (req: Request, res: Response): Promise<any | Response> => {
    try {

    } catch (error) {
      const e = error as Error;
      return res.status(500).json({ success: false, error: e.message });
    }
  }

}