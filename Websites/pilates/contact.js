

function sendMail(event) {
  event.preventDefault();
  fetch("https://formspree.io/f/xgolebvg", {
    method: "POST",
    body: new FormData(event.target),
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(() => {
    alert('Mail wurde gesendet!');
    event.target.reset(); 
  })
  .catch((error) => {
    console.log(error);
  });
}

const dateInput = document.getElementById('dateInput');
const selectedDateText = document.getElementById('selectedDate');

const calendar = document.getElementById('calendar');
const calendarDays = document.getElementById('calendarDays');

const monthYear = document.getElementById('monthYear');

const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

const toggleFormsBtn = document.getElementById('toggleFormsBtn');
const trainingForm = document.querySelector('.training-form');
const contactForm = document.querySelector('.contact-form');

function toggleForms() {
    if (trainingForm.classList.contains('d-none')) {
        trainingForm.classList.remove('d-none');
        contactForm.classList.add('d-none');
    } else {
        trainingForm.classList.add('d-none');
        contactForm.classList.remove('d-none');
    }
}

const today = new Date();

today.setHours(0, 0, 0, 0);

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let selectedDate = null;
const maxDate = new Date(today);

maxDate.setMonth(maxDate.getMonth() + 3);

const allowedDays = [3, 5];

function renderCalendar() {
    calendarDays.innerHTML = '';

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(
        currentYear,
        currentMonth + 1,
        0
    );

    const daysInMonth = lastDay.getDate();

    monthYear.textContent = firstDay.toLocaleDateString(
        'de-DE',
        {
            month: 'long',
            year: 'numeric'
        }
    );

    const startingDay =
        (firstDay.getDay() + 6) % 7;


    for (let i = 0; i < startingDay; i++) {
        const empty = document.createElement('div');
        empty.classList.add('empty-day');
        calendarDays.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const button = document.createElement('button');

        button.type = 'button';
        button.textContent = day;
        button.classList.add('day');

        const weekDay = date.getDay();
        const isAllowedDay = allowedDays.includes(weekDay);
        const isPast = date < today;
        const isTooFarFuture = date > maxDate;

        if (!isAllowedDay || isPast || isTooFarFuture) {
            button.disabled = true;
        }

        if (selectedDate && date.getTime() === selectedDate.getTime()) {
            button.classList.add('selected');
        }

        button.addEventListener('click', () => {
            selectedDate = date;
            selectedDateText.textContent = date.toLocaleDateString('de-DE');
            renderCalendar();
            calendar.classList.add('hidden');
        });
        
        calendarDays.appendChild(button);
    }
    updateNavigation();
}

dateInput.addEventListener('click', () => {
    calendar.classList.toggle('hidden');
});

prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});

function updateNavigation() {
    const current =
        new Date(currentYear, currentMonth, 1);
    const minMonth =
        new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );
    const maxMonth =
        new Date(
            maxDate.getFullYear(),
            maxDate.getMonth(),
            1
        );
    prevMonthBtn.disabled =
        current <= minMonth;
    nextMonthBtn.disabled =
        current >= maxMonth;
}
renderCalendar();