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

	const validateName = (value) => {
		const trimmedValue = value.trim();
		// Проверяем, что значение состоит только из букв и пробелов и начинается с заглавной буквы
		return /^[A-Za-zА-Яа-яЁё\s]+$/.test(trimmedValue) && trimmedValue[0] === trimmedValue[0].toUpperCase();
	};

	const validateAge = (value) => {
		const age = parseInt(value, 10);
		// Проверяем, что значение состоит только из цифр и находится в пределах от 1 до 150
		return /^\d+$/.test(value) && !isNaN(age) && age >= 1 && age <= 150;
	};

	const validatePhone = (value) => /^\d{9,16}$/.test(value.trim());

	const validateEmail = (value) => {
		const trimmedValue = value.trim();
		return /^[a-z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(trimmedValue);
	};

	const renderInput = (name, placeholder, type = "text", validation) => (
		<input
			type={type}
			placeholder={placeholder}
			{...register(name, {
				required: true,
				validate: validation,
				onChange: (e) => {
					e.target.value = e.target.value.trim();
				},
				onBlur: (e) => {
					e.target.value = e.target.value.trim();
				},
			})}
			style={{
				border: errors[name] ? "1px solid red" : "",
			}}
		/>
	);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h2>Отправьте данные</h2>
			{renderInput("name", "Имя", "text", validateName)}
			{renderInput("surname", "Фамилия", "text", validateName)}
			{renderInput("age", "Возраст", "text", validateAge)}
			{renderInput("phone", "Номер", "tel", validatePhone)}
			{renderInput("email", "Почта", "text", validateEmail)}
			<button type="submit">Отправить</button>
		</form>
	);
}

export default Form;
