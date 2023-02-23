import { hashPassword } from '@/helpers/hashpassword';
import { uiActions } from '@/store/ui-slice';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Button from '../UI/Button';
import classes from './Form.module.css';

const Form = props => {
	const nameInputRef = useRef();
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const dispatch = useDispatch();

	const router = useRouter();

	const validPassword = useSelector(state => state.ui.validPassword);
	const existingUser = useSelector(state => state.ui.validEmail);

	const formSubmitHandler = async e => {
		e.preventDefault();

		const password = passwordInputRef.current.value;

		if (password.length < 8) {
			dispatch(uiActions.isValid('password'));
			return;
		} else {
			dispatch(uiActions.isValid('valid'));
		}

		const hashedPassword = await hashPassword(password);

		if (props.register) {
			const user = {
				name: nameInputRef.current.value,
				email: emailInputRef.current.value,
				password: hashedPassword,
			};

			const request = await fetch('/api/register', {
				method: 'POST',
				body: JSON.stringify(user),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!request.ok) {
				dispatch(uiActions.isValid('email'));
				return
			} else {
				dispatch(uiActions.isValid('validEmail'))
				router.replace('/');
			}
		} else {
			const result = await signIn('credentials', {
				redirect: false,
				email: emailInputRef.current.value,
				password: passwordInputRef.current.value,
			});

			if (!result.error) {
				router.push('/profile/expenses');
			}
		}
		if (props.register) {
			nameInputRef.current.value = '';
			emailInputRef.current.value = '';
			passwordInputRef.current.value = '';
		} else {
			passwordInputRef.current.value = '';
			emailInputRef.current.value = '';
		}
	};

	return (
		<div className={classes.wrapper}>
			<form className={classes.form} onSubmit={formSubmitHandler}>
				<h3>{props.title}</h3>
				{props.register && (
					<input required placeholder='Name' ref={nameInputRef} />
				)}

				<input required placeholder='Email' type='email' ref={emailInputRef} />
				<input
					required
					placeholder='Password'
					type='password'
					ref={passwordInputRef}
				/>
				{!validPassword && (
					<p>Password must contain eight or more characters</p>
				)}
				{!existingUser && <p>User is already exists</p>}

				<div className={classes.button}>
					<Button>{props.btnContent}</Button>
				</div>
			</form>
		</div>
	);
};

export default Form;
