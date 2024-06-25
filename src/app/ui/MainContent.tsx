import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';
import { ChangeEvent } from 'react';

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
	// const filterPosts = (value: string) => {
	// 	posts.filter((post) => post.tags === value);
	// };
	return (
		<>
			{}
			<div>
				{/* <input
					type='text'
					name='input-text'
					value={inputValue}
					onChange={handleInput}
					onSubmit={filterPosts(inputValue)}
				/> */}
				<div className='grid grid-cols-2'>
					{postTags.map((post) => {
						return (
							<div
								className='border-black border-2 text-violet-700'
								key={post.id}>
								<h1>{post.title}</h1>
								<h2>{post.description}</h2>
								<Image
									src={post.content}
									alt='image should be here'
									width={500}
									height={300}
								/>
								{post.tags.map((tag) => {
									return (
										<p
											// onClick={() => {
											// 	setInputValue;
											// }}
											key={post.id}>
											{tag}
										</p>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default MainContent;
