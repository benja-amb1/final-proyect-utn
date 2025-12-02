import { Request, Response } from 'express';
import { Propiedad } from '../models/propiedad.model';
import { ValidatorOfPropiedad, ValidatorOfPropiedadPartial } from '../validators/propiedad.validator';
import path from 'node:path';
import { FilterQuery, Types } from 'mongoose';
import { PropiedadFilter } from '../interfaces/propiedadfilter.interface';

class PropiedadController {
  static addPropiedad = async (req: Request, res: Response): Promise<any | Response> => {
    try {
      const { title, description, category, listingType, price, baths, rooms, address, area } = req.body;
      const image = req.file?.path;

      if (!title || !description || !category || !listingType || !price || !baths || !rooms || !address || !area) {
        return res.status(400).json({ success: false, error: "Todos los campos son obligatorios" });
      }

      const dataToValidate = {
        title, description, category, listingType, price: Number(price), baths: Number(baths), rooms: Number(rooms), address, area, image
      };

      const validator = ValidatorOfPropiedad.safeParse(dataToValidate);

      if (!validator.success) {
        return res.status(400).json({
          success: false,
          errors: validator.error.flatten().fieldErrors
        });
      }

      const nuevaPropiedad = new Propiedad(validator.data);
      await nuevaPropiedad.save();

      return res.status(201).json({
        success: true,
        message: "Propiedad creada correctamente.",
        data: nuevaPropiedad
      });

    } catch (error) {
      const e = error as Error;
      return res.status(500).json({ success: false, error: e.message });
    }
  };


  static updatePropiedad = async (req: Request, res: Response): Promise<any | Response> => {
    try {
      const { id } = req.params;
      const { title, description, category, listingType, price, baths, rooms, address, area } = req.body;
      const image = req.file?.path;

      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "El ID de la propiedad es inválido." });
      }

      const dataToValidate = {
        title, description, category, listingType, price: Number(price), baths: Number(baths), rooms: Number(rooms), address, area, image
      };

      const validator = ValidatorOfPropiedadPartial.safeParse(dataToValidate);

      if (!validator.success) {
        return res.status(400).json({
          success: false,
          errors: validator.error.flatten().fieldErrors
        });
      }

      const updatedPropiedad = await Propiedad.findByIdAndUpdate(id, validator.data, { new: true });

      if (!updatedPropiedad) {
        return res.status(404).json({ success: false, error: "Propiedad no encontrada." });
      }

      return res.status(200).json({ success: true, message: "Propiedad actualizada correctamente.", data: updatedPropiedad });

    } catch (error) {
      const e = error as Error;
      return res.status(500).json({ success: false, error: e.message });
    }
  };


  static deletePropiedad = async (req: Request, res: Response): Promise<any | Response> => {
    try {
      const { id } = req.params;

      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "El ID de la propiedad es inválido." });
      }

      const propiedad = await Propiedad.findByIdAndDelete(id);

      if (!propiedad) {
        return res.status(404).json({ success: false, error: "Propiedad no encontrada." });
      }

      return res.status(200).json({ success: true, message: 'Propiedad eliminada correctamente.', data: propiedad });

    } catch (error) {
      const e = error as Error;
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  static getPropiedades = async (req: Request, res: Response): Promise<any | Response> => {
    try {
      const { title, category, listingType, baths, rooms, minPrice, maxPrice } = req.query;

      const filter: PropiedadFilter = {};

      if (title) filter.title = new RegExp(String(title), "i");
      if (category) filter.category = new RegExp(String(category), "i");
      if (listingType) filter.listingType = new RegExp(String(listingType), "i");

      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
      }

      if (baths) filter.baths = Number(baths);
      if (rooms) filter.rooms = Number(rooms);

      const propiedades = await Propiedad.find(filter);

      return res.status(200).json({ success: true, data: propiedades });

    } catch (error) {
      const e = error as Error;
      return res.status(500).json({ success: false, error: e.message });
    }
  };


  static getPropiedad = async (req: Request, res: Response): Promise<any | Response> => {
    try {
      const { id } = req.params;

      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "El ID de la propiedad es inválido." });
      }

      const propiedad = await Propiedad.findById(id);

      if (!propiedad) {
        return res.status(404).json({ success: false, error: "Propiedad no encontrada." });
      }

      return res.status(200).json({ success: true, data: propiedad });

    } catch (error) {
      const e = error as Error;
      return res.status(500).json({ success: false, error: e.message });
    }
  }

}

export { PropiedadController }