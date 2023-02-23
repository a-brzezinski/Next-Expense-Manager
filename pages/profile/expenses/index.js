import ExpensesLayout from "@/components/Expenses/Layout/ExpensesLayout";
import { getSession, useSession } from "next-auth/react";

function ExpensesPage() {
	return <ExpensesLayout/>;
}

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });
	// console.log(session.user);

	// console.log(data);

	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	return {
		props: { session },
	};
}

export default ExpensesPage