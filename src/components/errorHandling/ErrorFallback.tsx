import { type FallbackProps } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	console.log('ErrorFallback error');
	console.log(error?.message);
	console.log(error?.stack);

	return (
		<div>
			<h2 className='text-red-700'>Error Fallback</h2>
			<p>Error: {error.message}</p>

			<button type='button' onClick={() => resetErrorBoundary()}>
				Reset error boundary
			</button>

			<button type='button' onClick={() => window.location.reload()}>
				Reload page
			</button>
		</div>
	);
}

export default ErrorFallback;
