const express=require("express");
const router=express.Router({mergeParams:true})
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")

const Review = require('../models/review.js');

const Listing = require('../models/listing.js'); 

router.post("/",wrapAsync(async(req,res)=>{
   
  let{id}=req.params;
  let listing=await Listing.findById(req.params.id)
  let newReview= new Review(req.body.review)
  newReview.author=req.user._id;
  console.log(newReview.author)
  
  listing.reviews.push(newReview)
  
  await newReview.save()
  await listing.save();
  req.flash("success","New Review Created")
  console.log("new review saved")
  
  res.redirect(`/listings/${id}`);
  }))
  
  
  
 router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let{id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted")
    res.redirect(`/listings/${id}`);
  }));
  
  module.exports=router;