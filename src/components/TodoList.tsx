import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, deleteAll } from "../redux/tools/todoSlice";
import { Button, TextField } from "@mui/material";
import TodoItem from "./TodoItem";
import scss from "./TodoList.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoList = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [img, setImg] = useState("");

	const handleAdd = () => {
		if (name === "" || age === "" || img === "") {
			toast.error("Please write a something");
		} else {
			dispatch(
				addTodo({
					name,
					age,
					img,
					chacked: false,
				})
			);
			setName("");
			setAge("");
			setImg("");
			toast.success("Successfully");
		}
	};
	// console.log(todo);

	const handleDeleteTodoAll = () => {
		dispatch(deleteAll());
	};

	return (
		<div className={scss.todoList}>
			<div className={scss.inputs}>
				<TextField
					id="outlined-basic"
					label="name"
					variant="outlined"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<TextField
					id="outlined-basic"
					label="age"
					variant="outlined"
					value={age}
					onChange={(e) => setAge(e.target.value)}
				/>
				<TextField
					id="outlined-basic"
					label="img"
					variant="outlined"
					value={img}
					onChange={(e) => setImg(e.target.value)}
				/>
				<Button variant="contained" onClick={handleAdd}>
					Add
				</Button>
				<Button variant="contained" onClick={handleDeleteTodoAll}>
					Delete All
				</Button>
				<ToastContainer />
			</div>
			<TodoItem />
		</div>
	);
};

export default TodoList;
