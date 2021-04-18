const endPoint = "http://localhost:3000/api/v1/museums"


document.addEventListener('DOMContentLoaded', () => {

    getMuseum()

    })

    function getMuseum() {
        fetch(endPoint)
        .then(res => res.json())
        .then(museums => {
            museums.data.forEach(museum => {
                const museumsMarkup = `
                <div data-id=${museum.id}>
                <img src=${museum.attributes.img_url} 
                height= "200" width="250">
                <h3>${museum.attributes.name}</h3>
                <h4>${museum.attributes.borough}</h4>
                <button data-id=${museum.id}>edit</button>
                </div>
                <br><br>`;
                document.querySelector('#museum-container').innerHTML += museumsMarkup
                
            })
    })
}
    
