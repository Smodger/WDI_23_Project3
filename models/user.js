const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');
const uuid = require('uuid');

const userImages = require('./user_images');
const userFeedback = require('./user_images');

const userSchema = new mongoose.Schema({
  facebookId: { type: String }, // Facebook login
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  locked: { type: Boolean, default: true }, // Lock the User by Default
  confirmationCode: { type: String, default: uuid.v1 },
  profileImage: { type: String }, // Facebook login
  passwordHash: { type: String },
  dob: { type: String },
  gender: { type: String },
  strapline: { type: String },
  bio: { type: String },
  coverPhoto: { type: String },
  profilePhoto: { type: String },
  video: { type: String },
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  activeChallenges: [{ type: mongoose.Schema.ObjectId, ref: 'Challenge' }],
  images: [{ type: String , default: [null,null,null]}],
  feedback: [userFeedback.schema]
});


function setPassword(value){
  this._password = value;
}

function setPasswordConfirmation(passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation;
}

function validatePassword(password){
  return bcrypt.compareSync(password, this.passwordHash);
}

function preValidate(next) {
  if (this.isNew) {
    if (!this._password && !this.facebookId) {
      this.invalidate('password', 'A password is required.');
    }
  }

  if(this._password) {
    if (this._password.length < 6) {
      this.invalidate('password', 'must be at least 6 characters.');
    }

    if (this._password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'Passwords do not match.');
    }
  }
  next();
}

function preSave(next) {
  if(this._password) {
    this.passwordHash = bcrypt.hashSync(this._password, bcrypt.genSaltSync(8));
  }

  next();
}

userSchema
  .virtual('password')
  .set(setPassword);

userSchema
  .virtual('passwordConfirmation')
  .set(setPasswordConfirmation);

userSchema.methods.validatePassword = validatePassword;

userSchema.pre('validate', preValidate);

userSchema.pre('save', preSave);

userSchema.set('toJSON', {
  transform: function(doc, json) {
    delete json.passwordHash;
    delete json.confirmationCode;
    delete json.__v;
    return json;
  }
});

module.exports = mongoose.model('User', userSchema);


// participants: ["582dc640f6e0254496198d34", "582ed371371260743000b7e0"]
