import { useEffect, useState } from 'react';
import ExpenseItem from './ExpenseItem/ExpenseItem';
import classes from './Expenses.module.css';

const Expenses = () => {
	const [user, setUser] = useState();

	const fetchData = async () => {
		const response = await fetch('/api/users');
		const data = await response.json();
		setUser(data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<ul className={classes.list}>
				{user?.users[0].expenses.map(item => (
					<ExpenseItem
						key={item.id}
						date={item.date}
						title={item.title}
						amount={item.amount}
						type={item.type}
					/>
				))}
			</ul>
		</>
	);
};

export default Expenses;
