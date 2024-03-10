const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");
const listingSchema=new Schema({
  title:{
    type:String, 
    required:true,
  },
  description:String,
  image:{
    type:String,
    default:"https://images.freecreatives.com/wp-content/uploads/2016/12/Hotel-Service-Icons.jpg",
    set:(v) => v===" "?"https://images.freecreatives.com/wp-content/uploads/2016/12/Hotel-Service-Icons.jpg link":v,
  },
  price:Number,
  location:String,
  country:String,
  reviews:[{
    type:Schema.Types.ObjectId,
    ref:"Review",
  },
  ],
  owner:{ 
    type:Schema.Types.ObjectId,
    ref:"User",
  },
  
})
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id:{$in:listing,reviews}});
  }
  
}) 

const Listing=mongoose.model("Listing",listingSchema)
module.exports=Listing;