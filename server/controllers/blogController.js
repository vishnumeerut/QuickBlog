import fs from "fs";
import imagekit from "../config/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import main from "../config/gemini.js";

export const addBlog = async (req, res) => {
    try{
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;

        // check if all fields are present;

        if(!title || !description || !category || !isPublished){
            return res.json({success:false, message:"Missing Required fields"})
        }

        const fileBuffer = fs.readFileSync(imageFile.path);

        // Upload image to imagekit
        const response = await imagekit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder:"/blogs"
        })

        // optimization through imagekit URL transformation

        const optimzedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality:"auto"},
                {format:"webp"},
                {width:"1280"}
            ]
        })
        const image = optimzedImageUrl;
        
        await Blog.create({title, subTitle, description, category, image, isPublished})

        res.json({success:true, message:"Blog added Successfully"})

    }
    catch(error) {
        res.json({success:false, message:error.message})

    }
}


export const getallBlogs = async (req, res) => {
    try{
        const blogs = await Blog.find({isPublished:true})
        res.json({success:true, blogs})
    }
    catch(error) {
        res.json({success:false, message:error.message})
    }
}


export const getBlogById = async (req, res) => {
    try{
        const {blogId} = req.params;
        // console.log("id for single blog is:", blogId)
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.json({success:false, message:"Blog not found"})
        }
        res.json({success:true, blog})
    }
    catch(error) {
        res.json({success:false, message:error.message})
    }
}


export const deleteBlogById = async (req, res) => {
    try{
        const {id} = req.body;
        await Blog.findByIdAndDelete(id)


        // Delete all comments associated with blog
        await Comment.deleteMany({blog:id});
        res.json({success:true, message:"Blog deleted successfully"})

    }
    catch(error) {
        res.json({success:false, message:error.message})
    }
}


export const togglePublish = async (req, res) => {
    try{
        const {id} = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success:true, message:"Blog status updated"})
    }
    catch(error) {
        res.json({success:false, message:error.message})
    }
}


export const addComment = async (req, res) => {
    try{
        const {blog, name, content} = req.body;

        await Comment.create({blog, name, content});
        res.json({success:true, message:"Comment added for review"})
    }
    catch(error) {
        res.json({success:false, message:error.message})
    }
}


export const getBlogComments = async (req, res) => {
    console.log("function called.")
    try{
        const {id} = req.params;
        const comments = await Comment.find({blog:id, isApproved:true}).sort({createdAt:-1})
        res.json({success:true, comments})

    }
    catch(error) {
        res.json({success:false, message:error.message})
    }
}


export const generateContent = async (req, res) => {
    try{
        const {prompt} = req.body;
        const content = await main(prompt + "Generate a blog content for this topic in simple text format")
        res.json({success:true, content})

    }
        catch(error) {
        res.json({success:false, message:error.message})
    }
}