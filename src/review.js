class Review {

    static all = []

    constructor(id, reviewAttri) {
        this.id = id;
        // debugger 
        this.img_url = reviewAttri.museum.img_url
        this.museum = reviewAttri.museum.name
        this.review_post = reviewAttri.review_post
        this.rating = reviewAttri.rating
        // debugger

        Review.all.push(this)
    }

    renderReviewPost() {
        return `
        <div data-id=${this.id}>
        <img src=${this.img_url} height= "200" width="">
        <h4>Museum: ${this.museum}</h4>
        <h3>Review: ${this.review_post}</h3>
        <h3>Rating: ${this.rating}</h3>
        <button id="delete-review" data-id=${this.id}>delete</button>
        </div>
        <br><br>`; 
    }

    static findReview(id) {
        return this.all.find( review => review.id == id);
    }
}






