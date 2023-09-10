const Tag = require("./tags.mongo");

async function getAllTags() {
    try {
    const tags= await Tag.find({});
    return tags;        
    } catch (error) {
        console.log(error);
    }
}

async function postTag(tagData) {
    try {
        const newTag= new Tag(tagData);
        await newTag.save();
        return newTag;
    } catch (error) {
        console.log(error);
    }
}

async function getTag(id) {
    try {
        const tag= await Tag.findById(id);
        return tag;
    } catch (error) {
        console.log(error);
    }
}

async function updateTag(id, update) {
    try {
        const updatedTag= await Tag.findByIdAndUpdate(id,update,{new: true});
        return updatedTag;
    } catch (error) {
        console.log(error);
    }
}

async function delTag(id) {
    try {
        const tagDeleted=await Tag.findByIdAndDelete(id);
        return tagDeleted;
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
  getAllTags,
  postTag,
  getTag,
  updateTag,
  delTag,
};