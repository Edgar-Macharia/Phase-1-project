const content = document.querySelector('#content')
const clearBtn = document.querySelector('.clear')
const searchBtn = document.querySelector('.search-btn')
const term = document.querySelector('#word p')
const phonetics = document.querySelector('#word span')
const audioBtn = document.querySelector('#audio')
const definition = document.querySelector('.meaning')
const description = document.querySelector('.meaning2')
const synonyms = document.querySelector('.synonyms')

content.classList.add('hidden');

searchBtn.addEventListener('click', () => {
    content.classList.remove('hidden');
    let word = document.getElementById('text').value;
    console.log(word);

fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
.then (res => res.json())
.then (data => {
console.log(data);

    term.textContent = `${data[0].word}`;
    phonetics.textContent = `${data[0].phonetics[0].text}`;
    audioBtn.addEventListener('click', () =>{
        const audio = new Audio(data[0].phonetics[0].audio);
        if (audio){
            audio.play();
            
        } else{
            alert('Pronunciation not found!')      
        }
  
    })
    definition.textContent = `${data[0].meanings[0].definitions[0].definition}`
    description.textContent = `${data[0].meanings[0].definitions[1].definition}`
        if (description.textContent === ''){
            description.textContent = '';
        }
    synonyms.textContent = `${data[0].meanings[0].synonyms}`


    clearBtn.addEventListener('click', () =>{
       
        let input = document.querySelector('#text')
         input.value = '';
         content.classList.add('hidden');
         location.reload();
    })

   })
.catch(error => {
    alert('No Definitions Found! Try Another word')
      console.log(error.message)    
    }) 

})
