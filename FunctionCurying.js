function sum(a,b,c) {
    let result = a + b + b;
    return result;
}

console.log(sum(1,2,3));

function curry(fn) {
    return function(a) {
        return function(b) {
            return function(c) {
                return fn(a, b, c);
            }
        }
    }
}

const curreidSum = curry(sum);
console.log(curreidSum(1)(2)(3));


const add1 = curreidSum(1);
const add2 = add1(2);
const add3 = add2(3);

console.log(add3);