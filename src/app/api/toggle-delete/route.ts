import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
	try {
		const { id } = await req.json();
		const post = await prisma.post.findUnique({
			where: { id: Number(id) },
			select: { isDeleted: true },
		});

		if (!post) {
			throw new Error('Post now found');
		}
		const newIsDeleted: boolean = !post.isDeleted;

		await prisma.post.update({
			data: {
				isDeleted: newIsDeleted,
			},
			where: {
				id: Number(id),
			},
		});
		await prisma.$disconnect();
		return NextResponse.json({ status: 200 });
	} catch (error) {
		await prisma.$disconnect();
		return NextResponse.json({ status: 500 });
	}
}
