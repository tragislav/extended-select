'use strict';

const container = document.querySelector('.container');
const select = container.querySelector('.visually-hidden');

class ExtendedSelect {
    constructor(select) {
        this.class = select.className;
    }

    watch() {
        console.log(select.children);
    }

    delete(value) {
        select.remove(value);
    }

    new(content) {
        let newOption = document.createElement('option');
        newOption.value = select.children.length;
        newOption.innerHTML = content;
        select.appendChild(newOption);
    }
}

console.log(select);

const aaa = new ExtendedSelect(select);
