/*
These functions are to get the values of the input boxes, and bubbles etc. in the HTML.
These support other functions in the client JS file but don't modify the HTML page.
*/
function getDOBDay() {
	let x = document.getElementById("DOBDay");
	let value = x.options[x.selectedIndex].text;

	return value;
}

function getDOBMonth() {
	let x = document.getElementById("DOBMonth");
	let value = x.options[x.selectedIndex].text;

	return value;
}

function getDOBYear() {
	let x = document.getElementById("DOBYear");
	let value = x.options[x.selectedIndex].text;

	return value;
}

function getActivityLevel() {
	let x = document.getElementsByName("activity");

	for (var i = 0, length = x.length; i < length; i++) {
		if (x[i].checked) {
  // do whatever you want with the checked radio
  return x[i].value;

  // only one radio can be logically checked, don't check the rest
  break;
}
}
}

function getNeutered() {
	let x = document.getElementsByName("neutered");

	for (var i = 0, length = x.length; i < length; i++) {
		if (x[i].checked) {
  // do whatever you want with the checked radio
  return (x[i].value === "true");

  // only one radio can be logically checked, don't check the rest
  break;
}
}
return false;
}

function getObesity() {
	let x = document.getElementsByName("obese");

	for (var i = 0, length = x.length; i < length; i++) {
		if (x[i].checked) {
  // do whatever you want with the checked radio
  return (x[i].value === "true");

  // only one radio can be logically checked, don't check the rest
  break;
}
}
return false;
}

function getWeightValue(isKG) {
	let x = document.getElementById("weight").value;
	if (isKG) {
		return x;
	} else {
		return x / 2.205;
	}
}

function getUnit() {
	let x = document.getElementsByName("unit");

	for (var i = 0, length = x.length; i < length; i++) {
		if (x[i].checked) {
  // do whatever you want with the checked radio
  return (x[i].value === "true");

  // only one radio can be logically checked, don't check the rest
  break;
}
}
}

function getActualWeight() {
	let x = getWeightValue(getUnit());
	return x;
}

function getIdealWeightValue(isKG) {
	let x = document.getElementById("idealWeight").value;
	if (isKG) {
		return x;
	} else {
		return x / 2.205;
	}
}

function getIdealUnit() {
	let x = document.getElementsByName("idealUnit");

	for (var i = 0, length = x.length; i < length; i++) {
		if (x[i].checked) {
  // do whatever you want with the checked radio
  return (x[i].value === "true");

  // only one radio can be logically checked, don't check the rest
  break;
}
}
}

function getIdealActualWeight() {
	let x = getIdealWeightValue(getIdealUnit());
	return x;
}

/*
This calculates how many calories per day your dog must eat in order to stay healthy.
It's based on many factors, including;
- activity
- weight
- neutered status
- age
- etc.

WARNING. This info should not be considered scientific, nor should it be used as a basis for studies.
It's just to feed your dog.
*/
function calcRER(weight) {
	return 70 * Math.pow(weight, 3/4);
}

function calcCalories(weight, isNeutered, isObeseProne, idealWeight, activity, ageMonths) {  
    /*
    isNeutered: bool
    isObeseProne: bool
    idealWeight: int
    activity: int on a scale of 1-5
    ageMonths: int
    */

    //function targets RER to hit ideal weight
    let newRER = 1.0;
    if (idealWeight > weight) {
    	RER = 1.5 * calcRER(idealWeight);
    }
    else if (idealWeight < weight) {
    	RER = calcRER(idealWeight);
    }
    else {
    	RER = calcRER(weight);
    }

    //function makes up for the dog being neutered
    if (isNeutered) {
    	RER *= 1.6;
    }
    else {
    	RER *= 1.8;
    }

    //function makes up for the dog being obese prone or inactive
    if (isObeseProne) {
    	RER *= 1.3;
    }
    else {
        RER *= 1.0;
    }

    //function makes up for activity level of the dog on a 1-5 scale
    RER *= activity;

    //function makes up for age of the dog
    if (ageMonths < 4) {
    	RER *= 3;
    }
    else {
    	RER *= 2;
    }

    return RER;
}

/*
This is a function that calculates the calories per day and puts it in the HTML page
*/
function getCalorieCalc() {
	let x = calcCalories(getActualWeight(), getNeutered(), getObesity(), getIdealActualWeight(), getActivityLevel(), getActualAge());
  document.getElementById("calorieOut").innerHTML = x;
  unhideCalorieOut();

  document.getElementById("weightDifferenceOut").innerHTML = Math.abs(getActualWeight() - getIdealActualWeight());
  return x;
}

//support method to unhide element
function unhideCalorieOut() {
  var x = document.getElementById("hiddenDiv");
  x.style.display = "block";
}

//function to calculate difference in dates

function ageCalc(year, month, day) {
  let currentDate = new Date();
  let dogDate = new Date(year, month, day);
  const differenceTime = Math.abs(currentDate - dogDate);
  const differenceDays = Math.ceil((differenceTime / (1000 * 60 * 60 * 24) / 365 * 12)); 
  return differenceDays;
}

function getActualAge() {
    let x = ageCalc(getDOBYear(), getDOBMonth(), getDOBYear());
    return x;
}

function calculateValues() {
  let monthString = getDOBMonth();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let monthInt = months.indexOf(monthString) + 1;
  let x = ageCalc(getDOBYear(), monthInt, getDOBDay());
  return x;
}

console.log(calcCalories(10, true, true, 1, 1, 1));