// let addToy = false;
// let toyCollection = document.querySelector('#toy-collection');

// const addBtn = document.querySelector("#new-toy-btn");
// const toyFormContainer = document.querySelector(".container");

// document.addEventListener("DOMContentLoaded", () => {
  
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//       toyFormContainer.addEventListener('submit', event => {
//         event.preventDefault()
//         submitNewToy(event.target)
//       })
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
  
// });

// function getAllToys() {
//   return fetch('http://localhost:3000/toys')
//     .then(res => res.json())
//     .then(toyArr => toyArr.forEach(renderToy))
//     .catch( function ( error ) {
//       document.body.innerHTML = error.message
//     } )
// }

// function renderToy(toy) {
//   let h2 = document.createElement('h2')
//   h2.innerText = toy.name

//   let img = document.createElement('img')
//   img.src = toy.image
//   img.setAttribute('class', 'toy-avatar')

//   let p = document.createElement('p')
//   p.innerText = `${toy.likes} likes`

//   let btn = document.createElement('btn')
//   btn.setAttribute('class', 'like-btn')
//   btn.innerText = "like"
//   btn.addEventListener('click', (e) => {
//     likes(e)
//   })

//   let div = document.createElement('div');
//   div.setAttribute('class', 'card')
//   div.append(h2, img, p, btn)
//   toyCollection.append(div);
// }

// function submitNewToy(toy) {
//   return fetch( 'http://localhost:3000/toys', {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//       }
//     body: JSON.stringify({
//       "name": toy.name.value,
//       "image": toy.img.value,
//       "likes": 0
//     })
//   }) 
// }

// getAllToys();

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let divCollect = document.querySelector('#toy-collection')


function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
}

function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0

      })
    })
    .then(res => res.json())
    .then((obj_toy) => {
      renderToys(obj_toy)
    })
}

function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}

function renderToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divCollect.append(divCard)
}


// add listener to 'Add Toy' button to show or hide form
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

// start by getting all toys

document.addEventListener('DOMContentLoaded', function () {
  getToys().then(toys => {
    toys.forEach(toy => {
      //function to render toys goes here or something
      renderToys(toy)
    })
  })
});
