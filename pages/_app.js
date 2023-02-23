import Layout from '@/components/Layout/Layout';
import store from '@/store';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { Provider } from 'react-redux';

function App({ Component, pageProps }) {
	return (
		<SessionProvider>
			<Provider store={store}>
				<Layout>
					<Head>
						<title>Expense Manager</title>
					</Head>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</SessionProvider>
	);
}

export default App;
