
class Character {
  constructor(name, gender, height, mass, hairColor, pictureUrl){
    this.name = name;
    this.gender = gender;
    this.height = height;
    this.mass = mass;
    this.hairColor = hairColor;
    this.pictureUrl = pictureUrl;
  }
 weight(otherChar, parent) {
  let span = document.createElement("span");
  if(this.mass === otherChar.mass){
    span.innerHTML =`${otherChar.name} weighs ${otherChar.mass}kg. The same weight as me! `
  } 
  else if(this.mass > otherChar.mass){
    span.innerHTML =`${otherChar.name} weighs ${otherChar.mass}kg. That's ${this.mass - otherChar.mass} kg less than me.`
  } else {
    span.innerHTML =`${otherChar.name} weighs ${otherChar.mass} kg. That's  ${otherChar.mass - this.mass } kg more than me.`;
  }
   parent.appendChild(span)
}

length(otherChar, parent){
  
  let span = document.createElement("span");
 
  if(this.height === otherChar.height){
    span.innerHTML =`${otherChar.name} is ${otherChar.height} cm tall. Exactly as tall as I am! `
  }
  else if(this.height > otherChar.height){
    span.innerHTML =`${otherChar.name} is ${otherChar.height} cm tall, which is ${this.height - otherChar.height}  cm shorter than me.`
  } else {
    span.innerHTML =`${otherChar.name} is ${otherChar.height} cm, which is ${otherChar.height - this.height} cm taller than me.`;
  }
   
  parent.appendChild(span)
}

gender_(otherChar, parent){
  let span = document.createElement("span");
 
  this.gender === otherChar.gender ? span.innerHTML =`${otherChar.name} and I are both  ${this.gender}.  ` : span.innerHTML = ` Unlike me, ${otherChar.name} is ${otherChar.gender}. `
  
  parent.appendChild(span)
}

hair_Color(otherChar, parent){
  let span = document.createElement("span");
  if(this.hairColor === otherChar.hairColor){
    span.innerHTML = `${otherChar.name} and I both have ${this.hairColor} hair.`
  }
  else{
    span.innerHTML = `${otherChar.name}s hair is ${otherChar.hairColor}.`
  }
  parent.appendChild(span)
}
  
}

let fetchChar = async (url) => {
  let response = await fetch(url)
  let data = await response.json()
  return data
}

const charDropdownOne = document.querySelector("#character_one");
const charDropdownTwo = document.querySelector("#character_two");
const selectCharactersBtn = document.querySelector(".selectCharacters");
const selectCharacterForm = document.querySelector(".selectCharacterForm");

const api = "https://swapi.dev/api/people/";

async function getCharOne(){
  let id1 = charDropdownOne.value;
  let charOneObj = await fetchChar(`${api}${id1}`)
  
  let {name, gender, height, mass, hair_color } = charOneObj
  let charOne = new Character(name, gender, Number(height), Number(mass), hair_color, `<img src="./images/${name}.jpeg" alt="Picture of ${name}">` );
  getCharTwo(charOne)
      
 }

async function getCharTwo(charOne){
  let id2 = charDropdownTwo.value;
  let charTwoObj = await fetchChar(`${api}${id2}`)
  let {name, gender, height, mass, hair_color } = charTwoObj
  let charTwo = new Character(name, gender, Number(height), Number(mass), hair_color, `<img src="./images/${name}.jpeg" alt="Picture of ${name}" >` );
   createCard(charOne, charTwo);
   return charTwo 
}

selectCharacterForm.addEventListener("submit", async function(e){
  e.preventDefault();
  if(charDropdownOne.value=="none"  || charDropdownTwo.value=="none"){
    return alert("You need to choose two characters")
    
  } else {
    
    getCharOne()
  }
});

const cardContainer = document.querySelector(".characters");
const charOneCard = document.querySelector(".charOne");
const charTwoCard = document.querySelector(".charTwo");

function createCard(char1, char2){
   
  let btnContainer = document.createElement("div");
  btnContainer.classList.add("btnContainer")
  btnContainer.innerHTML = `<div class="btnDiv"> <button class="btn" id="weight">weight</button>
  <button class="btn" id="length">length</button>
  <button class="btn" id="gender_">gender</button>
  <button class="btn" id="hair_Color">hair color</button> </div>`

  charOneCard.innerHTML = `<img class="charPic" src="./images/${char1.name}.jpeg" alt="Picture of ${char1.name}" class="image"> 
  <h2 class="name">${char1.name}</h2>
  ${btnContainer.innerHTML}
  `
  charTwoCard.innerHTML = `<img class="charPic" src="./images/${char2.name}.jpeg" alt="Picture of ${char2.name}" class="image"> 
  <h2 class="name">${char2.name}</h2>
  ${btnContainer.innerHTML}
  `
  
  let btns = document.querySelectorAll(".btn");

  btns.forEach((btn) => {
    btn.addEventListener("click", function(e){
      e.preventDefault();
      let parent = e.target.parentElement.parentElement;
      let f = e.target.id;
     
      if(parent.className.includes("charOne")){
        char1[f](char2, parent);
            
      } else{
        char2[f](char1, parent);
     }
    })
  });
};



