const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toys = document.getElementById('toy-collection')
const newToyBtn = document.querySelector('#new-toy-btn')
const likeBtn = document.querySelector('.like-btn')



let addToy = false

// YOUR CODE HERE
function loadPage() {
  let arr = Array.from(toybox.children);
  for (const i of arr) {
    i.remove()
    }
    fetch('http://localhost:3000/toys').then(res => res.json()).then(data => {
    data.forEach(makeCard)
  })
}

loadPage()

function makeCard(data){
  const card = document.createElement('div')
  card.classList.add('card')
  card.classList.add(`${data.id}`)
  card.innerHTML += `<h2>${data.name}</h2>
  <img src=${data.image} class="toy-avatar" />
  <p><span>${data.likes}</span> Likes </p>
  <button class="like-btn">Like <3</button>`
  toys.append(card)
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


toyForm.addEventListener('submit', (evt) =>{
  evt.preventDefault()
  let newToyName = evt.target.name.value
  let newToyImg = evt.target.image.value

  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: 
{
  "Content-Type": "application/json",
  Accept: "application/json"
},
 
body: JSON.stringify({
  name: newToyName,
  image: newToyImg,
  likes: 0
})
  }).then(res => res.json()).then(data => {
    makeCard(data)
})

})

toys.addEventListener('click', (e) => {
  if (e.target.classList.value === 'like-btn') {
    let id = e.target.parentElement.classList[1]
    let likes = e.target.parentElement.children[2].innerText.charAt(0)
    let num = parseInt(`${likes}`) + 1
    debugger;
      fetch(`http://localhost:3000/toys/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: `${num}`
        }).then()
      })
  } else {}
})
// OR HERE!
