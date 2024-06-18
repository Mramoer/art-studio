'use client';
import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const PictureForm = () => {
	const { user } = useUser();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setDescription(e.target.value);
	};

	const handleName = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const selectedFile = fileInputRef.current?.files?.[0];
		if (!selectedFile) {
			console.error('No file selected');
			return;
		}

		const formData = new FormData();
		console.log(title);
		console.log(description);
		console.log(selectedFile);
		formData.append('file', selectedFile);
		formData.set('title', title);
		formData.set('description', description);

		for (let pair of formData.entries()) {
			console.log(pair[0] + ', ' + pair[1]);
		}
		console.log(formData);
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
