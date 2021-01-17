const router = require("express").Router();
const { check } = require("express-validator");
const authMiddleware = require("../middlewares/auth");
const {
    createPost,
    getAllPosts,
    getPostById,
    deletePostById,
    likeThePost,
    unlikeThePost,
    createPostComment,
    deletePostComment
} = require("../controllers/postController");

//  @route put api/post
//  @desc adding posts
//  @access private
router.post(
    "/",
    authMiddleware, [check("text", "text is required").not().isEmpty()],
    createPost
);

//  @route get api/post
//  @desc getting all posts
//  @access private
router.get("/", authMiddleware, getAllPosts);

//  @route get api/post/:postId
//  @desc getting single post by id
//  @access private
router.get("/:postId", authMiddleware, getPostById);

//  @route delete api/post/:postId
//  @desc delete single post by id
//  @access private
router.delete("/:postId", authMiddleware, deletePostById);

//  @route put api/post/like/:postId
//  @desc delete single post by id
//  @access private
router.put("/like/:postId", authMiddleware, likeThePost);

//  @route put api/post/unlike/:postId
//  @desc delete single post by id
//  @access private
router.put("/unlike/:postId", authMiddleware, unlikeThePost);

//  @route post api/post/comment/:postId
//  @desc adding posts
//  @access private
router.post(
    "/comment/:postId",
    authMiddleware, [check("text", "text is required").not().isEmpty()],
    createPostComment
);

//  @route delete api/post/comment/:postId/:commentId
//  @desc adding posts
//  @access private
router.delete(
    "/comment/:postId/:commentId",
    authMiddleware, [check("text", "text is required").not().isEmpty()],
    deletePostComment
);

module.exports = router;