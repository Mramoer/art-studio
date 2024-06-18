import multer from 'multer';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { Request, Response } from 'express';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = createRouter<NextApiRequest, NextApiResponse>();

// Адаптер для преобразования типов NextApiRequest в Request из express
const adaptNextRequest = (req: NextApiRequest): Request => {
	const adaptedReq = req as Partial<Request>;
	adaptedReq.get = req.getHeader as any;
	adaptedReq.header = req.headers;
	adaptedReq.accepts = () => req.headers.accept as any;
	// Добавьте остальные свойства, если это необходимо
	return adaptedReq as Request;
};

// Middleware для обработки загрузки файла
router.use((req, res, next) => {
	upload.single('file')(adaptNextRequest(req), res as any, (err: any) => {
		if (err instanceof multer.MulterError) {
			return res.status(400).json({ error: err.message });
		} else if (err) {
			return res.status(500).json({ error: err.message });
		}
		next();
	});
});

export default router;
