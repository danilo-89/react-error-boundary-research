import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';

// Context
import { useGlobalData } from '@/context/GlobalDataContext';

// Lib
import axios from '@/lib/axios';

const doSomethingAsync = async (type: string) => {
	try {
		await new Promise((res) => setTimeout(res, 1000));
		const response = await fetch('bad_route', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({}),
		});

		return await response.json();
	} catch (error) {
		throw new Error(`${type} error`);
	}
};

const Test = () => {
	// global (context) data
	const { globalData, setGlobalData } = useGlobalData();
	// local (component) data
	const [data, setData] = useState<unknown>(['data', ' ', 'ok']);

	// tanstack-query query
	const { mutate, status: mutateStatus } = useMutation({
		mutationKey: ['test-error-mutation'],
		mutationFn: () => doSomethingAsync('useMutation'),
		retry: 0,
	});
	// tanstack-query mutation
	const { refetch, status } = useQuery({
		queryKey: ['test-error-query'],
		queryFn: () => doSomethingAsync('useQuery'),
		enabled: false,
		retry: 0,
	});

	const throwError = () => {
		setData({});
	};

	const throwGlobalDataError = () => {
		setGlobalData({});
	};

	const throwAxiosError = () => {
		axios.get('http://bad_route');
	};

	return (
		<div>
			<div className='gap-4 flex flex-col w-[540px]'>
				<h3>tanstack-query</h3>
				<div className='gap-4 flex'>
					<div className='p-4 bg-[#3a2840] flex-1'>
						<button type='button' onClick={() => mutate()}>
							useMutation with error
						</button>
						<p>Mutation status: {mutateStatus}</p>
					</div>
					<div className='p-4 bg-[#3a2840] flex-1'>
						<button type='button' onClick={() => refetch()}>
							useQuery with error
						</button>
						<p>Query status: {status}</p>
					</div>
				</div>

				<h3>state</h3>
				<div className='gap-4 flex'>
					<div className='p-4 bg-[#3a2840] flex-1'>
						<button type='button' onClick={throwError}>
							Throw error
						</button>
						{/* @ts-expect-error because of testing error */}
						<p>Local data: {data}</p>
					</div>
					<div className='p-4 bg-[#3a2840] flex-1'>
						<button type='button' onClick={throwGlobalDataError}>
							Throw error
						</button>
						{/* @ts-expect-error because of testing error */}
						<p>Global data: {globalData}</p>
					</div>
				</div>

				<h3>axios</h3>
				<div className='p-4 bg-[#3a2840]'>
					<button type='button' onClick={throwAxiosError}>
						Throw axios error
					</button>
					<p>Axios</p>
				</div>
			</div>
		</div>
	);
};

export default Test;
