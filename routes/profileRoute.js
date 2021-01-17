const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const {
  getMyProfile,
  createOrUpdateProfile,
  getAllProfile,
  getProfileById,
  deleteProfileUserAndPost,
  updateProfileExperience,
  deleteProfileExperience,
  updateProfileEducation,
  deleteProfileEducation,
  getGithubUserRepos
} = require("../controllers/profileController");
const { check } = require("express-validator");

//  @route Get /api/profile/me
//  @desc get logged in user profile
//  @access private
router.get("/me", authMiddleware, getMyProfile);

//  @route Post /api/profile
//  @desc Profile create or update
//  @access private
router.post("/", authMiddleware, [
  check("status", "status field is required").not().isEmpty(),
  check('skills',"skills field is required").not().isEmpty(),
],createOrUpdateProfile);

//  @route Get /api/profile/all
//  @desc Get All Profile
//  @access public
router.get("/all", getAllProfile);

//  @route Get /api/profile/user/profile/:userId
//  @desc Get Profile by User ID
//  @access public
router.get("/user/profile/:userId", getProfileById);

//  @route Delete api/profile
//  @desc Delete Profile, user and posts
//  @access private
router.delete("/", authMiddleware,deleteProfileUserAndPost);

//  @route put api/profile/experience
//  @desc add profile experience
//  @access private
router.put("/experience",authMiddleware,[
    check('title',"title is required")
    .not()
    .isEmpty(),
    check('company',"company is required")
    .not()
    .isEmpty(),
    check('from',"From date is required")
    .not()
    .isEmpty()
], authMiddleware,updateProfileExperience);

//  @route put api/profile/experience/:experienceId
//  @desc deleting experience from profile
//  @access private
router.delete("/experience/:experienceId",authMiddleware,deleteProfileExperience)

//  @route put api/profile/education
//  @desc add profile experience
//  @access private
router.put("/education",authMiddleware,[
  check('school',"school is required")
  .not()
  .isEmpty(),
  check('degree',"degree is required")
  .not()
  .isEmpty(),
  check('fieldofstudy',"field of study is required")
  .not()
  .isEmpty(),
  check('from',"From date is required")
  .not()
  .isEmpty()
], authMiddleware,updateProfileEducation);

//  @route put api/profile/education/:educationId
//  @desc deleting experience from profile
//  @access private
router.delete("/education/:educationId",authMiddleware,deleteProfileEducation)


//  @route get api/profile/github/:username
//  @desc get user repos from github
//  @access public
router.get("/github/:username",getGithubUserRepos)
module.exports = router;
