const form = document.querySelector("#ageForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const dayField = document.querySelector("#day");
  const monthField = document.querySelector("#month");
  const yearField = document.querySelector("#year");

  const day = parseInt(dayField.value);
  const month = parseInt(monthField.value);
  const year = parseInt(yearField.value);
  const dateToday = new Date();

  const yearDiv = document.querySelector("#yearRes");
  const monthDiv = document.querySelector("#monthRes");
  const dayDiv = document.querySelector("#dayRes");

  isValid = validateFrom(dayField, monthField, yearField);

  if (isValid) {
    const todayDay = dateToday.getDate();
    const todayMonth = dateToday.getMonth() + 1;
    const todayYear = dateToday.getFullYear();

    let yearDiff = todayYear - year;
    let monthDiff = todayMonth - month;
    let dayDiff = todayDay - day;

    if (dayDiff < 0) {
      monthDiff--;
      dayDiff += new Date(year, month, 0).getDate();
    }

    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }

    // yearDiv.innerHTML = yearDiff;
    animateValues(yearDiv, yearDiff, 0);
    animateValues(monthDiv, monthDiff, 0);
    animateValues(dayDiv, dayDiff, 0);

    console.log(`day = ${day}
            month = ${month}
            year = ${year}`);
  } else {
    yearDiv.innerHTML = "--";
    monthDiv.innerHTML = "--";
    dayDiv.innerHTML = "--";
  }
});

function animateValues(element, diff, start) {
  const speed = 1;
  let init_count = start;
  const animate = () => {
    init_count = init_count + speed;
    element.innerHTML = init_count;
    if(init_count < diff){
      setTimeout(() => {
        animate()
      }, 100)
    }
    
  }
  animate();
  
}

function validateFrom(dayField, monthField, yearField) {
  const errorField = document.querySelectorAll(".error");
  const labels = document.querySelectorAll("#labels");
  const date = new Date();
  let isValid = true;
  //   required validations
  UpdateFieldStyles(
    errorField[0],
    dayField,
    labels[0],
    dayField.value.length === 0
  );
  UpdateFieldStyles(
    errorField[1],
    monthField,
    labels[1],
    monthField.value.length === 0
  );
  UpdateFieldStyles(
    errorField[2],
    yearField,
    labels[2],
    yearField.value.length === 0
  );
  //valid inputs validation
  if (
    parseInt(yearField.value) < 1950 ||
    parseInt(yearField.value) > date.getFullYear()
  ) {
    isValid = false;
    addStyles(errorField[2], yearField, labels[2], "Must be in the past");
  }
  if (parseInt(monthField.value) < 1 || parseInt(monthField.value) > 12) {
    isValid = false;
    addStyles(errorField[1], monthField, labels[1], "Must be a valid month");
  }

  if (
    dayField.value.length !== 0 &&
    monthField.value.length !== 0 &&
    yearField.value.length !== 0
  ) {
    const daysinMonth = new Date(
      yearField.value,
      monthField.value,
      0
    ).getDate();
    if (dayField.value > 0 && dayField.value <= daysinMonth) {
      removeStyles(errorField[0], dayField, labels[0]);
    } else {
      addStyles(errorField[0], dayField, labels[0], "Must be a valid day");
      isValid = false;
    }
  }

  return isValid;
}

function UpdateFieldStyles(errorField, inputField, label, hasError) {
  if (hasError) {
    const msg = "The field is required";
    addStyles(errorField, inputField, label, msg);
  } else {
    removeStyles(errorField, inputField, label);
  }
}

function addStyles(errorField, inputField, label, msg) {
  errorField.innerHTML = msg;
  errorField.classList.add("visible");
  errorField.classList.remove("invisible");
  inputField.classList.add("border-lightRed");
  inputField.classList.remove("border-lightGrey");
  label.classList.add("text-lightRed");
  label.classList.remove("text-smokeyGrey");
}

function removeStyles(errorField, inputField, label) {
  errorField.innerHTML = "";
  errorField.classList.add("invisible");
  errorField.classList.remove("visible");
  inputField.classList.remove("border-lightRed");
  inputField.classList.add("border-lightGrey");
  label.classList.remove("text-lightRed");
  label.classList.add("text-smokeyGrey");
}
