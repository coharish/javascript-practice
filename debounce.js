const debounce = (fn, delay) => {
    let timer;
    return function() {
        const context = this;
        args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    }
}

function getData(event) {
    console.log("Fetch data for ", event.target.value)
}

const debouncedFn = debounce(getData, 500);