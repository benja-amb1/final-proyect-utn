import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (__: Request, res: Response) => {
  res.json({ status: true })
})

app.use((__, res) => {
  res.status(400).json({ success: false, error: "El recurso no se encuentra." })
})

app.listen(PORT, () => {
  console.log(`✅ Conectado al puerto: ${PORT}`);
})