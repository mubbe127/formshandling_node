
const bio = document.querySelector('.bio')
const charCount = document.querySelector('#charCount')
bio.addEventListener('input', renderCharAmount)
charCount.textContent = bio.value.length;


function renderCharAmount(){
    charCount.textContent = bio.value.length;
}