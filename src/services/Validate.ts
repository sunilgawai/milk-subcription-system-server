import Joi from "joi";

class Validate {
  static registorBodyValidator(body: any) {
    const schema = Joi.object({
      name: Joi.string().min(4).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(30).required(),
      confirmPassword: Joi.ref("password"),
    });
    return schema.validate(body);
  }
  // Login Body Validator
  static loginBodyValidator(body: any) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(30).required(),
    });
    return schema.validate(body);
  }
}
export default Validate;
