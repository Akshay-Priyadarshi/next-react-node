import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
	value: number
}

const initialCounterState: CounterState = {
	value: 0,
}

const counterSlice = createSlice({
	initialState: initialCounterState,
	name: 'counter',
	reducers: {
		increment: (state) => {
			state.value += 1
		},
		reset: (state) => {
			state.value = 0
		},
		decrement: (state) => {
			state.value -= 1
		},
		incrementByValue: (state, action: PayloadAction<number>) => {
			state.value += action.payload
		},
	},
})

export const { increment, decrement, reset, incrementByValue } =
	counterSlice.actions
export default counterSlice.reducer
