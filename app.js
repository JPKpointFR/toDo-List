import { TodoList } from "./components/todolist.js";
import { fetchJSON } from "./function/api.js";
import { createElements } from "./function/dom.js";


try {

  const todos = await fetchJSON('https://jsonplaceholder.typicode.com/todos?_limit=5')
  const list = new TodoList(todos)



  list.appendTo(document.querySelector('#todolist'))

} catch (e) {


  const alertElement = createElements('div', {
    class: 'alert alert-danger m-3',
    role: 'alert'
  })


  alertElement.innerText = 'Impossible de charger les éléments'
  document.body.prepend(alertElement)


}

