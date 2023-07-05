// JavaScript program check if characters in the input string
// follows the same order as determined by characters
// present in the given pattern
// Function to check if characters in the input string
// follows the same order as determined by characters
// present in the given pattern
function checkPattern(str, pattern) {
  // len stores length of the given pattern
  var len = pattern.length;

  // if length of pattern is more than length of
  // input string, return false;
  if (str.length < len) {
    return false;
  }

  for (var i = 0; i < len - 1; i++) {
    // x, y are two adjacent characters in pattern
    var x = pattern[i];
    var y = pattern[i + 1];

    // find index of last occurrence of character x
    // in the input string
    var last = str.lastIndexOf(x);

    // find index of first occurrence of character y
    // in the input string
    var first = str.indexOf(y);

    // return false if x or y are not present in the
    // input string OR last occurrence of x is after
    // the first occurrence of y in the input string
    if (last === -1 || first === -1 || last > first) {
      return false;
    }
  }

  // return true if string matches the pattern
  return true;
}

// Driver code
var str = "engineers rock";
var pattern = "gsr";

document.write(checkPattern(str, pattern));

// This code is contributed by rdtank.
