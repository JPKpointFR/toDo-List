import { createElements } from "../function/dom.js"

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */




export class TodoList {

    /**@type {Todo[]} */
    #todos = {}

    /**@type {HTMLUListElement} */
    #listElement = []

    /**@param {Todo[]} todos */
    constructor(todos) {
        this.#todos = todos
    }
    /**@param {HTMLElement} element */
    appendTo(element) {
        element.innerHTML = `<form class="d-flex pb-4">
            <input required="" class="form-control" type="text" placeholder="Acheter des patates..." name="title">
            <button class="btn btn-primary">Ajouter</button>
        </form>
        <main>
           

            <ul class="list-group">
                 
            </ul>
        </main>`
        this.#listElement = element.querySelector('.list-group')

        for (let todo of this.#todos) {
            const t = new TodoListItem(todo)
            this.#listElement.append(t.element)
        }
        element.querySelector('form').addEventListener('submit', e => this.onSubmit(e))
    }

    /**
     * 
     * @param {SubmitEvent} e 
     */
    onSubmit(e) {
        e.preventDefault()
        const form = e.currentTarget
        const title = new FormData(e.currentTarget).get('title').toString().trim()

        if (title === '') {
            return
        }
        const todo = {
            id: Date.now(),
            title: title,
            completed: false,
        }
        const item = new TodoListItem(todo)
        this.#listElement.prepend(item.element)
        form.reset()
    }
}

class TodoListItem {

    #element


    /**@type {Todo} */
    constructor(todo) {
        const id = `todo-${todo.id}`
        const li = createElements('li', {
            class: 'todo list-group-item d-flex align-items-center'
        })
        const checkbox = createElements('input', {
            type: 'checkbox',
            class: 'form-check-input',
            id: id,
            checked: todo.completed ? '' : null,
        })
        const label = createElements('label', {
            class: 'ms-2 form-check-label',
            for: id
        })
        label.innerText = todo.title
        const button = createElements('button', {
            class: 'ms-auto btn btn-danger btn-sm',
        })
        button.innerText = 'X'



        li.append(checkbox)
        li.append(label)
        li.append(button)

        button.addEventListener('click', (e) => this.remove(e))


        this.#element = li
    }
    /**
     * @return {HTMLElement} element 
     */
    get element() {
        return this.#element
    }

    /**
     * @param {PointEvent} e
     */
    remove(e) {
        e.preventDefault()
        this.#element.remove()
    }
}