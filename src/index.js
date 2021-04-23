const endPoint = "http://localhost:3000/api/v1/museums";
const endPoint2 = "http://localhost:3000/api/v1/reviews"



document.addEventListener('DOMContentLoaded', () => {

    // getMuseum()
    // getReview()


    const writeReview = document.querySelector("#write-review-form")
    
    writeReview.addEventListener("submit", (e) => formHandler(e))


    })

    function formHandler(e) {
        e.preventDefault()
        console.log("i am working");

        const reviewInput = document.querySelector('#review-post').value
        const rate = document.querySelector('#rating').value
        const museum_id= document.querySelector('#museum-id').value
        const ratingInput = parseInt(rate)
        const museumInput = parseInt(museum_id)  

        postReview(reviewInput, ratingInput, museumInput)
    }

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
            console.log(review);

                const reviewData = review.data
        //   // render JSON response
                const reviewMarkup = `
                <div data-id=${review.id}>
                    <img src=${reviewData.attributes.museum.img_url} height= "200" width="">
                    <h4>Musuem: ${reviewData.attributes.museum.name}</h4>
                    <h3>Review: ${reviewData.attributes.review_post}</h3>
                    <h3>Rating: ${reviewData.attributes.rating}</h3>
                    <button data-id=${reviewData.id}>delete</button>
           </div>
           <br><br>`;
      
          document.querySelector('#review-container').innerHTML += reviewMarkup;
            document.getElementById('write-review-form').reset();

        })

    }














//     function getMuseum() {
//         fetch(endPoint)
//         .then(res => res.json())
//         .then(museums => {
//             // debugger
//             museums.data.forEach(museum => {
//                 const museumsMarkup = `
//                 <div data-id=${museum.id}>
//                 <img src=${museum.attributes.img_url} 
//                 height= "200" width="">
//                 <h3>${museum.attributes.name}</h3>
//                 <h4>${museum.attributes.borough}</h4>
//                 </div>
//                 <br>`;
//                 document.querySelector('#museum-container').innerHTML += museumsMarkup
                
//             })
//     })
    
// }

// function getReview(){
//     fetch(endPoint2)
//     .then(res => res.json())
//     .then(reviews => {
//         reviews.data.forEach(review =>{
//             const reviewsMarkup = `
//             <div data-id=${review.id}> 
//             <h3>Review: ${review.attributes.review_post}</h3>
//             <h4>Rating: ${review.attributes.rating}</h4>
//             <button data-id=${review.id}>delete</button>

//             </div>    
//             <br>`; 
//             document.querySelector('#review-container').innerHTML += reviewsMarkup

//         })       
           
//     })            
        
// }
        

    