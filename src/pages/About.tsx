import Test from '@/components/Test';

const About = () => {
	return (
		<>
			<p className='text-[#a27caf]'>
				(this page has error boundary around its route)
			</p>
			<h2>About page</h2>
			<Test />
		</>
	);
};

export default About;
