import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, res: NextResponse) {
	try {
		await prisma.post.deleteMany({
			where: {
				isDeleted: true,
			},
		});
		await prisma.$disconnect();
		return NextResponse.json({ status: 200 });
	} catch (error) {
		await prisma.$disconnect();
		return NextResponse.json({ status: 500 });
	}
}
