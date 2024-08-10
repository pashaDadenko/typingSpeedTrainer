import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { createRoot } from 'react-dom/client';
import { App } from './components/App/App.tsx';

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<StrictMode>
			<App />
		</StrictMode>
	</Provider>
);
