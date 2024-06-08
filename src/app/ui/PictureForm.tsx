import Image from 'next/image';
import { useState, ChangeEvent, FormEvent, FormEventHandler } from 'react';

interface Art {
	name: string;
	description: string;
	file: string;
}

const PictureForm = () => {
	const [getFile, setGetFile] = useState<string | null>(null);
	const [getName, setGetName] = useState<string>('');
	const [getDescription, setGetDescription] = useState<string>('');
	const [artGallery, setArtGallery] = useState<Art[]>([]);

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

	const handleSubmit = () => {
		if (getFile) {
			const newArt: Art = {
				name: getName,
				description: getDescription,
				file: getFile,
			};
			setArtGallery([...artGallery, newArt]);
			console.log('Файл не указан');
		}
	};

	return (
		<div>
			<form action='submit'>
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
				<button
					type='button'
					onClick={handleSubmit}>
					Опубликовать
				</button>
			</form>

			{artGallery.map((art: Art, index) => {
				return (
					<div key={index}>
						<h1>{art.name}</h1>
						<p>{art.description}</p>
						<Image
							height={300}
							width={500}
							layout='responsible'
							src={art.file}
							alt='image'
						/>
					</div>
				);
			})}
		</div>
	);
};

export default PictureForm;
