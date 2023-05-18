const throttle = (fn, delay) => {
    let flag = true;
    return function() {
        const context = this;
        args = arguments;
        if (flag) {
            fn.apply(context, args);
            flag = false;
            setTimeout(() => {
                flag = true;
            }, delay);
        }
    }
}

function getData() {
    console.log("Fetch data")
}

const throttleFn = throttle(getData, 1000);

window.addEventListener('resize', throttleFn);