import MongoDB from "mongodb";
import { useVirtualId } from "../db/database.mjs";
import { mongoose } from "mongoose";
//const ObjectID = MongoDB.ObjectId;

//versoinKey : mongoose가 문서를 저장할 때 자동으로 추가하는 _v 라는 필드를 설정
const userSchema = new mongoose.Schema(
  {
    userid: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    url: String,
  },
  { versionKey: false }
);

useVirtualId(userSchema);
const User = mongoose.model("User", userSchema);

let users = [
  {
    id: "1",
    userid: "apple",
    password: "1111",
    name: "김사과",
    email: "apple@apple.com",
    url: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: "2",
    userid: "banana",
    password: "2222",
    name: "반하나",
    email: "banana@banana.com",
    url: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

// 회원가입
export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}

// 모든 회원을 리턴
export async function getAll() {
  return users;
}

// 사용자 아이디(userid)에 대한 회원을 리턴
export async function getAllByUserid(userid) {
  return users.filter((user) => user.userid === userid);
}

export async function findByUserid(userid) {
  return User.findOne({ userid: userid });
}

export async function findById(id) {
  return User.findById(id);
}
