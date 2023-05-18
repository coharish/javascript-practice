const person = {
    name: 'DV'
};

function sayMyName() {
    console.log(`HEllo ${this.name}`);
}

var name = 'Harish';
window.name = 'hhh';
sayMyName();

sayMyName.call(person);