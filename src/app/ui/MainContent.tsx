'use client';
import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import { Delete } from '@geist-ui/icons';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import type { Post as PrismaPost } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface PostWithTags extends Omit<PrismaPost, 'tags'> {
	tags: string[];
}

const prisma = new PrismaClient();
export const getPosts = async () => {
	const posts = await prisma.post.findMany();
	await prisma.$disconnect();
	return posts;
};

const MainContent = () => {
	const { user } = useUser();
	const [postTags, setPostTags] = useState<PostWithTags[]>([]);
	const router = useRouter();

	const fetchPosts = async () => {
		const response = await fetch('/api/posts');
		const posts: PrismaPost[] = await response.json();
		const formattedPosts = posts.map((post) => ({
			...post,
			tags: post.tags.split(','),
		}));
		setPostTags(formattedPosts);
	};

	useEffect(() => {
		fetchPosts();
	}, []);
	const deletePost = async (id: number) => {
		try {
			const response = await fetch('/api/delete-posts', {
				method: 'DELETE',
				body: JSON.stringify({ id: id }),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!response.ok) {
				throw new Error('Post cant be deleted successfully');
			}
			const data = await response.json();
			console.log('success', data);
		} catch (error) {
			console.log(error, 'Error');
		}
		router.refresh();
	};
	const handleDelete = async (id: number) => {
		try {
			const response = await fetch('/api/toggle-delete', {
				method: 'PUT',
				body: JSON.stringify({ id: id }),
			});
			if (!response.ok) {
				console.log(
					'something went wrong with response while toggle deleting the posts'
				);
			} else {
				console.log('toggled posts successfully');
			}
		} catch (error) {
			console.log('failed to toggle post', error);
		}
	};
	return (
		<div>
			<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-4 mb-2 mt-3 space-x-4 relative w-[100vw]'>
				{postTags.map((post) => (
					<div
						className='border-black bg-slate-900 border-2 text-violet-700 lg:min-h-[500px] text-lg relative'
						key={post.id}>
						<input
							className='w-4 h-4 ml-3 mt-3'
							type='checkbox'
							onClick={() => {
								handleDelete(post.id);
							}}
							name=''
							id=''
						/>

						<h1 className='text-center'>{post.title}</h1>
						<h2 className='text-center'>{post.description}</h2>

						<Image
							className='m-auto mb-[10%] w-[90%]'
							src={post.content}
							alt='image should be here'
							width={500}
							height={300}
						/>
						<div className='flex space-x-3 absolute bottom-0 mb-4 ml-3 '>
							{post.tags.map((tag) => (
								<p key={tag}>{tag}</p>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MainContent;
