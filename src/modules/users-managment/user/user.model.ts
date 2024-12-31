import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passowrd: {
        type: String,
        required: true,
    },
});

const UserModel = model('User', userSchema);
export default UserModel;
