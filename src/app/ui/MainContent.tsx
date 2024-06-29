import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import { FormEvent } from 'react';

export const getPosts = async () => {
	const prisma = new PrismaClient();
	const posts = await prisma.post.findMany();
	await prisma.$disconnect();
	return posts;
};

const MainContent = async () => {
	const posts = await getPosts();
	const postTags = posts.map((post) => ({
		...post,
		tags: post.tags.split(','),
	}));
	console.log(postTags);
	// const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
	// 	setInputValue(e.target.value);
	// };
	// const filterPosts = (event: FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault();
	// 	const formData = new FormData(event.currentTarget);
	// 	const value = formData.get('searchInput') as string;
	// 	postTags.filter((post) => post.title === value);
	// };
	return (
		<>
			{}
			<div>
				{/*
				TODO:создать фильтрацию постов через сервер
				<div>
					<form action="" onSubmit={filterPosts}>
						<input type="text" name="" id="" />
						<button type="submit">Поиск</button>
					</form>
				</div> */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-4 mb-2 mt-3 space-x-4 relative'>
					{postTags.map((post) => {
						return (
							<div
								className='border-black border-2 text-violet-700 lg:min-h-[500px]'
								key={post.id}>
								<h1 className='text-center'>{post.title}</h1>
								<h2 className='text-center'>{post.description}</h2>
								<Image
									className='m-auto'
									src={post.content}
									alt='image should be here'
									width={500}
									height={300}
								/>
								<div className='flex space-x-3 absolute bottom-0 mb-4 ml-3 '>
									{post.tags.map((tag) => {
										return (
											<p
												// onClick={() => {
												// 	setInputValue;
												// }}
												key={post.title}>
												{tag}
											</p>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default MainContent;
