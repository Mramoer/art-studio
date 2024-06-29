import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import type { NextApiResponse, NextApiRequest } from 'next';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
	const pathCloudinary =
		'https://api.cloudinary.com/v1_1/dibep0qk1/image/upload';
	try {
		const data = await req.formData();
		const file: File | null = data.get('file') as unknown as File;
		const description: string | undefined = data.get(
			'description'
		) as unknown as string;
		const title: string | undefined = data.get('title') as unknown as string;
		const tags: string | undefined = data.get('tags') as unknown as string;

		console.log(title, description, file, tags);
		if (!file) {
			throw new Error('No file uploaded');
		}
		const fileBytes = await file.arrayBuffer();
		const blob = new Blob([fileBytes], { type: file.type });

		console.log('Received:', { title, description, file, tags });

		if (!file) {
			throw new Error('No file uploaded');
		}

		const formDataCloudinary = new FormData();
		formDataCloudinary.append('file', blob, file.name);
		formDataCloudinary.append('upload_preset', 'sxph9iev');

		const uploadResponse = await fetch(pathCloudinary, {
			method: 'POST',
			body: formDataCloudinary,
		});

		if (!uploadResponse.ok) {
			const uploadErrorText = await uploadResponse.text();
			throw new Error(
				`Failed to upload file to Cloudinary: ${uploadErrorText}`
			);
		}

		const uploadResult = await uploadResponse.json();

		const result = await prisma.post.create({
			data: {
				title,
				description,
				content: uploadResult.secure_url,
				tags: tags,
			},
		});

		await prisma.$disconnect();

		return NextResponse.json({ result });
	} catch (error: any) {
		console.error('Error:', error.message);
		await prisma.$disconnect();
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};
