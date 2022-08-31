const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../helpers");

// Mongoose - MODEL,SCHEMA
const contactSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "Set name for contact!"],
    },
    email: {
      type: String,
      require: [true, "Email is required!"],
    },
    phone: {
      type: String,
      require: [true, "Phone is required!"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      // required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSchemaValidationErrors);

// JOI - SCHEMA

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});
const schemas = {
  contactAddSchema,
  updateFavoriteSchema,
};
const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
