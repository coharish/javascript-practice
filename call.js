function callFn(context, ...args) {
    let callerFn = this;
    let fnContext = context;

    if (!fnContext) {
        fnContext = globalThis;
    }

    let uniqueProp = `uniqueCaller${Math.floor(Math.random()*10000)}`;
    while(fnContext[uniqueProp]) {
        uniqueProp = Math.random();
    }

    fnContext.uniqueProp = callerFn;
    console.log(uniqueProp);
    
    const result = fnContext.uniqueProp(...args);
    delete fnContext.uniqueProp;

    return result;
}

Function.prototype.callFn = callFn;

function greetUser(arg1, arg2, arg3) {
    console.log(`Hello ${this.name}`, arg1, arg2, arg3);
}
console.log(greetUser.callFn({name: 'Har'}, 1, 2, 3, 4));