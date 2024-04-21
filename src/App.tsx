import './App.css';
import { useState, type ErrorInfo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
	MutationCache,
	QueryCache,
	QueryClient,
	QueryClientProvider,
	useQueryErrorResetBoundary,
} from 'react-query';

// Context
import { DataProvider } from '@/context/GlobalDataContext';

// Routes
import Routes from '@/router/Routes';

// Components
import { AxiosErrorHandler, ErrorFallback } from '@/components/errorHandling';

const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error) => {
			console.log('query error logged from queryClient', error);
		},
	}),
	mutationCache: new MutationCache({
		onError: (error) => {
			console.log('mutation error logged from queryClient', error);
		},
	}),

	defaultOptions: {
		mutations: {
			useErrorBoundary: true,
		},
		queries: {
			useErrorBoundary: true,
		},
	},
});

const logError = (error: Error, info: ErrorInfo) => {
	console.log('log error');
	console.log(error);
	console.log(info);

	console.table(['ErrorBoundary log', error, info]);
};

function App() {
	const { reset } = useQueryErrorResetBoundary();
	const [globalData, setGlobalData] = useState(['global data', ' ', 'ok']);

	const handleReset = () => {
		// Custom logic to reset all query errors
		reset();
		queryClient.resetQueries({
			predicate: (query) => {
				console.log({ query });
				// refetch only errored queries
				return query.state.status === 'error';
			},
		});
	};

	return (
		<ErrorBoundary
			onReset={handleReset}
			FallbackComponent={ErrorFallback}
			onError={logError}
		>
			<QueryClientProvider client={queryClient}>
				<AxiosErrorHandler>
					<DataProvider globalData={globalData} setGlobalData={setGlobalData}>
						<Routes />
					</DataProvider>
				</AxiosErrorHandler>
			</QueryClientProvider>
		</ErrorBoundary>
	);
}

export default App;
