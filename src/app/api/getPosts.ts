// pages/api/createPost.ts
'use server';
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const { title, content, description } = req.body;

		try {
			const post = await prisma.post.create({
				data: {
					title,
					content,
					description,
				},
			});
			res.status(200).json(post);
		} catch (error) {
			res.status(500).json({ error: 'Error creating post' });
		} finally {
			await prisma.$disconnect();
		}
	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}
