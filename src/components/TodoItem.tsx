import { Button, Checkbox, TextField } from "@mui/material";
import { appUseSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { completedTodo, deleteTodo, saveTodo } from "../redux/tools/todoSlice";
import { useState } from "react";
import scss from "./TodoItem.module.scss";

const TodoItem = () => {
	const todo = appUseSelector((state) => state.todoReducer.data);
	const dispatch = useDispatch();
	const [edit, setEdit] = useState<number | null>(null);
	const [nameEdit, setNameEdit] = useState("");
	const [ageEdit, setAgeEdit] = useState(0);
	const [imgEdit, setImgEdit] = useState("");
	const [_, setCheckbox] = useState(false);

	const handleDeleteTodo = (id: number) => {
		dispatch(deleteTodo(id));
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleEditTodo = (item: any) => {
		setNameEdit(item.name);
		setAgeEdit(item.age);
		setImgEdit(item.img);
		setEdit(item.id);
	};

	const handleSaveTodo = () => {
		if (edit !== null && nameEdit && ageEdit && imgEdit) {
			dispatch(
				saveTodo({
					id: edit,
					updates: {
						name: nameEdit,
						age: ageEdit,
						img: imgEdit,
						checked: false,
					},
				})
			);
			setEdit(null);
		}
	};

	const handleCancelTodo = () => {
		setEdit(null);
	};

	const handleCompletedTodo = (id: number) => {
		dispatch(completedTodo({ id }));
		setCheckbox((prevState) => !prevState);
	};

	return (
		<div className={scss.todoItem}>
			{todo.map((item) => (
				<div className={scss.inputs} key={item.id}>
					{edit === item.id ? (
						<>
							<TextField
								id="outlined-basic"
								label="name"
								variant="outlined"
								value={nameEdit}
								onChange={(e) => setNameEdit(e.target.value)}
							/>
							<TextField
								id="outlined-basic"
								label="age"
								variant="outlined"
								value={ageEdit}
								onChange={(e) => setAgeEdit(+e.target.value)}
							/>
							<TextField
								id="outlined-basic"
								label="img"
								variant="outlined"
								value={imgEdit}
								onChange={(e) => setImgEdit(e.target.value)}
							/>
							<Button variant="contained" onClick={handleSaveTodo}>
								Save
							</Button>
							<Button variant="contained" onClick={handleCancelTodo}>
								Cancel
							</Button>
						</>
					) : (
						<>
							<h1
								style={{
									textDecoration: item.checked ? "line-through" : "none",
								}}>
								{item.name}
							</h1>
							<p>{item.age}</p>
							<img
								style={{ filter: item.checked ? "grayscale(100%)" : "none" }}
								src={item.img}
								alt={item.name}
							/>
							<Button
								variant="contained"
								onClick={() => handleDeleteTodo(item.id)}>
								Delete
							</Button>
							<Button variant="contained" onClick={() => handleEditTodo(item)}>
								Edit
							</Button>
							<Checkbox
								checked={item.checked}
								onChange={() => handleCompletedTodo(item.id)}
							/>
						</>
					)}
				</div>
			))}
		</div>
	);
};

export default TodoItem;
