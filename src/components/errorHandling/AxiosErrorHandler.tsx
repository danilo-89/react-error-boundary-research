import { type ReactNode, useEffect } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

import axios from '@/lib/axios';

const AxiosErrorHandler = ({ children }: { children: ReactNode }) => {
	const { showBoundary } = useErrorBoundary();

	useEffect(() => {
		// Request interceptor
		const requestInterceptor = axios.interceptors.request.use((request) => {
			return request;
		});

		// Response interceptor
		const responseInterceptor = axios.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
				console.log(error);
				if (error.response?.status) {
					switch (error.response.status) {
						case 401:
							// Handle Unauthenticated here
							break;
						case 403:
							// Handle Unauthorized here
							break;
						// ...
					}
				}

				showBoundary(error);
				return error;
			}
		);

		return () => {
			// Remove handlers
			axios.interceptors.request.eject(requestInterceptor);
			axios.interceptors.response.eject(responseInterceptor);
		};
	}, [showBoundary]);

	return children;
};

export default AxiosErrorHandler;
