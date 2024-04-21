import { type ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';

import { ErrorFallback } from '@/components/errorHandling';

const RouteErrorBoundary = ({ children }: { children?: ReactNode }) => {
	// This reset will only reset boundary but it will not automatically clear errors from queries
	const { reset } = useQueryErrorResetBoundary();

	return (
		<ErrorBoundary onReset={reset} fallbackRender={ErrorFallback}>
			{children}
		</ErrorBoundary>
	);
};

export default RouteErrorBoundary;
