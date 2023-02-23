import Image from 'next/image';
import Link from 'next/link';
import classes from './404.module.css';

const NotFound = () => {
	return (
		<div className={classes.wrapper}>
			<Image
				src='/404.svg'
				width={500}
				height={500}
				className={classes.img}
				alt='error img'
			/>
			<h3 className={classes.text}>
				Something went wrong, we can't locate the path you are looking for
			</h3>
			<Link href='/' className={classes.link}>
				Return Home
			</Link>
		</div>
	);
};

export default NotFound;
