import Test from '@/components/Test';

const About = () => {
	return (
		<div>
			<p className='text-gray-400'>
				(this page has error boundary around its route)
			</p>
			<h2>About page</h2>
			<Test />
		</div>
	);
};

export default About;
