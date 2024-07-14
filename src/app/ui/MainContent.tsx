'use client';
import Image from 'next/image';
import { usePostContext } from '../context/context';
import type { Post as PrismaPost } from '@prisma/client';
import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

const MainContent = () => {
	const { user } = useUser();
	const { postTags, fetchPosts } = usePostContext();
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
	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);
	return (
		<div>
			<div className='grid grid-cols-3 mb-2 mt-3 relative w-[100vw]'>
				{postTags.map((post) => (
					<div
						className='border-black w-[95%] bg-slate-900 border-2 text-violet-700 lg:min-h-[500px] xsm:m-auto xsm:my-2 m-0 rounded-md lg:text-lg xsm:text-sm relative'
						key={post.id}>
						{user && (
							<input
								className='w-4 h-4 ml-3 mt-3'
								type='checkbox'
								onClick={() => {
									handleDelete(post.id);
								}}
								name=''
								id=''
							/>
						)}

						<h1 className='text-center'>{post.title}</h1>
						<h2 className='text-center'>{post.description}</h2>

						<Image
							className='m-auto mb-[10%] w-[90%]'
							src={post.content}
							alt='image should be here'
							width={500}
							height={300}
						/>
						<div className='flex space-x-3 absolute bottom-0 lg:mb-4 xsm:mb-1 ml-3 '>
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
