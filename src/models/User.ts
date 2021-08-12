import * as dynamoose from 'dynamoose';
import {Document} from "dynamoose/dist/Document";

const UserSchema = new dynamoose.Schema({
  "id": String,
  "name": String,
  "parent": dynamoose.THIS
});


class User extends Document {
    id: string;
    name: string;
}

const UserModel = dynamoose.model<User>("User", UserSchema);

export { User, UserModel }