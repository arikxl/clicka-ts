import { Link } from 'react-router'
import { useState } from 'react'

import Button from './btns/Button';
import HamburgerBtn from './btns/HamburgerBtn';
import { useAuth } from '../context/AuthContext';



const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { user, loginWithGoogle, logOut } = useAuth();
    // console.log(user?.user_metadata)

    const name = user?.user_metadata?.name;
    const picture = user?.user_metadata?.picture;

    const handleLogOut = () => {
        if (window.confirm('Do you want to logOut?')) logOut();
    }



    return (
        <header className='fixed top-0 w-full z-40 bg-[rgb(24,27,32)] border-b border-[rgb(84,90,106)] shadow-lg backdrop-blur-lg'>
            <div className='max-w-7xl mx-auto px-4'>
                <div className='flex justify-between items-center h-16'>
                    <Link to={'/'} className='logo'>
                        Clic<span>k</span>a.
                    </Link>


                    {/* DESKTOP NAVBAR */}
                    <nav className='hidden md:flex items-center space-x-8'>
                        <Link className='text-gray-300 hover:underline hover:text-white transition-all duration-300' to={'/create'}>Post</Link>
                        <Link className='text-gray-300 hover:underline hover:text-white transition-all duration-300' to={'/groups'}>Groups</Link>
                        <Link className='text-gray-300 hover:underline hover:text-white transition-all duration-300' to={'/group/build'}>Build</Link>
                    </nav>



                    {/* AUTH */}
                    <div className='flex items-center'>
                        {
                            user
                                ? (
                                    <div className='flex items-center gap-2.5'>
                                        <p>
                                            {name}
                                        </p>
                                        <img alt={name} src={picture}
                                            className='rounded-full w-10 cursor-pointer'
                                            onClick={handleLogOut}
                                        />
                                    </div>
                                )
                                : (
                                    <Button onClick={loginWithGoogle}>
                                        Login
                                    </Button>
                                )
                        }
                    </div>


                    <div className='md:hidden'>
                        <HamburgerBtn isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                    </div>

                </div>
            </div>

            {/* MOBILE */}
            {isMenuOpen &&
                (
                <div className='md:hidden bg-[rgb(24,27,32)]'>
                        <nav className='p-2.5'>
                            <Link onClick={() => setIsMenuOpen(false)} to='/'
                                className='block p-3 rounded-[10px] text-base font-bold text-gray-300 hover:text-white hover:bg-gray-600' >
                                Home
                            </Link>
                            <Link onClick={() => setIsMenuOpen(false)} to='/create'
                                className='block p-3 rounded-[10px] text-base font-bold text-gray-300 hover:text-white hover:bg-gray-600' >
                                Post
                            </Link>
                            <Link onClick={() => setIsMenuOpen(false)} to='/group/create'
                                className='block p-3 rounded-[10px] text-base font-bold text-gray-300 hover:text-white hover:bg-gray-600' >
                                Build
                            </Link>
                            <Link onClick={() => setIsMenuOpen(false)} to='/groups'
                                className='block p-3 rounded-[10px] text-base font-bold text-gray-300 hover:text-white hover:bg-gray-600' >
                                Groups
                            </Link>
                        </nav>
                    </div>
                )
            }


        </header>
    )
}

export default Header


// kxTqIoiY04FdIDCd