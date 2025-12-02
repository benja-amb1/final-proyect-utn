import { Request, Response } from "express";
import transporter from "../utils/emailconfig";
import { createTemplate } from "../templates/createtemplate";


const emailService = async (req: Request, res: Response) => {
  try {
    const { subject, mail, message } = req.body;

    if (!subject || !mail || !message) {
      return res.status(400).json({ success: false, error: 'Todos los campos son obligatorios.' })
    }

    const info = await transporter.sendMail({
      from: "Ascacibar Propiedades <no-reply@ascacibarpropiedades.com>",
      to: process.env.EMAIL_USER,
      subject: subject,
      html: createTemplate(subject, mail, message)
    });

    res.json({ success: true, message: 'Correo enviado correctamente.', info })
  } catch (e) {
    const error = e as Error
    res.status(500).json({ success: false, error: error.message })
  }
}

export { emailService }