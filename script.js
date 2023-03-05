

/**
 * Crée un élément HTML qui retourne un article
 * @param {(title:string, body:string)} post 
 * @return {HTMLElement}
 * return
 */

function createArticle(post) {

  const article = document.createElement('article')

  article.innerHTML = `
  <h2>${post.title}</h2>
  <p>${post.body}</p>
  <br><br>
  `
  return article
}


async function main() {

  const wrapper = document.querySelector('#lastposts')
  const loader = document.createElement('p')

  loader.innerText = 'chargement...'
  wrapper.append(loader)

  try {


    const r = await fetch('https://jsonplaceholder.typicode.com/posts?limit=5', {
      headers: {
        Accept: 'application/json'
      }
    })
    if (!r.ok) {
      throw new Error('Erreur serveur')
    }
    const posts = await r.json()


    loader.remove()
    for (let post of posts) {
      wrapper.append(createArticle(post))
    }


  } catch (error) {
    loader.innerText = 'Impossible de charger les articles'
    loader.style.color = 'red'
    return
  }
}
main()