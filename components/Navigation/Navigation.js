import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import classes from './Navigation.module.css';

const Navigation = () => {
	const { data: session } = useSession();

	const logoutHandler = () => {
		signOut();
	};

	const logoutButton = (
		<li>
			{session && (
				<button className={classes.link} onClick={logoutHandler}>
					Logout
				</button>
			)}
		</li>
	);
	const profileButton = (
		<li>
			{session && (
				<Link href='/profile/expenses' className={classes.link}>
					Profile
				</Link>
			)}
		</li>
	);

	return (
		<header className={classes.header}>
			<Link href='/' className={classes.heading}>
				Expense Manager
			</Link>
			<nav>
				<ul>
					{!session && (
						<li>
							<Link href='/register' className={classes.link}>
								Register
							</Link>
						</li>
					)}
					{!session && (
						<li>
							<Link href='/login' className={classes.link}>
								Login
							</Link>
						</li>
					)}
					{profileButton}
					{logoutButton}
				</ul>
			</nav>
		</header>
	);
};

export default Navigation;
