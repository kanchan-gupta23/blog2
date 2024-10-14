import logo from '../logo.png';
import { NavLink } from 'react-router-dom';
import { useAuth } from './auth';

function Navbar() {
  const { isLoggedIn } = useAuth();

  return (
    <div className='bg-slate-900 w-screen h-[9vh] flex justify-between items-center'>
      <img src={logo} alt="Logo" className='w-[9vw]' />
      <div className='flex justify-evenly w-[50%] items-center text-extrabold text-white'>
        <NavLink to='/' className={({ isActive }) => isActive ? 'text-blue-500 underline  decoration-1 underline-blue-500' : 'hover:text-blue-500'}>
          <h1>Home</h1>
        </NavLink>
        <NavLink to='/about' className={({ isActive }) => isActive ? 'text-blue-500 underline  decoration-1 underline-blue-500' : 'hover:text-blue-500'}>
          <h1>About</h1>
        </NavLink>
        <NavLink to='/contact' className={({ isActive }) => isActive ? 'text-blue-500 underline  decoration-1 underline-blue-500' : 'hover:text-blue-500'}>
          <h1>Contact</h1>
        </NavLink>
        {isLoggedIn ? (
          <NavLink to='/logout' className={({ isActive }) => isActive ? 'text-blue-500  underline  decoration-1 underline-blue-500' : 'hover:text-blue-500'}>
            <h1>Logout</h1>
          </NavLink>
        ) : (
          <>
            <NavLink to='/registration' className={({ isActive }) => isActive ? 'text-blue-500 underline  decoration-1 underline-blue-500' : 'hover:text-blue-500'}>
              <h1>Registration</h1>
            </NavLink>
            <NavLink to='/login' className={({ isActive }) => isActive ? 'text-blue-500 underline  decoration-1 underline-blue-500' : 'hover:text-blue-500'}>
              <h1>Login</h1>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
