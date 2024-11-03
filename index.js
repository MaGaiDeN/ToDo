// Selección de elementos del DOM
const taskInput = document.querySelector('.container__box_task');
const addButton = document.querySelector('.fa-circle-plus');
const tasksContainer = document.querySelector('#tasksContainer');

// Array para almacenar las tareas
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Función para guardar en localStorage
const saveToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Función para crear una nueva tarea
const createTask = (taskText) => {
    const boxContainer = document.createElement('div');
    boxContainer.className = 'box__container';
    
    boxContainer.innerHTML = `
        <i class="fa-solid fa-circle-check fa-xl"></i>
        <div class="info__toDo">${taskText}</div>
        <i class="fa-solid fa-trash-can fa-xl"></i>
    `;

    // Eventos para completar y eliminar tarea
    const checkButton = boxContainer.querySelector('.fa-circle-check');
    const deleteButton = boxContainer.querySelector('.fa-trash-can');

    checkButton.addEventListener('click', () => {
        boxContainer.querySelector('.info__toDo').classList.toggle('completed');
    });

    deleteButton.addEventListener('click', () => {
        boxContainer.remove();
        const taskIndex = tasks.findIndex(task => task.text === taskText);
        if (taskIndex > -1) {
            tasks.splice(taskIndex, 1);
            saveToLocalStorage();
        }
    });

    return boxContainer;
};

// Función para agregar una nueva tarea
const addTask = () => {
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        const newTaskObj = {
            text: taskText,
            completed: false
        };
        
        tasks.push(newTaskObj);
        saveToLocalStorage();
        
        const newTask = createTask(taskText);
        tasksContainer.appendChild(newTask);
        
        taskInput.value = '';
    }
};

// Event Listeners
addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Cargar tareas guardadas al iniciar
window.addEventListener('load', () => {
    tasks.forEach(task => {
        const newTask = createTask(task.text);
        if (task.completed) {
            newTask.querySelector('.info__toDo').classList.add('completed');
        }
        tasksContainer.appendChild(newTask);
    });
});