const ones = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
const tens = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];
const MAX_DIGIT = 12;
const myForm = document.getElementById("myForm");

function handleThreeDigits(num) {
  const numString = num.toString();

  if (num === 0) return "zero";
  //when number is between 0 - 20
  if (num < 20) {
    return ones[num];
  }
  //2 digits
  if (numString.length === 2) {
    if (numString[1] != "0")
      return tens[numString[0]] + "-" + ones[numString[1]];
    else return tens[numString[0]];
  }
  //100 and more
  if (numString.length == 3) {
    if (numString[1] === "0" && numString[2] === "0")
      return ones[numString[0]] + " hundred";
    else
      return (
        ones[numString[0]] +
        " hundred and " +
        handleThreeDigits(+(numString[1] + numString[2]))
      );
  }
}
//Turning number to a full 9 digit number by adding zeros to beginning
function numHandler(numString) {
  var numArray = numString.split("");
  for (var i = numString.length; i < MAX_DIGIT; i++) numArray.unshift("0");
  return numArray.join("");
}

function numToWord(num) {
  var numString = num.toString();
  const fullNum = numHandler(numString);
  //Seperating by notations as 3 digits of millions, thousands and hundreds
  const billions = +(fullNum[0] + fullNum[1] + +fullNum[2]);
  const millions = +(fullNum[3] + fullNum[4] + +fullNum[5]);
  const thousands = +(fullNum[6] + fullNum[7] + fullNum[8]);
  const hundreds = +(fullNum[9] + fullNum[10] + fullNum[11]);
  const numArray = [billions, millions, thousands, hundreds];
  var result = "";

  for (var i = 0; i < numArray.length; i++) {
    if (numArray[i] != 0) {
      if (i === 0) result += handleThreeDigits(numArray[i]) + " billion ";
      else if (i === 1) result += handleThreeDigits(numArray[i]) + " million ";
      else if (i === 2) result += handleThreeDigits(numArray[i]) + " thousand ";
      else if (
        i === 3 &&
        numArray[0] + numArray[1] + numArray[2] != 0 &&
        numArray[3] < 100
      )
        result += "and " + handleThreeDigits(numArray[i]);
      else if (i === 3) result += handleThreeDigits(numArray[i]);
    }
  }
  //for special occasion 1100-1999
  if (numString.length === 4 && 20 > +(numString[0] + numString[1]) > 10)
    return (
      handleThreeDigits(+(numString[0] + numString[1])) +
      " hundred and " +
      handleThreeDigits(+(numString[2] + numString[3]))
    );

  return result;
}

myForm.addEventListener("submit", (e) => {
  var inputValue = document.getElementById("number").value;

  e.preventDefault();
  if (inputValue != "")
    document.getElementById("result").innerHTML =
      inputValue + "  ==  " + numToWord(inputValue);
});

myForm.addEventListener("reset", (e) => {
  e.preventDefault();

  document.getElementById("result").innerHTML = "";
  document.getElementById("number").value = "";
});
