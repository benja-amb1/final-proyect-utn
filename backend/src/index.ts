import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan';
import dotenv from 'dotenv'
import { connect } from './db/connect';
import logger from './utils/logger';
import cookieParser from 'cookie-parser'
import { UserPayload } from './interfaces/userpayload.interface';
import UserRoutes from './routes/user.routes'
import PropiedadRoutes from './routes/propiedades.routes'
import path from 'node:path'
import { emailService } from './services/email.service';
import fs from 'node:fs'

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload
    }
  }
}

const app = express();
const PORT = process.env.PORT

app.use(express.json());

app.use(cors({
  origin: (origin, callback) => {
    callback(null, origin || "*");
  },
  credentials: true
}));

app.use(morgan('dev'));
app.use(logger);
app.use(cookieParser());

const uploadsPath = path.join(__dirname, "../uploads")

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true })
}
app.use("/uploads", express.static(uploadsPath))


app.use('/auth', UserRoutes);
app.use('/propiedades', PropiedadRoutes);
app.post('/email/send', emailService)

app.get('/', (__: Request, res: Response) => {
  res.json({ status: true })
})

app.use((__, res) => {
  res.status(400).json({ success: false, error: "El recurso no se encuentra." })
})

app.listen(PORT, () => {
  console.log(`✅ Conectado al puerto: ${PORT}`);
  connect();
})