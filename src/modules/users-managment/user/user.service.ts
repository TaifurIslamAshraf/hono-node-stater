import UserModel from './user.model';

const findAllUserFromdb = async () => {
    const users = await UserModel.find();

    return users;
};

export const userServices = { findAllUserFromdb };
