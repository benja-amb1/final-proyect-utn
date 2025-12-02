import { Router } from 'express';
import { PropiedadController } from '../controllers/propiedad.controller';
import upload from '../middlewares/upload.middleware';
import AuthMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.post('/', AuthMiddleware, upload.single('image'), PropiedadController.addPropiedad);
router.patch('/:id', AuthMiddleware, upload.single('image'), PropiedadController.updatePropiedad);
router.delete('/:id', AuthMiddleware, PropiedadController.deletePropiedad);
router.get('/', PropiedadController.getPropiedades);
router.get('/:id', PropiedadController.getPropiedad);

export default router;
