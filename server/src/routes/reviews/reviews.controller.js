const reviewModel = require("../../models/reviews/reviews.model");

async function httpGetAllReviews(req, res) {
    return res.status(200).json(await reviewModel.getAllReviews());
}

async function httpPostReview(req, res) {
    return res.status(200).json(await reviewModel.postReview(req.body));
}

async function httpGetReview(req, res) {
    const {id}= req.params;
    return res.status(200).json(await reviewModel.getReview(id));
    
}

async function httpUpdateReview(req, res) {
    const {id}=req.params;
    return res.status(200).json(await reviewModel.updateReview(id,req.body));

}

async function httpDelReview(req, res) {
    const {id} = req.params;
    return res.status(200).json(await reviewModel.delReview(id));
}

module.exports = {
  httpGetAllReviews,
  httpPostReview,
  httpGetReview,
  httpUpdateReview,
  httpDelReview,
};