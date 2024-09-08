import React from 'react';
import { useForm } from 'react-hook-form';

function Form({ onAddUser }) {
	const { register, handleSubmit, formState: { errors }, reset } = useForm({
		mode: "onChange",
		defaultValues: {
			name: "",
			surname: "",
			age: "",
			phone: "",
			email: "",
		},
	});

	const onSubmit = (data) => {
		const formattedData = {
		  ...data,
		  phone: `+${data.phone}`, // Добавляем знак "+" перед номером телефона
		};
		
		onAddUser(formattedData);
		reset();
	 };
	 

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h2>Отправьте данные</h2>
			<input
				type="text"
				placeholder="Имя"
				{...register("name", {
					required: true,
					validate: (value) => {
						const firstLetter = value[0].toUpperCase();
						return firstLetter === value[0] && value.trim() !== "";
					},
					onChange: (e) => {
						if (!e.target.value.trim()) {
							e.target.value = "";
						}
					},
					onBlur: (e) => {
						if (!e.target.value.trim()) {
							e.target.value = "";
						}
					},
				})}
				style={{
					border: errors?.name ? "1px solid red" : "",
				}}
			/>
			<input
				type="text"
				placeholder="Фамилия"
				{...register("surname", {
					required: true,
					validate: (value) => {
						const firstLetter = value[0].toUpperCase();
						return firstLetter === value[0] && value.trim() !== "";
					},
					onChange: (e) => {
						if (!e.target.value.trim()) {
							e.target.value = "";
						}
					},
					onBlur: (e) => {
						if (!e.target.value.trim()) {
							e.target.value = "";
						}
					},
				})}
				style={{
					border: errors?.surname ? "1px solid red" : "",
				}}
			/>
			<input
				type="text"
				placeholder="Возраст"
				{...register("age", {
					required: true,
					min: 1,
					max: 150,
					validate: (value) => {
						const number = Number.parseInt(value, 10);
						return (
							!isNaN(number) &&
							number >= 1 &&
							number <= 150 &&
							/^\d+$/.test(value)
						);
					},
					onChange: (e) => {
						const trimmedValue = e.target.value.trim();
						e.target.value = trimmedValue.replace(/[^\d]/g, "");
					},
					onBlur: (e) => {
						const trimmedValue = e.target.value.trim();
						e.target.value = trimmedValue.replace(/[^\d]/g, "");
					},
				})}
				style={{
					border:
						(errors?.age?.type === "required" ||
							errors?.age?.type === "min" ||
							errors?.age?.type === "max" ||
							(errors?.age?.type === "validate" &&
								!Number.parseInt(errors?.age?.ref?.value, 10))) &&
						"1px solid red",
				}}
			/>
			<input
				type="tel"
				placeholder="Номер"
				{...register("phone", {
					required: true,
					minLength: 9,
					maxLength: 16,
					pattern: /^\d{9,16}$/,
					onChange: (e) => {
						if (!e.target.value.trim()) {
							e.target.value = "";
						}
					},
					onBlur: (e) => {
						if (!e.target.value.trim()) {
							e.target.value = "";
						}
					},
				})}
				style={{
					border: errors?.phone ? "1px solid red" : "",
				}}
			/>
			<input
				type="text"
				placeholder="Почта"
				{...register("email", {
					required: true,
					pattern: /^[a-z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
					validate: (value) => {
						const trimmedValue = value.trim().replace(/\s+/g, "");
						return !trimmedValue.startsWith(trimmedValue[0].toUpperCase());
					},
					onChange: (e) => {
						e.target.value = e.target.value.trim().replace(/\s+/g, "");
					},
					onBlur: (e) => {
						e.target.value = e.target.value.trim().replace(/\s+/g, "");
					},
				})}
				style={{
					border: errors?.email ? "1px solid red" : "",
				}}
			/>
			<button type="submit">Отправить</button>
		</form>
	);
}

export default Form;
