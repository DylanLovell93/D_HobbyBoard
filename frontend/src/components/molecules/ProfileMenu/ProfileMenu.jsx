import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import './ProfileMenu.scss';

const ProfileMenu = () => {
    const profile = localStorage.getItem("credentials");
    const handleSignOut = () => {
        localStorage.removeItem("credentials");
    };
    return( 
        <div className='ProfileMenu'>
            { !profile ? ( <>
                <Link to='/signup'>
                    <Typography> Sign Up </Typography>
                </Link>
                <Link to='/signin'>
                    <Typography> Sign In </Typography>
                </Link>
                </> ) : ( <>
                <Link to='/profile'>
                    <Typography> My Profile </Typography>
                </Link>
                <Link to='/profile/editProfile'>
                    <Typography> Edit Profile </Typography>
                </Link>
                <Link to='/' onClick={handleSignOut}>
                    <Typography> Sign Out </Typography>
                </Link>
                </> )
            }
        </div>
    )
}

export default ProfileMenu;