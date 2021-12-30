'use strict';

const container = document.querySelector('.container');
const select = container.querySelector('.visually-hidden');

class ExtendedSelect {
    constructor(select) {
        this.class = select.className;
        this.options = [...select.children];
    }

    watch() {
        console.log(this.options);
    }
}

console.log(select);

const aaa = new ExtendedSelect(select);
