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
function calcCalories(weight, isNeutered, isObeseProne, idealWeight, activity, ageYears, ageMonths) {
    let RER = calcRER(weight);

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