function bindFn(context, args) {
    let caller = this;
    return function(...newArgs) {
        caller.apply(context, [...args, ...newArgs]);
    }
}

function printMe(...args) {
    console.log(this);
    console.log("Print", args);
}

Function.prototype.bindFn = bindFn;
let boundFn = printMe.bindFn({name: 'test'}, [1,2,3]);
boundFn(4);
boundFn(4, 5, 6);
boundFn('hello');