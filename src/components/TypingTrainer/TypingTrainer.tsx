import { Modal } from '../Modal/Modal';
import { Reset } from '../Reset/Reset';
import { FC, memo, useEffect } from 'react';
import { TextDisplay } from '../Text/TextDisplay';
import { TextInput } from '../TextInput/TextInput';
import { endTyping, startTyping } from '../../redux/typingSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import styles from './TypingTrainer.module.scss';

export const TypingTrainer: FC = memo(() => {
	const dispatch = useAppDispatch();
	const { text, userInput, startTime } = useAppSelector((state) => state.typingSlice);

	useEffect(() => {
		if (startTime === null && userInput.length > 0) dispatch(startTyping()); // Запуск таймера при первом вводе текста, если таймер еще не запущен
		if (userInput.length === text.length) dispatch(endTyping()); // Завершение набора текста и открытие модального окна при завершении ввода текста
	}, [userInput, text, startTime, dispatch]);

	return (
		<div className={styles.container}>
			<TextDisplay />
			<TextInput />
			<Reset />
			<Modal />
		</div>
	);
});
