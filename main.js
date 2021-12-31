'use strict';

const container = document.querySelector('.container');
const select = container.querySelector('.visually-hidden');

// Extended Select
class ExtendedSelect {
    constructor(select, labelText) {
        this.select = select;
        // this.class = this.select.className;
        this.labelText = labelText;
        this.buttonText = `Посмотреть выбранное`;
        this.select.setAttribute('size', 1);

        this.mainDiv = document.createElement('div');
        this.titleDiv = document.createElement('div');
        this.label = document.createElement('h3');
        this.btn = document.createElement('button');

        this.label.innerHTML = this.labelText;
        this.btn.innerHTML = this.buttonText;

        this.mainDiv.appendChild(this.titleDiv);
        this.titleDiv.appendChild(this.label);
        this.titleDiv.appendChild(this.btn);
        this.mainDiv.appendChild(this.select);
        container.appendChild(this.mainDiv);
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

const aaa = new ExtendedSelect(select, 'Реализуемые товары');

aaa.btn.addEventListener('click', () => alert('Hello World!'));
