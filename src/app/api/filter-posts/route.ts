import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { json } from 'stream/consumers';
const prisma = new PrismaClient();

export async function GET(res: NextResponse, req: NextRequest) {
	if (req.method === 'GET') {
		const { tags } = await req.json();
	}
}
