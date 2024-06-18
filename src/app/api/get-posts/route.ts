import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import type { NextApiResponse, NextApiRequest } from 'next';
import { uploadFile } from '../../../../middleware';
import router from '../../../../middleware';

const prisma = new PrismaClient();

router.post(
	async (
		req: NextApiRequest & { file?: Express.Multer.File },
		res: NextApiResponse
	) => {
		const pathCloudinary =
			'https://api.cloudinary.com/v1_1/dibep0qk1/image/upload';

		try {
			const { title, description } = req.body;
			console.log(title, description);

			const file = req.file;
			if (!file) {
				throw new Error('No file uploaded');
			}

			const formDataCloudinary = new FormData();
			formDataCloudinary.append(
				'file',
				new Blob([file.buffer], { type: file.mimetype }),
				file.originalname
			);
			formDataCloudinary.append('upload_preset', 'z0wei8ze');

			const uploadResponse = await fetch(pathCloudinary, {
				method: 'POST',
				body: formDataCloudinary,
			});

			if (!uploadResponse.ok) {
				throw new Error(
					`Failed to upload file to Cloudinary: ${uploadResponse.statusText}`
				);
			}

			const uploadResult = await uploadResponse.json();

			const result = await prisma.post.create({
				data: {
					title,
					description,
					content: uploadResult.secure_url,
				},
			});

			await prisma.$disconnect();

			return NextResponse.json({ result });
		} catch (error: any) {
			console.error(error);
			await prisma.$disconnect();
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
	}
);
export default router.handler({
	onError: (err: any, req, res) => {
		console.error(err.stack);
		res.status(err.statusCode || 500).end(err.message);
	},
});
