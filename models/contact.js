const { Schema, model } = require("mongoose");
const Joi = require("joi");

// Mongoose - MODEL,SCHEMA
const contactSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "Name is required!"],
    },
    email: {
      type: String,
      unique: true,
      require: [true, "Email is required!"],
    },
    phone: {
      type: String,
      unique: true,
      require: [true, "Phone is required!"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

// JOI - SCHEMA

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const handleErrors = () => {
  console.log("error handler");
};

contactAddSchema.post("save", handleErrors);

const schemas = {
  contactAddSchema,
};
const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
