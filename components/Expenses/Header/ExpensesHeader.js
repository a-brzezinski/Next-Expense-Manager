import { useEffect, useState } from 'react';
import AddExpenseForm from '../Expenses/AddExpenseForm/AddExpenseForm';
import classes from './ExpensesHeader.module.css';

const ExpensesHeader = () => {
	const [showForm, setShowForm] = useState(false);
	const [user, getUser] = useState();

	const showFormHandler = e => {
		e.preventDefault();
		setShowForm(true);
	};

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/api/users');
			const data = await response.json();

			getUser(data);
		};

		fetchData();
	}, []);

	const allOperations = user?.users[0].expenses;

	const allIncomes = allOperations?.filter(item => item.type === 'income');
	const allExpenses = allOperations?.filter(item => item.type === 'expense');

	const initialIncomes = [0, 0];
	const initialExpenses = [0, 0];

	const incomes = allIncomes?.map(item => item.amount);
	const expenses = allExpenses?.map(item => item.amount);

	const incomesArray = incomes?.concat(initialIncomes);
	const expensesArray = expenses?.concat(initialExpenses);

	const incomesSum = incomesArray?.reduce((a, b) => {
		return +a + +b;
	});
	const expensesSum = expensesArray?.reduce((a, b) => {
		return +a + +b;
	});

	const totalBalance = incomesSum - expensesSum;

	return (
		<>
			<div className={classes.wrapper}>
				<div>
					<button onClick={showFormHandler} className={classes.button}>
						Add transaction
					</button>
					<h3 className={classes.balance}>
						Total money: <span>{totalBalance} EUR</span>
					</h3>
				</div>
			</div>
			<AddExpenseForm trigger={showForm} closeForm={setShowForm} />
		</>
	);
};

export default ExpensesHeader;
