import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
	try {
		const posts = await prisma.post.findMany();
		await prisma.$disconnect();
		return NextResponse.json(posts, { status: 200 });
	} catch (error: any) {
		console.error('Error:', error.message);
		await prisma.$disconnect();
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
