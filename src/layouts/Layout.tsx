import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
	return (
		<>
			<nav className='absolute top-0 left-0 w-full p-5 bg-[#1a1a1a]'>
				<Link to='/'>Home</Link> | <Link to='/about'>About</Link>
			</nav>
			<div className='pt-12'>
				<Outlet />
			</div>
		</>
	);
}
