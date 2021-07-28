document.addEventListener("DOMContentLoaded", init)

const doggoURL = "http://localhost:3000/pups"

//jsonify the DB
function getDogs(){
  return fetch(doggoURL)
    .then(r => r.json())
}

//using the ID jsonify the ID
function getOneDog(id){
  return fetch(doggoURL + `/${id}`)
    .then(r => r.json() )
}

//UPdate DB when cliked using patch method 
function toggleGoodDog(id, newValue){
  //not sure if this was right, did some googling seems to return correctly in postman
    const options = {
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    //stringify the json data for manipulation
    body: JSON.stringify({
      isGoodDog: newValue
    })
  }
  return fetch(doggoURL + `/${id}`, options)
    .then(r => r.json())
}

//also runs when the page is loaded called in the DOMContentLoaded part
function init(e){
// use get dogs then add them to the spanbar
  getDogs().then(addAllDogsToDogBar)
}
//add all the dogs
function addAllDogsToDogBar(dogArray){
  const dogBar = document.querySelector("#dog-bar")
  dogBar.innerHTML = ""
    dogArray.forEach(addDogSpantoDogBar)
  }

  //adding the dogs to the bottom span when clicked
function addDogSpantoDogBar(dog){
  const dogBar = document.querySelector("#dog-bar")
  const dogSpan = document.createElement("span")
  dogSpan.innerText = dog.name
  dogSpan.dataset.id = dog.id
  //adding the click listener
  dogSpan.addEventListener("click", onDogSpanClick)
  //add it to span
  dogBar.append(dogSpan)
}
//event function to add the dog to span on click with cb method
function onDogSpanClick(event){
  getOneDog(event.target.dataset.id)
    .then(addDogInfoToPage)
}
//getting all the stuff and adding it using dot notation
function addDogInfoToPage(dog){
  const dogInfo = document.querySelector("#dog-info")
  dogInfo.innerHTML = ""
  const dogImg = document.createElement("img")
  dogImg.src = dog.image

  const dogTitle = document.createElement("h2")
  dogTitle.innerText = dog.name

  const dogButton = document.createElement("button")
  dogButton.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
  dogButton.dataset.id = dog.id
  dogButton.addEventListener("click", onGoodDogButtonClick)

  dogInfo.append(dogImg, dogTitle, dogButton)
}

//updating the good dog button on click
function onGoodDogButtonClick(e){
  let newValue;
  if (e.target.innerText.includes("Good")){
    e.target.innerText = "Bad Dog"
    newValue = false
  } else {
    e.target.innerText = "Good Dog"
    newValue = true
  }
  toggleGoodDog(e.target.dataset.id, newValue)
}

