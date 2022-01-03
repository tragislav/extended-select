'use strict';

const container = document.querySelector('.container');

// Extended Select
class ExtendedSelect {
    constructor(element, labelText) {
        this.select = document.querySelector(element);
        this.labelText = labelText;

        this.buttonText = `Посмотреть выбранное (${this.select.length})`;
        this.select.setAttribute('size', 1);

        this.mainDiv = document.createElement('div');
        this.titleDiv = document.createElement('div');
        this.label = document.createElement('h3');
        this.btn = document.createElement('button');

        this.modal = document.createElement('div');
        this.modal.style.width = '100%';
        this.modal.style.height = '100vh';
        this.modal.style.display = 'none';

        this.label.innerHTML = this.labelText;
        this.btn.innerHTML = this.buttonText;
        this.modal.innerHTML = 'arr';

        this.mainDiv.appendChild(this.titleDiv);
        this.titleDiv.appendChild(this.label);
        this.titleDiv.appendChild(this.btn);
        this.mainDiv.appendChild(this.select);
        container.appendChild(this.mainDiv);
        container.appendChild(this.modal);

        this.btn.addEventListener('click', () => {
            this.openModal();
        });
    }

    watch() {
        console.log(this.select.children);
    }

    delete(value) {
        this.select.remove(value);
    }

    new(content) {
        const newOption = document.createElement('option');
        newOption.value = this.select.children.length;
        newOption.innerHTML = content;
        this.select.appendChild(newOption);
        // this.buttonText = `Посмотреть выбранное (${this.select.length})`;
    }

    openModal() {
        alert('Hello World!');
        this.modal.style.display = 'inline';
    }

    isSelected(value) {
        console.log(this.select.children[value].defaultSelected);
    }
}

const aaa = new ExtendedSelect('.visually-hidden', 'Реализуемые товары');
