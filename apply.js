function applyFn(context, args) {
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
    
    const result = fnContext.uniqueProp(args);
    delete fnContext.uniqueProp;

    return result;
}

Function.prototype.applyFn = applyFn;

function greetUser(args) {
    console.log(`Hello ${this.name}`, args);
}
console.log(greetUser.applyFn({name: 'Har'}, ['aaa']));