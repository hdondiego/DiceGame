function rollDice(total){
	// "rolling" the dice with random function
	// only achieving numbers 1 - 6
	result_1 = Math.floor(Math.random() * 6) + 1;
	result_2 = Math.floor(Math.random() * 6) + 1;
	result_3 = Math.floor(Math.random() * 6) + 1;
	result_4 = Math.floor(Math.random() * 6) + 1;
	result_5 = Math.floor(Math.random() * 6) + 1;
	result_6 = Math.floor(Math.random() * 6) + 1;

	// displaying the rolled number on the read-only text fields
	document.getElementById("dice_1").value = result_1;
	document.getElementById("dice_2").value = result_2;
	document.getElementById("dice_3").value = result_3;
	document.getElementById("dice_4").value = result_4;
	document.getElementById("dice_5").value = result_5;
	document.getElementById("dice_6").value = result_6;

	// putting all of the rolled dice's values in one array
	let results = [result_1, result_2, result_3, result_4, result_5, result_6];

	console.log(results);

	// used to keep track of how many of each number exists
	// 0 -> how many dice with the number 1 , 1 -> how many dice with the number 2, etc.
	let num = [0, 0, 0, 0, 0, 0];

	// looping through each result, and increasing the count of that given number
	for (let i = 0; i < 6; i++){
		if (results[i] == 1){
			num[0] += 1;
		} else if (results[i] == 2){
			num[1] += 1;
		} else if (results[i] == 3){
			num[2] += 1;
		} else if (results[i] == 4){
			num[3] += 1;
		} else if (results[i] == 5){
			num[4] += 1;
		} else if (results[i] == 6){
			num[5] += 1;
		} else {
			// shouldn't happen
			num[5] += 0;
		}
	}

	console.log(num);

	// temporarily holds a score that the player earns in one roll
	let temp = 0;
	console.log(temp);

	// going through all the possibilities of earning points
	if (num[0] == 6){
		// user got all 1s -> add 10000 points
		temp += 10000;
	} else if (num[0] == 1 && num[1] == 1 && num[2] == 1 && num[3] == 1 && num[4] == 1 && num[5] == 1){
		// user rolled a straight (1-6) -> add 1500 points
		temp += 1500;
	} else if (num[0] == 1 && num[1] == 1 && num[2] == 1 && num[3] == 1 && num[4] == 1) {
		// rolled a low straight - missing the 6
		num[0] -= 1;
		num[1] -= 1;
		num[2] -= 1;
		num[3] -= 1;
		num[4] -= 1;
		temp += 1250;

		if (num[0] == 1){
			// if the remaining dice is a 1, add 100
			temp += 100;
		} else if (num[4] == 1){
			// if the remaining dice is a 5, add 50
			temp += 50;
		}
	} else if (num[0] == 5 || num[1] == 5 || num[2] == 5 || num[3] == 5 || num[4] == 5 || num[5] == 5){
		// five of a kind
		for (let j = 0; j < 6; j++){
			if (num[j] == 5){
				if (j == 0) {
					// three of a kind rule for 1s -> add 1000
					temp += 1000 * 4;
				} else {
					temp += (((j+1) * 100) * 4);
				}

				num[j] -= 5;

				if (num[0] == 1){
					// if the remaining dice is a 1, add 100
					temp += 100;
				} else if (num[4] == 1){
					// if the remaining dice is a 5, add 50
					temp += 50;
				}

				break;
			}
		}
	} else if (num[0] == 4 || num[1] == 4 || num[2] == 4 || num[3] == 4 || num[4] == 4 || num[5] == 4) {
		for (let j = 0; j < 6; j++){
			if (num[j] == 4){
				if (j == 0) {
					// three of a kind rule for 1s -> add 1000
					temp += 1000 * 2;
				} else {
					temp += (((j+1) * 100) * 2);
				}

				num[j] -= 4;

				if (num[0] >= 1){
					// if the remaining dice is a 1, add 100
					temp += (100 * num[0]);
				}

				if (num[4] >= 1){
					// if the remaining dice is a 5, add 50
					temp += (50 * num[4]);
				}

				break;
			}
		}
	} else {
		// temp will be added to total after reviewing all dice
		if (num[0] >= 3){
			// user rolled three 1s -> add 1000 points to temp
			// subtracting 3 from this to keep consistency with rules
			// any extra but less than six of the 1s will be counted as 100 each
			temp += 1000;
			num[0] -= 3;
		}

		if (num[0] > 0){
			// each dice that has a value of 1 is worth 100
			temp += (num[0] * 100);
			num[0] -= num[0];
		}

		// checking for dice that have three of the same number (excluding 1s)
		for (let j = 1; j < 6; j++){
			if (num[j] == 3){
				temp += ((j + 1) * 100);
			} else if (num[j] < 3){
				// at the very least, only accepting the dice being a 5
				if (j == 4) {
					temp += (num[j] * 50);
				}
			}
		}
	}


	// debug
	/*if (num[0] >= 3){
		// user rolled three 1s -> add 1000 points to temp
		// subtracting 3 from this to keep consistency with rules
		// any extra but less than six of the 1s will be counted as 100 each
		temp += 1000;
		console.log(temp);
		num[0] -= 3;
	}

	if (num[0] > 0){
		// each dice that has a value of 1 is worth 100
		temp += (num[0] * 100);
		console.log(temp);
		num[0] -= num[0];
	}

	// checking for dice that have three of the same number (excluding 1s)
	for (let j = 1; j < 6; j++){
		if (num[j] == 3){
			temp += ((j + 1) * 100);
			console.log(temp);
		} else if (num[j] < 3){
			// at the very least, only accepting the dice being a 5
			if (j == 4) {
				temp += (num[j] * 50);
				console.log(temp);
			}
		}
	}*/

	let result = total + temp;

	if (result >= 10000){
		document.getElementById("total").value = result;
		document.getElementById("roll_total").value = temp;
		document.getElementById("rollButton").disabled = true;
		document.getElementById("win_msg").style.visibility = "visible";
		return result;
	} else if (result >= 750){
		document.getElementById("total").value = result;
		document.getElementById("roll_total").value = temp;
		return result;
	} else {
		// you didn't win the game, or you didn't roll a high enough score to "get on board"
		document.getElementById("roll_total").value = temp;
		return total;
	}
	

	/*
	document.getElementById("dice_1").value = Math.floor(Math.random() * 6) + 1;
	document.getElementById("dice_2").value = Math.floor(Math.random() * 6) + 1;
	document.getElementById("dice_3").value = Math.floor(Math.random() * 6) + 1;
	document.getElementById("dice_4").value = Math.floor(Math.random() * 6) + 1;
	document.getElementById("dice_5").value = Math.floor(Math.random() * 6) + 1;
	document.getElementById("dice_6").value = Math.floor(Math.random() * 6) + 1;
	*/
}

/*
document.getElementById("dice_1").value = 5;
document.getElementById("dice_2").value = 6;
document.getElementById("dice_3").value = 7;
document.getElementById("dice_4").value = 8;
document.getElementById("dice_5").value = 9;
document.getElementById("dice_6").value = 0;
*/

let total = 0;
let totalField = document.getElementById("total");
totalField.value = total;

let roll_total = 0;
let rollTotalField = document.getElementById("roll_total");
rollTotalField.value = roll_total;

let rollButton = document.getElementById("rollButton");
//rollButton.addEventListener("roll", rollDice());

//rollButton.addEventListener("roll", rollDice());
window.onload = function() { 
	total = rollDice(total);
	totalField.value = total;
}


/*$(window).onload = (event) => {
	rollDice();
};*/

rollButton.onclick = function() { 
	total = rollDice(total);
	totalField.value = total;
}