function reduceFn(cb, initialValue) {
    let accumulator = initialValue;
    for(let i=0; i<this.length; i++) {
        accumulator = cb(accumulator, this[i], i);
    }
    return accumulator;
}


Array.prototype.reduceFn = reduceFn;

console.log([1, 2, 3, 4].reduceFn((acc, currentValue) => acc + currentValue, 0));
