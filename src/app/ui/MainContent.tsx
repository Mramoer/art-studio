import { useUser } from '@auth0/nextjs-auth0/client';
import PictureForm from './PictureForm';
import { GetServerSideProps } from 'next';
import { PrismaClient, Post } from '@prisma/client';
import Image from 'next/image';

interface MainContentProps {
	posts: Post[];
}
const prisma = new PrismaClient();
export const getServerSideProps: GetServerSideProps = async () => {
	const posts = await prisma.post.findMany();
	return {
		props: { posts: posts ?? [] },
	};
};

const MainContent: React.FC<MainContentProps> = ({ posts }) => {
	const mymass = [
		{
			id: '1faaww13',
		},
	];
	const { user } = useUser();
	console.log(posts);
	return (
		<>
			<div>{user?.name === 'Mramoer' && <PictureForm />}</div>
			<div>
				{posts.map((post) => {
					return (
						<div key={post.id}>
							<h1>{post.title}</h1>
							<h2>{post.content}</h2>
							<p>{post.description}</p>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default MainContent;
