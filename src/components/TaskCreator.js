import React, { useState } from 'react';

export const TaskCreator = ({ crateNewTask }) => {
	const [newTaskName, setNewTaskName] = useState('')

	const handleSubmit = (e) => { //este evento le llega del onSubmit del formulario
		e.preventDefault() //esto cancela el evento por defecto que tiene el onsubmit que es enviar al algo al backend y no recarga la pagina
		crateNewTask(newTaskName)
		setNewTaskName('')//esto hace que se elimine el texto una vez enviado especificamente del campo value
	}

	return (
		<form onSubmit={handleSubmit} className='my-2 row'>
			<div className='col-9'>
				<input
					type='text'
					placeholder='Ingresa una nueva tarea'
					value={newTaskName}
					onChange={(e) => setNewTaskName(e.target.value)}
					className='form-control'
				/>
			</div>
			<div className='col-3'>
				<button className='btn btn-primary btn-sm'>guardar tarea</button>
			</div>

		</form>
	)
}