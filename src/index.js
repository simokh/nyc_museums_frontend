const endPoint = "http://localhost:3000/api/v1/museums";
const endPoint2 = "http://localhost:3000/api/v1/reviews";




document.addEventListener('DOMContentLoaded', () => {

    // getMuseum()
    

    const writeReview = document.querySelector("#write-review-form")
    
    writeReview.addEventListener("submit", (e) => formHandler(e))

    dReview = document.querySelector("#review-container")
    dReview.addEventListener("click", (e) => deleteHandler(e))

    getReview()

})
    // delete review function fetch request to BE destroy action 
    function deleteHandler(e) {
        e.preventDefault()
        const id = parseInt(e.target.dataset.id);
        const review = Review.findReview(id);
        fetch(`http://localhost:3000/api/v1/reviews/${review.id}`, {
            method: "DELETE",    
        })
        this.location.reload()
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
        let bodyData = {review_post, rating, museum_id}

        fetch(endPoint2, {
            method: "POST", 
            headers: {
                "content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(bodyData)
    })

        .then(res => res.json())
        .then(review => {
            // console.log(review);

                const reviewData = review.data.attributes
                const newReview = new Review(reviewData.id, reviewData)
                document.querySelector('#review-container').innerHTML += newReview.renderReviewPost(); 
                this.location.reload()
        })
    }

// indexing reviews 
function getReview(){
    fetch(endPoint2)
    .then(res => res.json())
    .then(reviews => {
        reviews.data.forEach(review =>{
            // const reviewsMarkup = `
            // <div data-id=${review.id}>
            // <img src=${review.attributes.museum.img_url} height= "200" width="">
            // <h3>Review: ${review.attributes.review_post}</h3>
            // <h4>Rating: ${review.attributes.rating}</h4>
            // <button data-id=${review.id}>delete</button>

            // </div>    
            // <br>`; 
            const newReview = new Review(review.id, review.attributes)
            // debugger
            document.querySelector('#review-container').innerHTML += newReview.renderReviewPost();

        })       
           
    })            
        
}


// indexing museums
    // function getMuseum() {
    //     fetch(endPoint)
    //     .then(res => res.json())
    //     .then(museums => {
    //         // debugger
    //         museums.data.forEach(museum =>  {
    //             const museumsMarkup = `
    //             <div data-id=${museum.id}>
    //             <img src=${museum.attributes.img_url} 
    //             height= "200" width="">
    //             <h4>${museum.attributes.name}</h4>
    //             <h3>${museum.attributes.borough}</h3>
    //             </div>
    //             <br>`;
    //             document.querySelector('#museum-container').innerHTML += museumsMarkup
                
    //         })
    //     })
    // }