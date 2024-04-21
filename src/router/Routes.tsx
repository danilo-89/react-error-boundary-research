import { Routes as ReactRoutes, Route } from 'react-router-dom';

// Layouts
import Layout from '@/layouts/Layout';

// Components
import NoMatch from '@/pages/NoMatch';
import Home from '@/pages/Home';
import About from '@/pages/About';
import RouteErrorBoundary from '@/components/errorHandling/RouteErrorBoundary';

const Routes = () => {
	return (
		<>
			<ReactRoutes>
				<Route path='/' element={<Layout />}>
					{/* HOME */}
					<Route index element={<Home />} />

					{/* ABOUT */}
					{/* Route with Error Boundary */}
					<Route
						path='/about'
						element={
							<RouteErrorBoundary>
								<About />
							</RouteErrorBoundary>
						}
					/>

					{/* 404 */}
					<Route path='*' element={<NoMatch />} />
				</Route>
			</ReactRoutes>
		</>
	);
};

export default Routes;
