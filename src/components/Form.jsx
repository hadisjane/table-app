import React from 'react';
import { useForm } from 'react-hook-form';

function Form({ onAddUser }) {
	const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm({
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
		const isCyrillic = /^[А-ЯЁ][а-яё]+$/.test(trimmedValue);
		const isLatin = /^[A-Z][a-z]+$/.test(trimmedValue);
		// Имя должно быть либо полностью на кириллице, либо полностью на латинице, начинаться с заглавной буквы, а остальные буквы должны быть строчными
		return isCyrillic || isLatin;
	};

	const validateSurname = (value) => {
		const trimmedValue = value.trim();
	 
		// проверяем, что фамилия начинается с заглавной буквы
		if (!/^[А-ЯЁA-Z]/.test(trimmedValue)) {
		  return false;
		}
	 
		// проверяем, что фамилия состоит только из букв
		if (!/^[а-яёa-zА-ЯЁA-Z]+$/.test(trimmedValue)) {
		  return false;
		}
	 
		// проверяем, что фамилия не содержит больших букв в середине
		if (/^[А-ЯЁA-Z][а-яёa-z]*[А-ЯЁA-Z]/.test(trimmedValue)) {
		  return false;
		}
	 
		// проверяем, что фамилия соответствует тому же алфавиту, что и имя
		const name = getValues("name").trim();
		const isNameCyrillic = /^[А-ЯЁ][а-яё]+$/.test(name);
		const isNameLatin = /^[A-Z][a-z]+$/.test(name);
	 
		if (isNameCyrillic && !/^[А-ЯЁ][а-яё]+$/.test(trimmedValue)) {
		  return false;
		}
		if (isNameLatin && !/^[A-Z][a-z]+$/.test(trimmedValue)) {
		  return false;
		}
	 
		return true;
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
			{renderInput("surname", "Фамилия", "text", validateSurname)}
			{renderInput("age", "Возраст", "text", validateAge)}
			{renderInput("phone", "Номер", "tel", validatePhone)}
			{renderInput("email", "Почта", "text", validateEmail)}
			<button type="submit">Отправить</button>
		</form>
	);
}

export default Form;
