import { setUserInput } from '../../redux/typingSlice';
import { ChangeEvent, FC, memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import styles from './TextInput.module.scss';

export const TextInput: FC = memo(() => {
	const dispatch = useAppDispatch();
	const { userInput } = useAppSelector((state) => state.typingSlice);

	// Обработка изменений в поле ввода
	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			dispatch(setUserInput(event.target.value));
		},
		[dispatch]
	);

	return <input type='text' value={userInput} onChange={handleChange} className={styles.input} />;
});
