const User = require("../model/User");
const Profile = require("../model/profile");
const { validationResult } = require("express-validator");
const axios = require("axios");
const config = require("../config/config.json");
const request = require("request");
const getMyProfile = async(req, res) => {
    console.log(req.user);
    try {
        let profile = await Profile.findOne({ user: req.user.id }).populate(
            "user", ["name", "avater"]
        );
        console.log(profile)
        if (!profile) {
            return res.status(404).json({
                message: "there is no profile of this user",
            });
        }
        return res.json(profile);
    } catch (e) {
        res.status(400).json(e);
    }
};

const createOrUpdateProfile = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const {
        company,
        website,
        location,
        status,
        skills,
        bio,
        githubusername,
        facebook,
        twitter,
        youtube,
        instagram,
        linkedin,
    } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) {
        profileFields.company = company;
    }
    if (website) {
        profileFields.website = website;
    }
    if (location) {
        profileFields.location = location;
    }
    if (status) {
        profileFields.status = status;
    }
    if (skills) {
        profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }
    if (bio) {
        profileFields.bio = bio;
    }
    if (githubusername) {
        profileFields.githubusername = githubusername;
    }

    //build social object
    profileFields.social = {};
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (youtube) profileFields.social.youtube = youtube;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
            return res.json(profile);
        }
        profile = new Profile(profileFields);
        await profile.save();
        return res.json(profile);
    } catch (e) {
        return res.status(500).json({
            error: "Server Error",
        });
    }
};

const getAllProfile = async(req, res) => {
    try {
        const profiles = await Profile.find().populate("user", ["name", "avater"]);
        if (!profiles) {
            res.json({
                error: "no profile found",
            });
        }
        return res.json(profiles);
    } catch (error) {
        res.status(500).json({
            error: "Server Error",
        });
    }
};
const getProfileById = async(req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.userId,
        }).populate("user", ["name", "avater"]);
        if (!profile) {
            res.json({
                error: "no profile found",
            });
        }
        return res.json(profile);
    } catch (error) {
        res.status(500).json({
            error: "Server Error",
        });
    }
};

const deleteProfileUserAndPost = async(req, res) => {
    try {
        console.log(req.user.id);
        //todo delete posts

        //delete profile
        const profile = await Profile.findOneAndRemove({ user: req.user.id });
        console.log(profile);

        //delete user
        const user = await User.findOneAndRemove({ _id: req.user.id });
        console.log(user);

        return res.json({
            success: "user is deleted",
        });
    } catch (error) {
        res.status(500).json({
            error: "server error",
        });
    }
};


const updateProfileExperience = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const { title, company, location, from, to, current, description } = req.body;
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);
        await profile.save();
        return res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "server error",
        });
    }
};


const deleteProfileExperience = async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        //get the remove index

        const removedIndex = profile.experience
            .map(item => item._id)
            .indexOf(req.params.experienceId);

        //removing the item from the array
        if (removedIndex != "-1") {
            profile.experience.splice(removedIndex, 1);
            //saving profile
            await profile.save();
            return res.json(profile);
        }
        return res.status(404).json({
            error: "this experience doesnot exist"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "serve error",
        });
    }
};

const updateProfileEducation = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const { school, degree, fieldofstudy, from, to, current } = req.body;
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu);
        await profile.save();
        return res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "server error",
        });
    }
};

const deleteProfileEducation = async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        //get the remove index

        const removedIndex = profile.education
            .map(item => item._id)
            .indexOf(req.params.educationId);
        console.log(req.params.educationId)

        //removing the item from the array
        if (removedIndex != "-1") {
            profile.education.splice(removedIndex, 1);
            //saving profile
            await profile.save();
            return res.json(profile);
        }
        return res.status(404).json({
            error: "this education doesnot exist"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "serve error",
        });
    }
};

const getGithubUserRepos = (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.githubClientId}&client_secret=${config.githubClientSecret}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        }
        request(options, (error, response, body) => {
            if (error) {
                console.log(error)
            }
            if (response.statusCode !== 200) {
                console.log("profile not found")
            }
            res.json(JSON.parse(body));
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Server Error"
        })
    }
}

module.exports = {
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
};