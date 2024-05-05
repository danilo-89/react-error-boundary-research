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
	const [data, setData] = useState<unknown>(['ok']);
	const [mappedData, setMappedData] = useState(['ok']);

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
		<div className='max-w-full w-full flex justify-center'>
			<div className='gap-4 flex flex-col w-[790px] max-w-full'>
				{/* tanstack-query */}
				<section className='border-2 rounded border-gray-500/10 p-4 bg-[#202020]'>
					<h3>tanstack-query</h3>
					<div className='gap-4 flex flex-col md:flex-row'>
						<div className='p-4 bg-[#3a2840] flex-1'>
							<button type='button' onClick={() => mutate()}>
								useMutation with error
							</button>
							<p className='text-[#a27caf]'>Mutation status: {mutateStatus}</p>
						</div>
						<div className='p-4 bg-[#3a2840] flex-1'>
							<button type='button' onClick={() => refetch()}>
								useQuery with error
							</button>
							<p className='text-[#a27caf]'>Query status: {status}</p>
						</div>
					</div>
				</section>

				{/* state */}
				<section className='border-2 rounded border-gray-500/10 p-4 bg-[#202020]'>
					<h3>state</h3>
					<div className='gap-4 flex flex-col md:flex-row'>
						<div className='p-4 bg-[#3a2840] flex-1'>
							<button type='button' onClick={throwError}>
								Cause an error
							</button>
							{/* @ts-expect-error because of testing error */}
							<p className='text-[#a27caf]'>Local data: {data}</p>
						</div>
						<div className='p-4 bg-[#3a2840] flex-1'>
							{/* @ts-expect-error because of testing error */}
							<button type='button' onClick={() => setMappedData(undefined)}>
								Cause an error
							</button>
							<p className='text-[#a27caf]'>
								Local mapped data: {mappedData.map((item) => item)}
							</p>
						</div>
						<div className='p-4 bg-[#3a2840] flex-1'>
							<button type='button' onClick={throwGlobalDataError}>
								Cause an error
							</button>
							{/* @ts-expect-error because of testing error */}
							<p className='text-[#a27caf]'>Global data: {globalData}</p>
						</div>
					</div>
				</section>

				{/* axios */}
				<section className='border-2 rounded border-gray-500/10 p-4 bg-[#202020]'>
					<h3>axios</h3>
					<div className='p-4 bg-[#3a2840]'>
						<button type='button' onClick={throwAxiosError}>
							Cause an axios error
						</button>
						<p className='text-[#a27caf]'>Axios</p>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Test;
