import { FC, memo } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../../redux/hooks';

import styles from './TextDisplay.module.scss';

export const TextDisplay: FC = memo(() => {
	const { text, userInput, errorMap } = useAppSelector((state) => state.typingSlice, shallowEqual);

	return (
		<div className={styles.text}>
			{text.split('').map((char, index) => {
				let className = styles.default;
				// Определение состояния символа
				if (index < userInput.length) {
					if (userInput[index] === char) {
						className = styles.correct;
					} else if (errorMap[index]) {
						className = styles.incorrect;
					} else {
						className = styles.default;
					}
				}

				return (
					<span key={index} className={className}>
						{char}
					</span>
				);
			})}
		</div>
	);
});
