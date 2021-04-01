// Generate four digit random number:
document.getElementById('generate-pin-btn').addEventListener('click', function () {
  const fourDigitPin = Math.floor(1000 + Math.random() * 9000);
  document.getElementById('pin-display').value = fourDigitPin;

  // set user input display empty when generateBtn is clicked
  document.getElementById('input-display').value = '';

  // Clear Success alert every time the generate button is clicked if there any success notification
  alertNotification('matched', 'none');
});

// Get output from the user input display:
function getUserDisplay() {
  return document.getElementById('input-display').value;
}

// Update user input display:
function printUserDisplay(num) {
  document.getElementById('input-display').value = num;
}

// show clicked number
function userInput() {
  let output = getUserDisplay();
  if (output != NaN) {
    //if output is a number
    output = output + this.id;
    // if number is maximum 4 digit number
    if (output.length < 5) {
      printUserDisplay(output);
    }
  }
}

// capture clicked number
let numberBtn = document.getElementsByClassName('number');
for (let i = 0; i < numberBtn.length; i++) {
  numberBtn[i].addEventListener('click', userInput);
}

// All Clear (C) and Backspace(<) handler
let deleteBtn = document.getElementsByClassName('delete-btn');
for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener('click', function () {
    if (this.id == 'clear-all') {
      printUserDisplay('');

      // Clear Success alert every time the < button is clicked
      alertNotification('matched', 'none');

    }
    if (this.id == 'backspace') {
      let output = getUserDisplay().toString();
      if (output) {
        //if output has a value
        output = output.substr(0, output.length - 1);
        printUserDisplay(output);
        // Clear Success alert every time the backspace button is clicked
        alertNotification('matched', 'none');
      }
    }
  });
}

// Submit button onclick action, notification alert when submit button is clicked, and action left
function handleSubmit() {
  const pinGenerated = document.getElementById('pin-display').value;
  const userEntered = getUserDisplay();

  if (pinGenerated == '' && userEntered == '') {
    // both display empty
    alertNotification('empty-pin', 'block');
    // set time out for notification
    setTimeout(autoClear, 3000);

  } else if (pinGenerated == '') {
    // pin display empty
    alertNotification('empty-pin', 'block');
    setTimeout(autoClear, 3000);

  } else if (userEntered == '' || userEntered.length < 4) {
    // user input display empty or less than 4 digit
    alertNotification('input-error', 'block');
    setTimeout(autoClear, 3000);

  } else if (pinGenerated == userEntered) {
    //Success Alert
    alertNotification('matched', 'block');
  } else {
    // Failed Alert
    alertNotification('unmatched', 'block');
    setTimeout(autoClear, 3000);

    // call count left function:
    leftRemainder();
  }
}

// Count left remainder with disable submit and generate pin button:
function leftRemainder() {
  let countLeft = parseInt(document.getElementById('count-left').innerText);
  countLeft = countLeft - 1;
  document.getElementById('count-left').innerText = countLeft;
  if (countLeft == 0) {
    document.getElementById('submit-btn').disabled = true;
    document.getElementById('generate-pin-btn').disabled = true;
    // help text when no more action left:
    alertNotification('help-text', 'block');
    alertNotification('unmatched', 'none');
  }
}

// Success, Failed, empty pin, user input issue, clear notification,
function alertNotification(Id, value) {
  document.getElementById(Id).style.display = value;
}

// auto clear notification used using set time out
function autoClear() {
  alertNotification('empty-pin', 'none');
  alertNotification('input-error', 'none');
  alertNotification('unmatched', 'none');
  // alertNotification('matched', 'none');
  //alertNotification('help-text', 'none');
}


// Disable keyboard entry:
document.onkeydown = function (e) {
  return false;
};
