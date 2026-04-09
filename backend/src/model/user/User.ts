import { model, Schema, type HydratedDocument, type Model } from 'mongoose';
import type { IUser } from '../../types/user.types.ts';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import type { UserMethods } from './userModel.types.ts';
import config from '../../config.ts';

type UserModel = Model<IUser, {}, UserMethods>;

const UserSchema = new Schema<HydratedDocument<IUser>, UserModel, UserMethods>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

UserSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const hash = await argon2.hash(this.password);
    return (this.password = hash);
  }

  return;
});

UserSchema.set('toJSON', {
  transform: (_doc, ret, _options) => {
    const { password, __v, token, ...user } = ret;
    return user;
  },
});

UserSchema.methods.checkPassword = function (password) {
  return argon2.verify(this.password, password);
};

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.jwtSecret, {
    expiresIn: '30d',
  });

  this.token = token;
};

const User = model('User', UserSchema);
export default User;
