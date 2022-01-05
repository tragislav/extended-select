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

        this.modalItemsListContent = document.createElement('div');

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

        this.modalItemsList(this.select);
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

    modalItemsList(select) {
        this.modalItemsListContent.classList.add('modal-list');

        this.modalContent.appendChild(this.modalItemsListContent);

        for (let key of select) {
            const item = document.createElement('div');

            item.classList.add('modal-list__item');

            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.id = key.value;

            this.isSelected(key.value, checkBox);

            const itemLabel = document.createElement('p');
            itemLabel.innerHTML = key.label;

            item.append(checkBox, itemLabel);
            this.modalItemsListContent.appendChild(item);

            checkBox.addEventListener('change', (e) => {
                console.log(e.target.id);
                e.target.checked
                    ? this.toSelected(e.target.id)
                    : this.toDiselected(e.target.id);
            });
        }
    }

    isSelected(value, checkBox) {
        if (this.select.children[value].defaultSelected) {
            return (checkBox.checked = true);
        }
    }

    toSelected(value) {
        return this.select.children[value].setAttribute('selected', true);
    }

    toDiselected(value) {
        return this.select.children[value].removeAttribute('selected');
    }
}

const aaa = new ExtendedSelect('.visually-hidden', 'Реализуемые товары');
