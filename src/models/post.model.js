import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },

    content: {
        type: String,
        required: true
    },
    
    tags: {
        type: [String],
        lowercase: true,
        trim: true
    },

    category: {
        type: String,
        default: "general"
    },

    published: {
        type: Boolean,
        default: false
    },
    
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },

    views: {
        type: Number,
        default: 0
    }
})

postSchema.pre('save', function(next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }
  next()
})

const Post = mongoose.model("Post", postSchema);
export default Post;