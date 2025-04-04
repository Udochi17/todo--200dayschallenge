const openFormBtn = document.querySelector(".addNew");
const inputForm = document.querySelector(".input-container");
const titleInput = document.getElementById("title-input");
const timeline = document.getElementById("timeline");
const description = document.getElementById("description");
const closeBtn = document.querySelector(".close");
const addNewBtn = document.querySelector(".add")
const form = document.querySelector('.todo-list-form');
const todoListContainer = document.querySelector('.todo-list-container');
const editBtn = document.querySelector('.edit');
const deleteBtn = document.querySelector('.delete');
const modalMessage = document.querySelector('.modal-message');
const modalCancel = document.getElementById("modal-cancel");
const discardBtn = document.getElementById('discard');


const taskArray = JSON.parse(localStorage.getItem('data')) || [];
let currentTask = {};

openFormBtn.addEventListener("click", () => {
    inputForm.classList.toggle('hidden');
});


const addNewTask = () => {

    if (!titleInput.value.trim()) {
        alert("Please input a task");
        return;
    }

    const dataArrIndex = taskArray.findIndex((item) => item.id === currentTask.id);

    const taskObj = {
        id: `${removeSpecialChars(titleInput.value).split(' ').join('-')}-${Date.now()}`,
        title: removeSpecialChars(titleInput.value),
        timeline: timeline.value,
        description: removeSpecialChars(description.value)
    }

    if (dataArrIndex === -1) {
        taskArray.unshift(taskObj);
    } else {
        taskArray[dataArrIndex] = taskObj;
    }

    localStorage.setItem("data", JSON.stringify(taskArray));

    uploadTask();
    reset();

}

const uploadTask = () => {
    todoListContainer.innerHTML = "";

    taskArray.forEach(({ id, title, timeline, description }) => {
        todoListContainer.innerHTML += `
   <li id=${id} class="list-container">
      <div class="task-details">
         <p class="title"><strong>TITLE:</strong> ${title}</p>
         <p class="timeline"><strong>TIMELINE:</strong> ${timeline}</span></p>
         <p class="description"><strong>DESCRIPTION: </strong> ${description}</p>
      </div>

       <button class="btn edit" onclick="editTask(this)">EDIT <i class="fa-solid fa-pencil"></i></button>
       <button class="btn delete" onclick="deleteTask(this)">DELETE <i class="fa-solid fa-trash-can"></i></button>
   </li>`
    });
}

closeBtn.addEventListener("click", () => {
    const taskValues = titleInput.value || timeline.value || description.value;
    const formvaluesUpdated = titleInput.value !== currentTask.title || timeline.value !== currentTask.timeline || description.value !== currentTask.description;

    if (taskValues !== '' && formvaluesUpdated) {
        modalMessage.showModal();
    } else {
        reset();
    }
});

modalCancel.addEventListener("click", () => {
    modalMessage.close()
});

discardBtn.addEventListener("click", () => {
    modalMessage.close();
    reset();
});

const reset = () => {
    titleInput.value = '';
    timeline.value = '';
    description.value = '';
    inputForm.classList.toggle('hidden');
    currentTask = {};
}

const removeSpecialChars = str => str.replace(/[^a-zA-Z0-9. ]/g, "");

const editTask = (buttonEl) => {
    const dataArrIndex = taskArray.findIndex((item) => item.id === buttonEl.parentElement.id);

    currentTask = taskArray[dataArrIndex];

    titleInput.value = currentTask.title;
    timeline.value = currentTask.timeline;
    description.value = currentTask.description;

    inputForm.classList.toggle('hidden');

};

const deleteTask = (buttonEl) => {
    const dataArrIndex = taskArray.findIndex((item) => item.id === buttonEl.parentElement.id);

    taskArray.splice(dataArrIndex, 1);
    buttonEl.parentElement.remove();
    localStorage.setItem('data', JSON.stringify(taskArray));
}



form.addEventListener("submit", e => {
    e.preventDefault();

    addNewTask();

});

if (taskArray.length) {
    uploadTask();
}
