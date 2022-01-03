'use strict';

const container = document.querySelector('.container');

// Extended Select
class ExtendedSelect {
    constructor(element, labelText) {
        this.select = document.querySelector(element);
        this.labelText = labelText;

        this.buttonText = `Показать выбранное (${this.select.length}) / позже будет правильное значение`;
        this.select.setAttribute('size', 1);

        this.mainDiv = document.createElement('div');
        this.mainDiv.classList.add('select');

        this.titleDiv = document.createElement('div');
        this.titleDiv.classList.add('select-header');

        this.label = document.createElement('h3');
        this.label.classList.add('select-header__title');

        this.infoBtn = document.createElement('button');
        this.infoBtn.classList.add('select-header__button');

        // MODAL
        this.modal = document.createElement('div');
        this.modal.classList.add('modal');

        this.modalContent = document.createElement('div');
        this.modalContent.classList.add('modal-content');
        this.modalContent.innerHTML = 'Какой-то контент';

        this.closeBtn = document.createElement('span');
        this.closeBtn.innerHTML = '&times;';
        this.closeBtn.classList.add('close');

        this.label.innerHTML = this.labelText;
        this.infoBtn.innerHTML = this.buttonText;

        this.mainDiv.appendChild(this.titleDiv);
        this.titleDiv.appendChild(this.label);
        this.titleDiv.appendChild(this.infoBtn);
        this.mainDiv.appendChild(this.select);
        container.appendChild(this.mainDiv);
        container.appendChild(this.modal);
        this.modal.appendChild(this.modalContent);
        this.modalContent.appendChild(this.closeBtn);

        this.infoBtn.addEventListener('click', () => {
            this.openModal();
        });
        this.closeBtn.addEventListener('click', () => {
            this.closeModal();
        });
        this.select.addEventListener('click', () => {
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
    }

    openModal() {
        console.log('Opening modal...');
        this.modal.style.display = 'block';
    }

    closeModal() {
        console.log('Closing modal...');
        this.modal.style.display = 'none';
    }

    isSelected(value) {
        console.log(this.select.children[value].defaultSelected);
    }
}

const aaa = new ExtendedSelect('.visually-hidden', 'Реализуемые товары');
