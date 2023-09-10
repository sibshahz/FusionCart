const Attribute= require("./attributes.mongo");

async function getAllAttributes() {
    try {
    const attributes= await Attribute.find({});
    return attributes;        
    } catch (error) {
        console.log(error);
    }
}

async function postAttribute(attributeData) {
    try {
        const newAttribute= new Attribute(attributeData);
        await newAttribute.save();
        return newAttribute;
    } catch (error) {
        console.log(error);
    }
}

async function getAttribute(id) {
    try {
        const attribute= await Attribute.findById(id);
        return attribute;
    } catch (error) {
        console.log(error);
    }
}

async function updateAttribute(id, update) {
    try {
        const updatedAttribute= await Attribute.findByIdAndUpdate(id,update,{new: true});
        return updatedAttribute;
    } catch (error) {
        console.log(error);
    }
}

async function delAttribute(id) {
    try {
        const attributeDeleted=await Attribute.findByIdAndDelete(id);
        return attributeDeleted;
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
  getAllAttributes,
  postAttribute,
  getAttribute,
  updateAttribute,
  delAttribute,
};