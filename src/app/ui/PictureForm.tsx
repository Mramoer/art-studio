import Image from 'next/image';
import { useState, ChangeEvent, FormEvent, FormEventHandler } from 'react';

const PictureForm = () => {
	const [getFile, setGetFile] = useState<string | null>(null);
	const [getName, setGetName] = useState<string>('');
	const [getDescription, setGetDescription] = useState<string>('');

	const handleDescription = (e: ChangeEvent<HTMLInputElement>) => {
		setGetDescription(e.target.value);
	};
	const handleName = (e: ChangeEvent<HTMLInputElement>) => {
		setGetName(e.target.value);
	};
	const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const fileUrl = URL.createObjectURL(file);
			setGetFile(fileUrl);
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (getFile && getName && getDescription) {
			const newPost = {
				title: getName,
				content: getFile,
				description: getDescription,
			};

			const response = await fetch('/api/getPosts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newPost),
			});
			if (response.ok) {
			} else {
				console.log('Error occured while creating posts');
			}
		} else {
			console.log('Заполните все поля');
		}
	};

	return (
		<div>
			<form
				action='submit'
				onSubmit={handleSubmit}>
				<p>
					<label htmlFor='name'>Название:</label>
					<input
						value={getName}
						onChange={handleName}
						type='text'
					/>
				</p>
				<p>
					<label htmlFor='descripiton'>Описание:</label>
					<input
						value={getDescription}
						onChange={handleDescription}
						type='text'
					/>
				</p>
				<p>
					<label htmlFor='file'>Выбрать файл:</label>
					<input
						onChange={handleFile}
						type='file'
					/>
				</p>
				<button type='button'>Опубликовать</button>
			</form>
		</div>
	);
};
export default PictureForm;
