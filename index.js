const getDiffs = (seq) => {
  let array = [];

  // goes until seq.length - 1 so that you arent looking outside the array range
  for (var i = 0; i < seq.length - 1; i++) {
    array[i] = (seq[i + 1] - seq[i]).toFixed(5);
    // .toFixed in javascript allows for 5 digits after a decimal
  }
  // returns the list of 'differences' between each set of numbers
  return array;
};

const isLinear = (seq) => {
  // gets the list of differences from above
  let nums = getDiffs(seq);
  let answer = true; // assume its linear, and just check for different numbers

  for (var i = 1; i <= nums.length - 1; i++) {
    if (nums[i] !== nums[i - 1]) { // if any 2 numbers are different, say false
      answer = false;
      break;
    }
  }
  return answer;

};

const isQuadratic = (seq) => {
  // true when seq is NOT linear, and the diffs from the seq ARE linear
  if (!isLinear(seq) && isLinear(getDiffs(seq))) {
    return true;
  }
  return false;
};

const getRatios = (seq) => {
  let array = [];
  // same as getDiffs, but with a divide
  // goes until seq.length - 1 so that you arent looking outside the array range
  for (var i = 0; i < seq.length - 1; i++) {
    array[i] = (seq[i + 1] / seq[i]).toFixed(5);
    // .toFixed in javascript allows for 5 digits after a decimal
  }
  // returns the list of 'quotients' between each set of numbers
  return array;
};

const isGeometric = (seq) => {
  // basically isLinear, but with the ratios
  // gets the list of ratios from above
  let nums = getRatios(seq);
  let answer = true; // assume its geometric, and just check for different numbers

  for (var i = 1; i <= nums.length - 1; i++) {
    if (nums[i] !== nums[i - 1]) { // if any 2 numbers are different, say false
      answer = false;
      break;
    }
  }
  return answer;
};

const getLinearParameters = (mxPlusB) => {
  // split by every space, create placeholder for m and b from the equation
  let m = [];
  let b = [];
  let chars = mxPlusB.split("");
  let xIndex = chars.indexOf('x'); // we know where x is now. So we can split things off

  for (var i = 0; i < xIndex; i++) {
    // put each character into an array called m. We join it together to make a string later
    m.push(chars[i]);
  }

  // checks for either a positive b or a negative b (since we would need the '-')
  if (chars[xIndex + 1] === "-") {
    for (var j = xIndex + 1; j < chars.length; j++) {
      // put each character into an array called b. We join it together to make a string later
      b.push(chars[j]);
    }
  } else {
    for (var k = xIndex + 2; k < chars.length; k++) {
      // put each character into an array called b. We join it together to make a string later
      b.push(chars[k]);
    }
  }
  

  // return array with m and b in it. m comes first
  // .join('') is like the reverse of.split('')
  return [m.join(''), b.join('')];
};

const linearTransformation = (seq, mxPlusB) => {
  // get [m, b]
  let slope = getLinearParameters(mxPlusB);
  let array = []; //to be returned
  // for every number in the seq
  seq.forEach(function(number) {
    // do the math that the function required
    let answer = (slope[0] * number) + parseInt(slope[1]);
    // place into array
    array.push(answer);
  });
  // return array
  return array;
};

const linearSequence = (numTerms, mxPlusB) => {
  // create seq of the numbers
  let seq = [];
  for (var i = 1; i < numTerms; i++) {
    seq.push(i);
  }
  // use the above function with the seq you just created
  return linearTransformation(seq, mxPlusB);
};

const getLinearEquation = (seq) => {
  // basically just taking data from different places
  let difference = parseInt(getDiffs(seq)[0]); //the is m in mx + b
  // give the beginning part of the equation 
  let answer = difference + "x";

  // check to see if b is going to be positive or negative
  if (seq[0] - difference > 0) {
    // add a '+' if positive
    answer += "+" + (seq[0] -  difference);
  } else if (seq[0] - difference < 0) {
    // negative is already there if negative
    answer += (seq[0] -  difference);
  }
  // return the slope function
  return answer;
};








