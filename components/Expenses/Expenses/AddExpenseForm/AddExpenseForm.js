import { useRef, useState } from 'react';
import classes from './AddExpenseForm.module.css';

const AddExpenseForm = props => {
	const titleInputRef = useRef();
	const amountInputRef = useRef();
	const selectRef = useRef();

	const formClose = () => {
		props.closeForm();
	};

	const formSubmitHandler = async e => {
		e.preventDefault();
		const expense = {
			title: titleInputRef.current.value,
			amount: amountInputRef.current.value,
			type: selectRef.current.value,
			id: Date.now(),
			date: new Date().toLocaleDateString(),
		};

		try {
			const response = await fetch('/api/addexpense', {
				method: 'PATCH',
				body: JSON.stringify(expense),
				headers: {
					'Content-type': 'application/json',
				},
			});
		} catch (err) {
			throw new Error(err);
		}

		formClose();
		titleInputRef.current.value = '';
		amountInputRef.current.value = '';
	};

	return props.trigger ? (
		<div className={classes.wrapper}>
			<form className={classes.form} onSubmit={formSubmitHandler}>
				<h3>Add Expense</h3>
				<div className={classes.box}>
					<label>Title</label>
					<input type='text' required ref={titleInputRef}></input>
				</div>
				<div className={classes.box}>
					<label>Amount</label>
					<input type='number' required ref={amountInputRef}></input>
				</div>
				<div>
					<select ref={selectRef} className={classes.select}>
						<option value='income'>Income</option>
						<option value='expense'>Expense</option>
					</select>
				</div>
				<div className={classes.buttons}>
					<button>Add</button>
				</div>
			</form>
			<button className={classes.cancelBtn} onClick={formClose}>
				Cancel
			</button>
		</div>
	) : (
		''
	);
};

export default AddExpenseForm;
