import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import type { Post as PrismaPost } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

interface PostWithTags extends Omit<PrismaPost, 'tags'> {
	tags: string[];
}
interface PostContextProps {
	posts: PostWithTags[];
	fetchPosts: () => Promise<void>;
}

const PostContext = createContext<PostContextProps | undefined>(undefined);
const prisma = new PrismaClient();
export const getPosts = async () => {
	const posts = await prisma.post.findMany();
	await prisma.$disconnect();
	return posts;
};

export const usePostContext = () => {
	const context = useContext(PostContext);
	return context;
};
interface PostProviderPosts {
	children: ReactNode;
}

export const PostProvider: React.FC<PostProviderPosts> = ({ children }) => {
	const [postTags, setPostTags] = useState<PostWithTags[]>([]);
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

	return (
		<PostContext.Provider value={{ posts: postTags, fetchPosts }}>
			{children}
		</PostContext.Provider>
	);
};
