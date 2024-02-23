import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface createSliceType {
	id: number;
	name: string;
	age: number;
	img: string;
	checked: boolean;
}

const initialState: { data: createSliceType[] } = {
	data: [],
};

interface editSliceType {
	id: number;
	updates: Partial<createSliceType>;
}

const todoSlice = createSlice({
	name: "todoList",
	initialState,
	reducers: {
		addTodo: (state, action) => {
			const newData = {
				id: Math.random(),
				name: action.payload.name,
				age: action.payload.age,
				img: action.payload.img,
				checked: false,
			};
			state.data.push(newData);
		},
		deleteTodo: (state, action) => {
			state.data = state.data.filter((item) => item.id !== action.payload);
		},
		deleteAll: (state) => {
			state.data = state.data = [];
		},
		saveTodo: (state, action: PayloadAction<editSliceType>) => {
			const { id, updates } = action.payload;
			const index = state.data.findIndex((item) => item.id === id);
			if (index !== -1) {
				state.data[index] = { ...state.data[index], ...updates };
			}
			console.log(action.payload);
		},
		completedTodo: (state, action) => {
			state.data = state.data.map((item) => {
				if (item.id === action.payload.id) {
					return { ...item, checked: !item.checked };
				}
				return item;
			});
      console.log(action.payload.id);
      
		},
	},
});

export const { addTodo, deleteTodo, deleteAll, saveTodo, completedTodo } =
	todoSlice.actions;
export const todoReducer = todoSlice.reducer;
