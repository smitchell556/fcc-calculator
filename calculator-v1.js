var calcNum = [],
    currentNum = "",
    isPercentage = false,
    isDecimal = false,
    lastButton = "",
    lastNum = "",
    lastOper = "";

//    Create number and show on viewport 
function addNum(someNum) {
  if (currentNum.length < 7) {
    if (isDecimal === true && someNum === ".") {
      return;
    }
    currentNum = currentNum + someNum;
    $(".viewport").html(currentNum);
    lastButton = "num";
    lastNum = currentNum;
    if (someNum === ".") {
      isDecimal = true;
    }
  }
}

//    Add currentNum & operator following it to equation(calcNum)
function addOper(someOper) {
  if (currentNum.length === 0 && calcNum.length === 0) {
    return;
  } else {
    if (lastButton === "oper") {
      calcNum[calcNum.length - 1] = someOper;
    } else {
      if (lastButton === "num") {
        calcNum.push(currentNum);
        calcNum.push(someOper);
        currentNum = "";
      } else {
        calcNum.push(someOper);
      }
    }
    isPercentage = false;
    isDecimal = false;
    lastButton = "oper";
    lastOper = someOper;
  }
}

//    Turn a number into a percentage
function percentage() {
  if (isPercentage === false && lastButton === "num") {
    var indexPerc = currentNum.indexOf(".");
    if (indexPerc !== -1) {
      if (indexPerc === 0) {
        currentNum = ".00" + currentNum.slice(1);    
      } else if (indexPerc === 1) {
        currentNum = ".0" + currentNum.slice(0, indexPerc) + currentNum.slice(indexPerc + 1);
      } else if (indexPerc === 2) {
        currentNum = "." + currentNum.slice(0, indexPerc) + currentNum.slice(indexPerc + 1);
      } else {
        currentNum = currentNum.slice(0, indexPerc - 2) + "." + currentNum.slice(indexPerc - 2, indexPerc) + currentNum.slice(indexPerc + 1);
      }
    } else {
      if (currentNum.length === 1) {
        currentNum = ".0" + currentNum;
      } else if (currentNum.length === 2) {
        currentNum = "." + currentNum;
      } else {
        currentNum = currentNum.slice(0, currentNum.length - 2) + "." + currentNum.slice(currentNum.length - 2);
      }
    }
  isPercentage = true;
  isDecimal = true;
  }
}

//    Evaluate equation(calcNum)
function calculate() {
  if (lastButton === "num") {
    calcNum.push(currentNum);
  } else if (lastButton === "equal") {
    calcNum.push(lastOper);
    calcNum.push(lastNum);
  } else {
    calcNum.pop();
  }
  var toCalculate = eval(calcNum.join(""));
  if (toCalculate.length > 7) {
    toCalculate = shrinkNum(toCalulate);
  }
  $(".viewport").html(toCalculate);
  lastButton = "equal";
  currentNum = "";
  isPercentage = false;
  isDecimal = false;
}

//    Clear Entry
//      Only works for currentNum, not operators
function clearEntry() {
  if (lastButton === "num") {
    currentNum = "";
    $(".viewport").html(currentNum);
    lastButton = "";
    isPercentage = false;
    isDecimal = false;
  }
}

//    Clear All
//      Clears all variables back to original values
function clearAll() {
  calcNum = [];
  currentNum = "";
  lastButton = "";
  lastNum = "";
  lastOper = "";
  isPercentage = false;
  isDecimal = false;
  $(".viewport").html("");
}







