const endPoint = "http://localhost:3000/api/v1/museums"


document.addEventListener('DOMContentLoaded', () => {

    fetch(endPoint)
    .then(res => res.json())
    .then(museums => {
        console.log(museums);
    })
    
    
})