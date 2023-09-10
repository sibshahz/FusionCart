const Review = require("./reviews.mongo");

async function getAllReviews() {
    try {
    const reviews= await Review.find({});
    return reviews;        
    } catch (error) {
        console.log(error);
    }
}

async function postReview(reviewData) {
    try {
        const newReview= new Review(reviewData);
        await newReview.save();
        return newReview;
    } catch (error) {
        console.log(error);
    }
}

async function getReview(id) {
    try {
        const review= await Review.findById(id);
        return review;
    } catch (error) {
        console.log(error);
    }
}

async function updateReview(id, update) {
    try {
        const updatedReview= await Review.findByIdAndUpdate(id,update,{new: true});
        return updatedReview;
    } catch (error) {
        console.log(error);
    }
}

async function delReview(id) {
    try {
        const reviewDeleted=await Review.findByIdAndDelete(id);
        return reviewDeleted;
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
  getAllReviews,
  postReview,
  getReview,
  updateReview,
  delReview,
};