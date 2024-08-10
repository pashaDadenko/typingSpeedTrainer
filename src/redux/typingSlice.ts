import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TypingState = {
	text: string;
	userInput: string;
	errors: number;
	startTime: number | null;
	endTime: number | null;
	errorMap: Record<number, boolean>;
	isModalOpen: boolean;
};

const texts = ['The quick brown fox jumps over the lazy dog', 'To be or not to be, that is the question', 'All that glitters is not gold', 'A stitch in time saves nine', 'Beauty is in the eye of the beholder'];
const getRandomText = () => texts[Math.floor(Math.random() * texts.length)];

const typingSlice = createSlice({
	name: 'typing',

	initialState: <TypingState>{
		text: getRandomText(),
		userInput: '',
		errors: 0,
		startTime: null,
		endTime: null,
		errorMap: {},
		isModalOpen: false,
	},

	reducers: {
		// Обновление ввода пользователя и отслеживание ошибок
		setUserInput: (state, action: PayloadAction<string>) => {
			state.userInput = action.payload;
			const newErrorMap: Record<number, boolean> = { ...state.errorMap };
			const userChars = action.payload.split('');

			for (let i = 0; i < state.text.length; i++) {
				if (userChars[i] === state.text[i]) {
					if (newErrorMap[i]) {
						delete newErrorMap[i];
					}
				} else if (userChars[i] !== undefined && userChars[i] !== state.text[i]) {
					newErrorMap[i] = true;
				}
			}

			state.errorMap = newErrorMap;
			state.errors = Object.keys(newErrorMap).length;
		},
		// Установка времени начала набора текста
		startTyping: (state) => {
			state.startTime = Date.now();
		},
		// Установка времени окончания набора текста и открытие модального окна
		endTyping: (state) => {
			state.endTime = Date.now();
			state.isModalOpen = true;
		},
		// Сброс состояния
		resetGame: (state) => {
			state.text = getRandomText();
			state.userInput = '';
			state.errors = 0;
			state.startTime = null;
			state.endTime = null;
			state.errorMap = {};
			state.isModalOpen = false;
		},
		// Переключение видимости модального окна
		toggleModal: (state, action: PayloadAction<boolean>) => {
			state.isModalOpen = action.payload;
		},
	},
});

export const { setUserInput, startTyping, endTyping, resetGame, toggleModal } = typingSlice.actions;
export default typingSlice.reducer;
