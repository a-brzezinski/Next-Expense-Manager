import Image from 'next/image';
import Link from 'next/link';
import classes from './StartingPage.module.css';

const StartingPage = () => {
	return (
		<>
			<div className={classes.wrapper}>
				<Image src='/savemoney.svg' width={350} height={350} alt='piggy bank' />
				<p>
					<span>Do you need to manage your expenses ? </span>
					Our application will help you achieve your goal, manage your expenses
					conveniently and pleasantly.
				</p>
				<Link href='/register' className={classes.link}>
					Join Us
				</Link>
			</div>
		</>
	);
};

export default StartingPage;
