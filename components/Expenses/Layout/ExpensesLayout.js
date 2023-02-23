import Expenses from '../Expenses/Expenses';
import ExpensesHeader from '../Header/ExpensesHeader';
import classes from './ExpensesLayout.module.css';

const ExpensesLayout = () => {

	return (
		<div className={classes.layout}>
			<ExpensesHeader />
			<Expenses />
		</div>
	);
};

export default ExpensesLayout;
