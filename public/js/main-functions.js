const calendarEl = document.querySelector("#calendar");
const tasksList = document.querySelector("#tasksList");
const calendarSetDueDate = document.querySelector("#calendarSetDueDate");

//GLOBAL VARIABLES

const allTasks = []; //stores all tasks
let selectedDate = "";
let currentDailyTasks = [];
let setDueDate = "";

const initDragableItems = () => {
  new Sortable(tasksList, {
    animation: 300,

    onEnd(event) {
      console.log("Old position:", event.oldIndex);
      console.log("New position:", event.newIndex);
    },
  });
};

const initCalendar = () => {
  const calendar = new VanillaCalendarPro.Calendar(calendarEl, {
    onClickDate(self, event) {
      selectedDate = self.context.selectedDates[0];
      //Display tasks if day selected
      displayTasks();
    },
  });

  const calendarDueDate = new VanillaCalendarPro.Calendar(calendarSetDueDate, {
    inputMode: true,
    onClickDate(self, event) {
      setDueDate = self.context.selectedDates[0];
      document.querySelector("#calendarSetDueDate").value = setDueDate;
    },
  });

  calendar.init();
  calendarDueDate.init();
};

const addNewTask = () => {
  //get the input content
  const title = document.querySelector("#titleText").value;
  const description = document.querySelector("#descriptionText").value;
  const importance = document.querySelector("#importanceSelection").value;

  if (title.trim() === "") {
    alert("Write a title");
    return;
  }
  if (description.trim() === "") {
    alert("Write a description");
    return;
  }
  if (selectedDate.trim() === "") {
    alert("Write a date");
    return;
  }

  //create an object
  const newTask = {
    date: selectedDate,
    title: title,
    description: description,
    importance: importance,
    dueDate: setDueDate,
  };

  //adding the task to the set
  allTasks.push(newTask);
  displayTasks();
  //alert("Task added");

  document.querySelector("#titleText").value = "";
  document.querySelector("#descriptionText").value = "";
  document.querySelector("#calendarSetDueDate").value = "";
};

const getDailyTasks = () => {
  currentDailyTasks = allTasks.filter((task) => task.date === selectedDate);
};

const displayTasks = () => {
  const noTasks = document.querySelector("#noTasks");
  //get all the tasks for today
  getDailyTasks();

  //We clean the list before displaying more tasks
  //Without this cleaning the display would stack all the dailyTasks
  tasksList.innerHTML = "";

  if (currentDailyTasks.length === 0) {
    tasksList.classList.add("no-tasks");
    return;
  }

  //If there are tasks to show
  noTasks.classList.add("no-tasks");
  tasksList.classList.remove("no-tasks");

  //We create a new list item
  currentDailyTasks.forEach((task) => {
    listElementCreation(task)
  });
};

//Separation of the tasks from the displayTasks funcion
//We simply create the list item using JS
const listElementCreation = (task) => {
   //Creating tags for the new task
    const newItem = document.createElement("li");
    const taskContent = document.createElement("div");
    const title = document.createElement("span");
    const description = document.createElement("span");
    const dueDate = document.createElement("span");
    const completeChackbox = document.createElement("input");

    completeChackbox.type = "checkbox";
    completeChackbox.classList.add("remove-check-box");

    //Seting the values from the user input
    title.textContent = task.title;
    description.textContent = task.description;
    dueDate.textContent = task.dueDate;

    //Adding the items together to create the task
    taskContent.appendChild(title);
    taskContent.appendChild(description);
    taskContent.appendChild(dueDate);

    newItem.appendChild(taskContent);
    newItem.appendChild(completeChackbox);

    //Some styling
    newItem.style.backgroundColor = task.importance;
    title.classList.add("task-title");
    taskContent.classList.add("task-content")

    //Addinf functionality to the checkbox
    completeChackbox.addEventListener("change" , ()=> removeFromList(task))

    //Adding the new item to the list
    tasksList.appendChild(newItem);
}

const removeFromList = (task) => {
  console.log(task);
};
const main = () => {

  initCalendar();
  initDragableItems();
  //displayTasks()
  const addBtn = document.querySelector("#addBtn");
  addBtn.addEventListener("click", addNewTask);
};

main();
