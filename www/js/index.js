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
  return x[i].value;

  // only one radio can be logically checked, don't check the rest
  break;
}
}
}

function getObesity() {
	let x = document.getElementsByName("obese");

	for (var i = 0, length = x.length; i < length; i++) {
		if (x[i].checked) {
  // do whatever you want with the checked radio
  return x[i].value;

  // only one radio can be logically checked, don't check the rest
  break;
}
}
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
  return x[i].value;

  // only one radio can be logically checked, don't check the rest
  break;
}
}
}

function getActualWeight() {
	let x = getWeightValue(getUnit());
	return x;
}

function test() {
	
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
  return x[i].value;

  // only one radio can be logically checked, don't check the rest
  break;
}
}
}

function getIdealActualWeight() {
	let x = getIdealWeightValue(getIdealUnit());
	return x;
}

function test() {
	
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
    let RER = calcRER(weight);
    
    /*
    weight: int
    isNeutered: bool
    isObeseProne: bool
    idealWeight: int
    activity: int on a scale of 1-5
    ageMonths: int
    */

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

    //function targets RER to hit ideal weight
    if (idealWeight > weight) {
    	let newRER = 1.5 * calcRER(idealWeight);
    }
    else if (idealWeight < weight) {
    	let newRER = calcRER(idealWeight);
    }
    else {
    	let newRER = calcRER(weight);
    }

    //function makes up for activity level of the dog on a 1-5 scale
    newRER *= activity;

    //function makes up for age of the dog
    if (ageMonths < 4) {
    	newRER *= 3;
    }
    else {
    	newRER *= 2;
    }

    return newRER;
}

/*
This is a function that calculates the calories per day and puts it in the HTML page
*/
function getCalorieCalc() {
	let x = calcRER(getActualWeight(), getNeutered(), getObesity(), getIdealActualWeight(), getActivityLevel(), getActualAge());
  document.getElementById("calorieOut").innerHTML = x;
  unhideCalorieOut();
	return x;
}

//support method to unhide element
function unhideCalorieOut() {
  var x = document.getElementById("calorieOut");
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
  let monthString = getDOBMonth();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let monthInt = months.indexOf(monthString) + 1;
  let x = ageCalc(getDOBYear(), monthInt, getDOBDay());
  return x;
}

/*
This array is for the life expectancy calculator for your dog.
WARNING. THIS IS A GIMMICK. DO NOT TAKE THIS NUMBER SERIOUSLY. 
This info is based on this study: 
https:www.psychologytoday.com/us/blog/canine-corner/201505/how-long-will-your-dog-live

The index of each number is the age at which the number is based on.
In other words, lifeExpectancy = number + indexOfNumber
*/
lifeExpectancy = [13.7, 12.8, 11.9, 10.9, 10.0, 9.0, 8.1, 7.2, 6.3, 5.4, 4.6, 3.9, 3.2, 2.6, 2.0, 1.6, 1.3, 1.1];

function calcLifeExpectancy(age) {
	return lifeExpectancy[age];
};