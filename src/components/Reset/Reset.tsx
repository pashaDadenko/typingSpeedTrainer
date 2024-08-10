import { RotateCcw } from 'lucide-react';
import { useAppDispatch } from '../../redux/hooks';
import { resetGame } from '../../redux/typingSlice';
import { FC, memo, useCallback, useState } from 'react';

import styles from './Reset.module.scss';

export const Reset: FC = memo(() => {
	const dispatch = useAppDispatch();
	const [isAnimating, setIsAnimating] = useState(false);
	// Обработка клика по кнопке сброса с анимацией вращения
	const handleRotateClick = useCallback(() => {
		setIsAnimating(true);
		const timer = setTimeout(() => {
			setIsAnimating(false);
			dispatch(resetGame());
		}, 300);

		return () => clearTimeout(timer);
	}, [dispatch]);

	return <RotateCcw onClick={handleRotateClick} className={`${styles.RotateCcw} ${isAnimating ? styles.rotate : ''}`} />;
});
