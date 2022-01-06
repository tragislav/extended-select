'use strict';

const container = document.querySelector('.container');

// Extended Select
class ExtendedSelect {
    constructor(element, labelText) {
        this.select = document.querySelector(`select[name=${element}]`);
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

        this.modalHeader = document.createElement('div');
        this.modalHeader.classList.add('modal-header');
        this.modalHeader.innerHTML = 'Какой-то контент';

        this.modalBody = document.createElement('div');

        this.modalFooter = document.createElement('div');
        this.modalFooter.classList.add('modal-footer');

        this.closeBtn = document.createElement('span');
        this.closeBtn.innerHTML = '&times;';
        this.closeBtn.classList.add('close');

        this.clearBtn = document.createElement('button');
        this.clearBtn.innerHTML = 'Очистить';
        this.clearBtn.classList.add('clearBtn');

        this.acceptBtn = document.createElement('button');
        this.acceptBtn.innerHTML = 'Применить';
        this.acceptBtn.classList.add('acceptBtn');

        this.modalItemsListContent = document.createElement('div');
        this.modalItemsListContent.classList.add('modal-list');

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
        // Modal appends
        container.appendChild(this.modal);
        this.modal.appendChild(this.modalContent);
        this.modalContent.appendChild(this.modalHeader);
        this.modalContent.appendChild(this.modalBody);
        this.modalContent.appendChild(this.modalFooter);
        this.modalHeader.appendChild(this.closeBtn);
        this.modalBody.appendChild(this.modalItemsListContent);
        this.modalFooter.appendChild(this.acceptBtn);
        this.modalFooter.appendChild(this.clearBtn);

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
            this.toDiselectedAll(this.select);

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
        for (let key of select) {
            const item = document.createElement('div');

            item.classList.add('modal-list__item');

            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.id = key.value;
            checkBox.classList.add('modal-list__item-checkbox');

            this.isSelected(key.value, checkBox, item);

            const itemLabel = document.createElement('p');
            itemLabel.innerHTML = key.label;
            itemLabel.classList.add('modal-list__item-text');

            item.append(checkBox, itemLabel);
            this.modalItemsListContent.appendChild(item);

            checkBox.addEventListener('change', (e) => {
                e.target.checked
                    ? this.toSelected(e.target.id, item)
                    : this.toDiselected(e.target.id, item);
            });
        }
    }

    isSelected(value, checkBox, parent) {
        if (this.select.children[value].defaultSelected) {
            parent.classList.add('selected');
            return (checkBox.checked = true);
        }
    }

    toSelected(value, parent) {
        parent.classList.add('selected');
        return this.select.children[value].setAttribute('selected', true);
    }

    toDiselectedAll(select) {
        for (let key of select) {
            this.select.children[key.value].removeAttribute('selected');
        }
    }

    toDiselected(value, parent) {
        parent.classList.remove('selected');
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

const aaa = new ExtendedSelect('region', 'Реализуемые товары');
const bbb = new ExtendedSelect('items', 'Реализуемые позиции');
