import { v4 as uuidv4 } from 'uuid';

interface Art {
	id: string;
	likes: number;
}

class ArtGallery {
	url: string;
	constructor(url: string) {
		this.url = url;
	}
	art: Art = {
		id: uuidv4(),
		likes: 0,
	};
	artArray: Art[] = [];
	addArt() {
		this.artArray.push(this.art);
	}
}

const artGallery: Art[] = [];

export default Art;
