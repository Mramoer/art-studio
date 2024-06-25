'use client';
import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import type { Tag } from '../../../node_modules/react-tag-input/types/components/SingleTag.d.ts';
import { useUser } from '@auth0/nextjs-auth0/client';

import Link from 'next/link';

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
		<div>
			{user?.name === 'Mramoer' ? (
				<form onSubmit={handleSubmit}>
					<p>
						<label htmlFor='name'>Название:</label>
						<input
							value={title}
							onChange={handleName}
							type='text'
						/>
					</p>
					<p>
						<label htmlFor='description'>Описание:</label>
						<textarea
							value={description}
							onChange={handleDescription}
						/>
					</p>
					<p>
						<label htmlFor='file'>Выбрать файл:</label>
						<input
							name='file'
							ref={fileInputRef}
							type='file'
						/>
					</p>
					<button type='submit'>Опубликовать</button>
					<ReactTags
						tags={tags}
						handleDelete={handleDelete}
						handleAddition={handleAddition}
						inputFieldPosition='inline'
						autocomplete
					/>
				</form>
			) : (
				<>
					<h1>У вас нет прав администратора для этого</h1>
					<Link href={'/'}>Вернуться</Link>
				</>
			)}
		</div>
	);
};

export default PictureForm;
