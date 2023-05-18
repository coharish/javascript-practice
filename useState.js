const ReactX = (() => {
    let hooks = [];
    let index = 0;

    const useState = (initialValue) => {
        const localIndex = index;
        index++;
        if (hooks[localIndex] === undefined) {
            hooks[localIndex] = initialValue;
        }
        const setterFunction = (value) => {
            hooks[localIndex] = value;
        }
        return [hooks[localIndex], setterFunction];
    }
    const resetIndex = () => {
        index = 0;
    }

    const useEffect = (cb, dependencyArray) => {
        let hasChanged = true;
        let previousDependencies = hooks[index];
        
        if (previousDependencies) {
            hasChanged = false;
            previousDependencies.forEach((dependency, index) => {
                hasChanged = !Object.is(dependency, dependencyArray[index]);
            });
        } 
        
        if (hasChanged) {
            cb();
            hasChanged = false;
        }

        hooks[index] = dependencyArray;
        index++;
        
    }

    return {
        useState,
        resetIndex,
        useEffect
    }
})();

const {useState, resetIndex, useEffect} = ReactX;

const Component = () => {
    const [state, setState] = ReactX.useState(0);
    // const [state2, setState2] = ReactX.useState(10);
    console.log(state);

    useEffect(() => {
        console.log("useEffect");
    }, [state])

    if (state === 0) {
        setState(1);
    }

    if (state === 1) {
        setState(2);
    }
}
Component();
resetIndex();
Component();
resetIndex();
Component();