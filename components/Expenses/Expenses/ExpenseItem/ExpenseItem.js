import classes from './ExpenseItem.module.css';

const ExpenseItem = (props) => {
  const expenseType = props.type
  let style
  if(expenseType === 'income'){
    style = 'income'
  } else{
    style = 'expense'
  }
	return (
		<li className={classes.item}>
			<div>
				<p className={classes.date}>{props.date}</p>
				<p className={classes.title}>{props.title}</p>
			</div>
			<p className={classes[style]}>{props.amount} EUR</p>
		</li>
	);
};

export default ExpenseItem;
