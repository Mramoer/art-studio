'use client';

import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useCallback,
} from 'react';
import type { Post as PrismaPost } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

interface PostWithTags extends Omit<PrismaPost, 'tags'> {
	tags: string[];
}

interface PostContextProps {
	postTags: PostWithTags[];
	fetchPosts: () => Promise<void>;
	setPostTags: React.Dispatch<React.SetStateAction<PostWithTags[]>>;
}

const PostContext = createContext<PostContextProps | undefined>(undefined);

const prisma = new PrismaClient();
export const getPosts = async () => {
	const postTags = await prisma.post.findMany();
	await prisma.$disconnect();
	return postTags;
};

export const usePostContext = () => {
	const context = useContext(PostContext);
	if (!context) {
		throw new Error('usePostContext must be used within a PostProvider');
	}
	return context;
};

interface PostProviderProps {
	children: ReactNode;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
	const [postTags, setPostTags] = useState<PostWithTags[]>([]);

	const fetchPosts = useCallback(async () => {
		const response = await fetch('/api/posts');
		const postTags: PrismaPost[] = await response.json();
		const formattedPosts = postTags.map((post) => ({
			...post,
			tags: post.tags.split(','),
		}));
		setPostTags(formattedPosts);
	}, []);

	return (
		<PostContext.Provider value={{ postTags, fetchPosts, setPostTags }}>
			{children}
		</PostContext.Provider>
	);
};
