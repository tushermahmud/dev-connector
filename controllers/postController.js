const Post = require("../model/Post");
const { validationResult } = require("express-validator")
const User = require("../model/User")
const Profile = require("../model/profile")


const createPost = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    try {
        console.log(req.user)
        let user = await User.findOne({ _id: req.user.id }).select('-password')
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avater: user.avater,
            user: req.user.id,
        })
        console.log(newPost)
        let post = await newPost.save()
        return res.json(post)

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "server error"
        })
    }
}

const getAllPosts = async(req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })
        return res.json(posts)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Server Error"
        })
    }
}
const getPostById = async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        if (!post) {
            return res.status(404).json({
                error: "there is no post of this id"
            })
        }
        return res.json(post)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "server error"
        })
    }
}

const deletePostById = async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        if (!post) {
            return res.status(404).json({
                error: "there is no post of this id"
            })
        }
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
                error: "you are not authorized to delete the post"
            })
        }
        post.remove()
        return res.json({
            success: "the post is deleted"
        })

    } catch (error) {
        console.log(error);
        return res.status(404).json({
            error: "post not found"
        })
    }
}

const likeThePost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
            //check if the post is already checked by the user

        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({
                error: "the post is already liked"
            })
        }

        post.likes.unshift({ user: req.user.id })
        await post.save();
        return res.json({
            success: "you have liked the post"
        })
    } catch (error) {
        console.log(error);
        return res.json({
            error: "Server Error"
        })
    }
}

const unlikeThePost = async(req, res) => {
    const post = await Post.findById(req.params.postId);
    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({
            error: "post is not liked yet"
        })
    }
    //get the removed index
    const removedIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
    post.likes.splice(removedIndex, 1)
    await post.save()
    return res.json(post.likes)
}
const createPostComment = async(req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()
        })
    }
    try {
        const user = await User.findById(req.user.id).select("-password");
        const post = await Post.findById(req.params.postId);
        const newComment = {
            user: req.user.id,
            text: req.body.text,
            name: user.name,
            avater: user.avater,
        }
        post.comments.unshift(newComment);
        const newPost = await post.save();
        return res.json(newPost);
    } catch (error) {
        res.status(500).jaon({
            error: "server error"
        })
    }
}

const deletePostComment = async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        //getting the comments from the post
        const comment = post.comments.findIndex(comment => req.params.commentId === comment.id);
        const commentUser = post.comments.find(comment => req.params.commentId === comment.id);

        //comments exists
        if (comment === -1) {
            return res.status(404).json({
                error: "no comment with this comment id"
            })
        }
        //check user
        console.log(commentUser.user.toString() !== req.user.id);
        if (commentUser.user.toString() !== req.user.id) {
            return res.status(401).json({
                error: "you are not authorized to delete the post"
            })
        }
        post.comments.splice(comment, 1);
        await post.save();

        return res.json(post)
    } catch (error) {
        return res.status(500).json({
            error: "SERVER ERROR"
        })
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    deletePostById,
    likeThePost,
    unlikeThePost,
    createPostComment,
    deletePostComment
};