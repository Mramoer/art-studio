import { useAuth0 } from '@auth0/auth0-react';
import { useUser } from '@auth0/nextjs-auth0/client';
import PictureForm from './PictureForm';

const MainContent = () => {
	const { user, error, isLoading } = useUser();
	return <div>{user?.name === 'Mramoer' && <PictureForm />}</div>;
};

export default MainContent;
