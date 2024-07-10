'use client';
import Image from 'next/image';
import { Plus, Search } from '@geist-ui/icons';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

const Footer = () => {
	const { user } = useUser();
	const [filter, setFilter] = useState('');
	const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};
	const filterPosts = async (filterData: string) => {
		try {
			if (filterData.indexOf(filterData, 0) === 1) {
			}
			const response = await fetch('/filter-posts', {
				method: 'GET',
			});
			if (!response.ok) {
				throw new Error('failed to filter posts');
			}
			console.log('filtered successfully');
		} catch (error) {
			console.log(error);
		}
	};
	const deletePosts = async () => {
		console.log('button clicked');
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
	};

	return (
		<div className='bg-black text-white h-14 w-full flex items-center relative'>
			<Image
				alt='logo'
				src='/logo.png'
				width='50'
				height='50'
			/>

			<form
				action=''
				className='flex items-center w-[50%] md:w-[30%]'>
				<input
					className='text-black'
					type='text'
					value={filter}
					onChange={inputHandler}
				/>
				<button
					className='float-right'
					onClick={(e) => {
						e.preventDefault();
						filterPosts(filter);
					}}>
					<Search />
				</button>
			</form>
			{!user && (
				<Link
					href={'/api/auth/login'}
					className='ml-4'>
					Login
				</Link>
			)}
			{user && (
				<Link
					className='lg:ml-10'
					href={'api/auth/logout'}>
					Logout
				</Link>
			)}

			{user?.name === 'Mramoer' ? (
				<Link
					href={'/add-post'}
					className='ml-3 lg:ml-5'>
					<Plus />
				</Link>
			) : (
				''
			)}
			<Image
				alt='avatar'
				height={50}
				width={50}
				className='rounded-[50%] float-right h-12 absolute top-1 right-1'
				src={
					user?.picture ||
					'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg'
				}
			/>
			<button
				className='absolute right-[10%]'
				onClick={() => {
					deletePosts();
				}}>
				Delete
			</button>
		</div>
	);
};

export default Footer;
