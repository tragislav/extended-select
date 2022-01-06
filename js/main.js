'use strict';

const container = document.querySelector('.container');

// Extended Select
class ExtendedSelect {
    constructor(element, labelText) {
        this.select = document.querySelector(element);
        this.labelText = labelText;

        this.select.setAttribute('size', 1);

        // PAGE
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

        this.clearBtn = document.createElement('button');
        this.clearBtn.innerHTML = 'Очистить';

        this.acceptBtn = document.createElement('button');
        this.acceptBtn.innerHTML = 'Применить';

        this.modalItemsListContent = document.createElement('div');

        this.label.innerHTML = this.labelText;
        this.infoBtn.innerHTML = `Показать выбранное (${this.selectedValue(
            this.select
        )})`;

        // APPENDS
        this.mainDiv.appendChild(this.titleDiv);
        this.titleDiv.appendChild(this.label);
        this.titleDiv.appendChild(this.infoBtn);
        this.mainDiv.appendChild(this.select);
        container.appendChild(this.mainDiv);
        container.appendChild(this.modal);
        this.modal.appendChild(this.modalContent);
        this.modalContent.appendChild(this.closeBtn);
        this.modalContent.appendChild(this.clearBtn);
        this.modalContent.appendChild(this.acceptBtn);

        this.infoBtn.addEventListener('click', () => {
            this.openModal();
        });
        this.acceptBtn.addEventListener('click', () => {
            console.log('Данные успешно изменены...');
            this.closeModal();
        });
        this.closeBtn.addEventListener('click', () => {
            this.closeModal();
        });
        this.select.addEventListener('click', () => {
            this.openModal();
        });
        this.clearBtn.addEventListener('click', () => {
            for (let key of this.select) {
                this.toDiselected(key.value);
            }
            while (this.modalItemsListContent.firstChild) {
                this.modalItemsListContent.removeChild(
                    this.modalItemsListContent.lastChild
                );
            }
            this.modalItemsList(this.select);
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
        this.infoBtn.innerHTML = `Показать выбранное (${this.selectedValue(
            this.select
        )})`;
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
                e.target.checked
                    ? this.toSelected(e.target.id)
                    : this.toDiselected(e.target.id);
            });
        }
    }

    reRender(element, parent) {
        parent.removeChild(element);
        return parent.appendChild(element);
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

    selectedValue(select) {
        let counter = 0;
        for (let children of select) {
            children.selected ? counter++ : null;
        }

        return counter;
    }
}

const aaa = new ExtendedSelect('.visually-hidden', 'Реализуемые товары');
