import { z } from "zod";

const PropiedadValidator = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres."),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres."),
  category: z.enum(["Casa", "Departamento"], "La categoría debe ser 'Casa' o 'Departamento'."),
  listingType: z.enum(["Venta", "Alquiler"], "El tipo de publicación debe ser 'Venta' o 'Alquiler'."),
  price: z.number().positive("El precio debe ser un número positivo."),
  baths: z.number().min(1, "Debe tener al menos 1 baño."),
  rooms: z.number().min(1, "Debe tener al menos 1 habitación."),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres."),
  area: z.number().positive("El área debe ser un número positivo."),
  image: z.string().optional()
});

export const ValidatorOfPropiedad = PropiedadValidator
export const ValidatorOfPropiedadPartial = PropiedadValidator.partial();