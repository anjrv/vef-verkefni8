const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const items = document.querySelector('.items');

    text.init(form, items);
});

const text = (() => {
    let items;

    function init(_form, _items) {
        items = _items;
        _form.addEventListener('submit', formHandler);

        for (let item of items.querySelectorAll('.item')) {
            const checkbox = item.querySelector('.item__checkbox');
            checkbox.addEventListener('click', finish);

            const text = item.querySelector('.item__text');
            text.addEventListener('click', edit);

            const button = item.querySelector('.item__button');
            button.addEventListener('click', deleteItem);
        }
    }

    function formHandler(e) {
        e.preventDefault();
        const input = e.target.querySelector('.form__input');
        const text = input.value.trim();

        if (text !== '') {
            add(text);
            input.value = '';
        }
    }

    // event handler fyrir það að klára færslu
    function finish(e) {
        e.target.parentNode.classList.toggle('item--done');
    }

    // event handler fyrir það að breyta færslu
    function edit(e) {
        const tgt = e.target;
        const parent = e.target.parentNode;
        const input = el('input', 'item__edit');
        input.value = tgt.innerHTML;
        input.addEventListener('keyup', commit);

        const button = parent.querySelector('.item__button');
        tgt.parentNode.removeChild(tgt);
        parent.insertBefore(input, button);
        input.select();
    }

    // event handler fyrir það að klára að breyta færslu
    function commit(e) {
        const { keyCode, target } = e;

        if (keyCode !== ENTER_KEYCODE) {
            return;
        }

        const { value, parentNode } = target;
        parentNode.removeChild(target);

        const text = el('span', 'item__text', edit);
        text.appendChild(document.createTextNode(value));

        const button = parentNode.querySelector('.item__button');
        parentNode.insertBefore(text, button);

    }

    // fall sem sér um að bæta við nýju item
    function add(value) {
        const item = el('li', 'item');
        const checkbox = el('input', 'item__checkbox', finish);
        const text = el('span', 'item__text', edit);
        const button = el('button', 'item__button', deleteItem);

        checkbox.setAttribute('type', 'checkbox');
        text.appendChild(document.createTextNode(value));
        button.appendChild(document.createTextNode('Eyða'));

        item.appendChild(checkbox);
        item.appendChild(text);
        item.appendChild(button);
        items.appendChild(item);
    }

    // event handler til að eyða færslu
    function deleteItem(e) {
        const parent = e.target.parentNode;
        parent.parentNode.removeChild(parent);
    }

    // hjálparfall til að útbúa element
    function el(type, className, clickHandler) {
        const element = document.createElement(type);

        if (className) {
            element.classList.add(className);
        }

        if (clickHandler) {
            element.addEventListener('click', clickHandler);
        }

        return element;
    }

    return {
        init: init
    }
})();
