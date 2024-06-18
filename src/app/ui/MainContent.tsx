import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

export const getPosts = async () => {
	const prisma = new PrismaClient();
	const posts = await prisma.post.findMany();
	await prisma.$disconnect();
	return posts;
};

const MainContent = async () => {
	const posts = await getPosts();
	console.log(posts);
	return (
		<>
			{}
			<div>
				<Link href={'/add-post'}>Создать новый пост</Link>
				<div>
					{posts.map((post) => {
						return (
							<div key={post.id}>
								<h1>{post.title}</h1>
								<h2>{post.description}</h2>
								<Image
									src={post.content}
									alt='image should be here'
									width={500}
									height={300}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default MainContent;
