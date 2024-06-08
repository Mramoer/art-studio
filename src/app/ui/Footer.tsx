'use client';
import Image from 'next/image';
import { Search } from '@geist-ui/icons';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const Footer = () => {
	const { user, error, isLoading } = useUser();
	return (
		<div className='bg-black text-white h-14 w-full flex items-center'>
			<Image
				alt='logo'
				src='/logo.png'
				width='50'
				height='50'
			/>

			<form
				action=''
				className='flex items-center w-[50%] md:w-[30%]'>
				<label htmlFor=''></label>
				<input
					type='text'
					className='w-[100%]'
				/>
				<button className='float-right'>
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
			{user && <Link href={'api/auth/logout'}>Logout</Link>}

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
		</div>
	);
};

export default Footer;
