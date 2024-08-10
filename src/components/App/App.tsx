import { FC } from 'react';
import { TypingTrainer } from '../TypingTrainer/TypingTrainer';

import styles from './App.module.scss';

export const App: FC = () => (
	<div className={styles.app}>
		<TypingTrainer />
	</div>
);
