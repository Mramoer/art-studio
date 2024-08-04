'use client';
import Image from 'next/image';
import { Delete, Plus, Search, LogIn, LogOut, Trash2 } from '@geist-ui/icons';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { usePostContext } from '../context/context';

const Footer = () => {
	const router = useRouter();
	const { user } = useUser();
	const [filter, setFilter] = useState('');
	const { postTags, setPostTags } = usePostContext();
	const [origPosts, setOrigPosts] = useState(postTags);
	const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};
	useEffect(() => {
		// Обновляем исходные посты при изменении postTags
		setOrigPosts(postTags);
	}, [postTags]);
	const filterPosts = useCallback(
		(filteredData: string) => {
			const filteredPosts = postTags.filter((post) => {
				return post.tags
					.toString()
					.toLowerCase()
					.replaceAll(',', '')
					.includes(filteredData);
			});

			console.log(filteredPosts);
			setPostTags(filteredPosts);
		},
		[postTags, setPostTags]
	);
	// useEffect(() => {
	// // 	filterPosts(filter);
	// // }, [filter, postTags, filterPosts]);
	const eraseInput = () => {
		setPostTags(origPosts);
	};
	const deletePosts = async () => {
		try {
			const response = await fetch('/api/delete-posts', { method: 'DELETE' });
			if (!response.ok) {
				console.log(
					'something went wrong with response while deleting the posts'
				);
			} else {
				('deleted successfully');
			}
		} catch (error) {
			console.log('failed to delete posts', error);
		}
		router.refresh();
	};

	return (
		<div className='bg-black text-white h-14 w-full flex items-center relative  md:text-sm'>
			<div className='lg:w-[10%] xsm:w-[8%] flex justify-center'>
				<Image
					className='w-[90%] 	xsm:hidden md:block'
					alt='logo'
					src='/polya.png'
					width={500}
					height={1000}
				/>
				<Image
					className='xsm:block md:hidden h-[70%] w-[70%]'
					alt='logo'
					src='/mini-polya.jpg'
					width={50}
					height={100}
				/>
			</div>

			<form className='flex items-center w-[50%] md:w-[30%]'>
				<input
					className='text-black xsm:w-[80%] active:border-none outline-none pl-2'
					type='text'
					value={filter}
					onChange={inputHandler}
					placeholder='Введите тег...'
				/>
				<button
					className='float-right'
					onClick={(e) => {
						e.preventDefault();
						filterPosts(filter);
					}}>
					<Search />
				</button>
				<button
					onClick={() => eraseInput()}
					className='ml-2'>
					<Delete />
				</button>
			</form>
			{!user && (
				<Link
					href={'/api/auth/login'}
					className='ml-4'>
					<LogIn />
				</Link>
			)}
			{user && (
				<Link
					className='lg:ml-10 ml-4 '
					href={'api/auth/logout'}>
					<LogOut className='md:hidden' />
					<p className='xsm:hidden md:block text-lg'>Logout</p>
				</Link>
			)}
			{/* user?.name === 'Mramoer' */}
			{user && (
				<Link
					href={'/add-post'}
					className='ml-1 lg:ml-5'>
					<Plus />
				</Link>
			)}
			<Image
				alt='avatar'
				height={50}
				width={50}
				className='rounded-[50%] float-right md:h-12 md:w-12 absolute md:top-2 lg:top-1 right-1 xsm:h-10 xsm:w-10'
				src={
					user?.picture ||
					'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg'
				}
			/>

			{user && (
				<button
					className='absolute right-[16%] md:right-[10%] xsm:text-xs data-[]:'
					onClick={() => {
						deletePosts();
					}}>
					<Trash2 className='md:hidden' />
					<p className='xsm:hidden md:block text-lg'>Delete</p>
				</button>
			)}
		</div>
	);
};

export default Footer;
