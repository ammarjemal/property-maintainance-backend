const mongoose = require("mongoose");

const Joi = require("joi");

const AdminSchema = new mongoose.Schema({
  firstName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  lastName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  phoneNumber: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  email: {
    type: mongoose.Schema.Types.String,
  },
});

const Admin = mongoose.model("Admin", AdminSchema);

const validateAdmin = (Admin) => {
  const validationSchema = Joi.object({
    firstName: Joi.string().min(2).max(40),
    lastName: Joi.string().min(2).max(40),
    phoneNumber: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });
  return validationSchema.validate(Admin);
};

exports.Admin = Admin;
exports.validateAdmin = validateAdmin;
