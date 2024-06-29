'use client';
import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import type { Tag } from '../../../node_modules/react-tag-input/types/components/SingleTag.d.ts';
import { useUser } from '@auth0/nextjs-auth0/client';

import Link from 'next/link';
import { ArrowLeft } from '@geist-ui/icons';

const PictureForm = () => {
	const { user } = useUser();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [tags, setTags] = React.useState<Tag[]>([]);

	const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setDescription(e.target.value);
	};

	const handleName = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const handleAddition = (tag: Tag) => {
		setTags([...tags, tag]);
	};

	const handleDelete = (i: number) => {
		setTags(tags.filter((tag, index) => index !== i));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const selectedFile = fileInputRef.current?.files?.[0];
		if (!selectedFile) {
			console.error('No file selected');
			return;
		}

		const formData = new FormData();
		const stringTags = tags.map((tag) => {
			return tag.text;
		});
		formData.set('file', selectedFile);
		formData.set('title', title);
		formData.set('description', description);
		formData.set('tags', stringTags.join());
		console.log(stringTags);

		try {
			const response = await fetch('/api/get-posts', {
				method: 'POST',
				body: formData,
			});
			if (!response.ok) {
				throw new Error('Failed to submit form data');
			}

			console.log('Form submitted successfully');
		} catch (error: any) {
			console.error('Error submitting form:', error.message);
		}

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	return (
		<>
			<div className='w-full bg-black h-10'>
				<Link href='/'>
					<ArrowLeft
						size={40}
						className='ml-1'
						color='white'
					/>
				</Link>
			</div>
			<div className='absolute m-5 top-[25%] min-h-[35%] lg:left-[25%] border-solid border-black border lg:w-[50%] rounded-md'>
				{user?.name === 'Mramoer' ? (
					<form
						onSubmit={handleSubmit}
						className='flex flex-col space-y-4 p-2'>
						<p>
							<label htmlFor='name'>Название:</label>
							<input
								className='border border-black ml-3'
								value={title}
								onChange={handleName}
								type='text'
							/>
						</p>
						<p>
							<label htmlFor='description'>Описание:</label>
							<textarea
								className='border border-black ml-3'
								value={description}
								onChange={handleDescription}
							/>
						</p>
						<p>
							<label htmlFor='file'>Выбрать файл:</label>
							<input
								className='hover:cursor-pointer'
								name='file'
								ref={fileInputRef}
								type='file'
							/>
						</p>
						<ReactTags
							placeholder='Введите новый тег'
							name='reactTag'
							tags={tags}
							handleDelete={handleDelete}
							handleAddition={handleAddition}
							inputFieldPosition='inline'
							autocomplete
						/>
						<button
							type='submit'
							className='hover:bg-gray-400 p-2 ease-in transition-colors rounded-md box-border m-auto '>
							Опубликовать
						</button>
					</form>
				) : (
					<>
						<h1>У вас нет прав администратора для этого</h1>
						<Link href={'/'}>Вернуться</Link>
					</>
				)}
			</div>
		</>
	);
};

export default PictureForm;
