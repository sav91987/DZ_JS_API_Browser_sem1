const db = `[
{
    "id": 1,
    "name": "Йога",
    "time": "10:00 - 11:00",
    "maxParticipants": 15,
    "currentParticipants": 8
},
{
    "id": 2,
    "name": "Пилатес",
    "time": "11:30 - 12:30",
    "maxParticipants": 10,
    "currentParticipants": 5
},
{
    "id": 3,
    "name": "Кроссфит",
    "time": "13:00 - 14:00",
    "maxParticipants": 20,
    "currentParticipants": 15
},
{
    "id": 4,
    "name": "Танцы",
    "time": "14:30 - 15:30",
    "maxParticipants": 12,
    "currentParticipants": 10
},
{
    "id": 5,
    "name": "Бокс",
    "time": "16:00 - 17:00",
    "maxParticipants": 8,
    "currentParticipants": 6
}
]`;

const key = "schedule";
//запись в localStorage базы db по ключу key с проверкой наличия такого ключа
if (!localStorage.getItem(key)) {
    localStorage.setItem(key, db);
}
const schedules = JSON.parse(localStorage.getItem(key)); //получаем массив объектов записей на каждое занятие

const containerSchedulesEl = document.querySelector(".shedules"); //находим div элемент со всеми записями занятий

// создание в найденном div всех записей занятий по шаблону
schedules.forEach((element) => {
    containerSchedulesEl.insertAdjacentHTML(
        "beforeend",
        `<div class="shedule" data-id="${element.id}">
                <div class="shedule__name">Название: <span class="bold">${element.name}</span></div>
                <div class="shedule__time">Время: <span class="bold">${element.time}</span></div>
                <div class="shedule__maxParticipants">Максимальное число записей: <span class="bold">${element.maxParticipants}</span></div>
                <div class="shedule__currentParticipants">Текущее число записей: <span class="bold">${element.currentParticipants}</span></div>
                <div class="shedule__actions">
                <button class="subscribe">Записаться</button>
                <button class="unsubscribe">Отменить запись</button>
                </div>
        </div>`
    );
});

//Запись
containerSchedulesEl.addEventListener("click", (e) => {
    if (!e.target.classList.contains("subscribe")) {
        //ловим событие и если кликнули не на элемент с классом subscribe (кнопка Записаться), то ничего не делаем
        return;
    } else {
        //иначе
        const sheduleEl = e.target.closest(".shedule"); //находим ближайший элемент с классом shedule (div в котором собраны name, time, maxParticipants, currentParticipants)
        const schedule = schedules.find(
            (elem) => elem.id === +sheduleEl.getAttribute("data-id")
        ); //ищем id у найденного div (+sheduleEl.getAttribute("data-id")) и сравниваем с elem.id у каждого объекта bd и по нему находим нужный объект
        schedule.currentParticipants = ++schedule.currentParticipants;
        sheduleEl.querySelector(".unsubscribe").classList.remove("hidden");

        if (schedule.currentParticipants === schedule.maxParticipants) {
            //проверка свободных записей
            sheduleEl.querySelector(".subscribe").classList.add("hidden");
        }
        sheduleEl.querySelector(
            ".shedule__currentParticipants"
        ).innerHTML = `Текущее число записей: <span class="bold">${schedule.currentParticipants}</span>`; //увеличиваем число текущих записей у объекта ++schedule.currentParticipants и в HTML
        localStorage.setItem(key, JSON.stringify(schedules)); //записываем в локальное хранилище
    }
});

//Отмена записи
containerSchedulesEl.addEventListener("click", (e) => {
    if (!e.target.classList.contains("unsubscribe")) {
        return;
    } else {
        const sheduleEl = e.target.closest(".shedule");
        const schedule = schedules.find(
            (elem) => elem.id === +sheduleEl.getAttribute("data-id")
        );

        schedule.currentParticipants = --schedule.currentParticipants;

        sheduleEl.querySelector(".subscribe").classList.remove("hidden");

        sheduleEl.querySelector(
            ".shedule__currentParticipants"
        ).innerHTML = `Текущее число записей: <span class="bold">${schedule.currentParticipants}</span>`;
        localStorage.setItem(key, JSON.stringify(schedules));

        if (schedule.currentParticipants === 0) {
            sheduleEl.querySelector(".unsubscribe").classList.add("hidden");
            return;
        }
    }
});
