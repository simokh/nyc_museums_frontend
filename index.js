const endPoint = "http://localhost:3000/api/v1/museums"
const endPoint2 = "http://localhost:3000/api/v1/reviews" 


document.addEventListener('DOMContentLoaded', () => {

    getMuseum()
    getReview()
    })

    function getMuseum() {
        fetch(endPoint)
        .then(res => res.json())
        .then(museums => {
            // debugger
            museums.data.forEach(museum => {
                const museumsMarkup = `
                <div data-id=${museum.id}>
                <img src=${museum.attributes.img_url} 
                height= "200" width="">
                <h3>${museum.attributes.name}</h3>
                <h4>${museum.attributes.borough}</h4>
                <button data-id=${museum.id}>edit</button>
                </div>
                <br>`;
                document.querySelector('#museum-container').innerHTML += museumsMarkup
                
            })
    })
}

function getReview(){
    fetch(endPoint2)
    .then(res => res.json())
    .then(reviews => {
        reviews.data.forEach(review =>{
            const reviewsMarkup = `
            <div data-id=${review.id}> 
            <h3>Review: ${review.attributes.review}</h3>
            <h4>Rating: ${review.attributes.rating}</h4>
            <button data-id=${review.id}>create</button>

            </div>    
            <br>`; 
            document.querySelector('#review-container').innerHTML += reviewsMarkup

                    })       

                })
            }
    
