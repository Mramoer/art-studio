import Footer from './ui/Footer';
import MainContent from './ui/MainContent';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

export default function Home() {
	return (
		<main className='flex min-h-screen  justify-between'>
			<Footer />
			<MainContent />
		</main>
	);
}
