'use client';
import Image from 'next/image';
import Footer from './ui/Footer';
import MainContent from './ui/MainContent';

export default function Home() {
	return (
		<main className='flex min-h-screen  justify-between'>
			<Footer />
			<MainContent />
		</main>
	);
}
