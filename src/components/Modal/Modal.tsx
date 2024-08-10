import { FC, memo } from 'react';
import { CircleX } from 'lucide-react';
import { resetGame, toggleModal } from '../../redux/typingSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import styles from './Modal.module.scss';

export const Modal: FC = memo(() => {
	const dispatch = useAppDispatch();
	const { userInput, errors, startTime, endTime } = useAppSelector((state) => state.typingSlice);

	// Вычисление слов в минуту
	const calculateWPM = () => {
		if (startTime && endTime) {
			const timeInMinutes = (endTime - startTime) / 60000;
			return Math.round(userInput.split(' ').length / timeInMinutes);
		}
		return 0;
	};

	// Закрытие модального окна и сброс состояния
	const handleModalClose = () => {
		dispatch(toggleModal(false));
		dispatch(resetGame());
	};

	return (
		<div className={styles.modalOverlay} onClick={handleModalClose}>
			<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
				<h1 className={styles.title}>Your result</h1>
				<div className={styles.stats}>
					<p>Errors: {errors}</p>
					<p>WPM: {calculateWPM()}</p>
				</div>
				<button className={styles.closeButton} onClick={handleModalClose}>
					<CircleX />
				</button>
			</div>
		</div>
	);
});
