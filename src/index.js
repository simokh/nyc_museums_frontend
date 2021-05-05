const endPoint = "http://localhost:3000/api/v1/museums";
const endPoint2 = "http://localhost:3000/api/v1/reviews";
const dReview = document.querySelector("#review-container")


document.addEventListener('DOMContentLoaded', () => {

    getMuseum()
    

    const writeReview = document.querySelector("#write-review-form")
    
    writeReview.addEventListener("submit", formHandler) 

    dReview.addEventListener("click", deleteHandler)

    getReview()

})
    // delete review function fetch request to BE destroy action 
    function deleteHandler(e) { 
        const id = parseInt(e.target.dataset.id);
        const review = Review.findReview(id);
        // debugger
        fetch((`http://localhost:3000/api/v1/reviews/${review.id}`), { 
            method: "DELETE",    
        })
        const ele = document.querySelector('[data-id]')
        dReview.removeChild(ele)
    }


    function formHandler(e) {
        e.preventDefault()
        console.log("yo you are clicking!")
        const reviewInput = document.querySelector('#review-post').value
        const rate = document.querySelector('#rating').value
        const museum_id= document.querySelector('#museum-id').value
        const ratingInput = parseInt(rate)
        const museumInput = parseInt(museum_id)  

        postReview(reviewInput, ratingInput, museumInput)
    }
    
    // creating a review by fetch request to BE via the create action
    function postReview(review_post, rating, museum_id) {
        // confirm these values are coming through properly
        console.log(review_post, rating, museum_id);
        // build body object
        const bodyData = {review_post, rating, museum_id}
        
        fetch(endPoint2, {
            method: "POST", 
            headers: {
                "content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(bodyData)   
    })
        .then(res => res.json())
        .then( review => {
                const reviewData = review.data.attributes
                const reviewID = review.data.id
                
                const newReview = new Review(reviewID, reviewData)

                document.querySelector('#review-container').innerHTML += newReview.renderReviewPost();
                const refreshForm = document.getElementById('write-review-form') 
                refreshForm.reset()
        })
    }

// indexing reviews 
function getReview(){
    fetch(endPoint2)
    .then(res => res.json())
    .then(reviews => {
        reviews.data.forEach(review =>{
            const newReview = new Review(review.id, review.attributes)
            document.querySelector('#review-container').innerHTML += newReview.renderReviewPost()
        })       
    })     
}


function getMuseum() {
    fetch(endPoint)
    .then(res => res.json())
    .then(museums => {
    //         // debugger
        museums.data.forEach(museum =>  {
            const mus = document.getElementById('museum-id')
            const ele = document.createElement('option')
            ele.value = museum.id 
            ele.innerText = museum.attributes.name
            mus.append(ele)
        })
    })
}


// var is globaly scoped 
// let and const are not

// if (true) {
//     var name = "simo"
// }
// console.log(name)

// console.log(this)  => Window 



