import { mongoose } from "mongoose";
import { useVirtualId } from "../db/database.mjs";
import * as UserRepository from "./auth.mjs";
import { ReturnDocument } from "mongodb";
//import { getPosts } from "../db/database.mjs";
//const ObjectID = MongoDB.ObjectId;

const postSchema = new mongoose.Schema(
  {
    text: { type: String, require: true },
    userIdx: { type: String, require: true },
    name: { type: String, require: true },
    userid: { type: String, require: true },
    url: String,
  },
  { timestamps: true }
);

useVirtualId(postSchema);
const Post = mongoose.model("Post", postSchema);

// let posts = [
//   {
//     id: "1",
//     name: "김사과",
//     userid: "apple",
//     text: "Node.js 배우는 중인데 Express 진짜 편하다! :로켓:",
//     createdAt: Date.now().toString(),
//     url: "https://randomuser.me/api/portraits/women/32.jpg",
//   },
//   {
//     id: "2",
//     name: "오렌지",
//     userid: "orange",
//     text: "오늘의 커피 :커피:️ + 코딩 = 최고의 조합!",
//     createdAt: Date.now().toString(),
//     url: "https://randomuser.me/api/portraits/men/44.jpg",
//   },
// ];

// 모든 포스트를 리턴
export async function getAll() {
  return Post.find().sort({ createdAt: -1 });
}

// 사용자 아이디(userid)에 대한 포스트를 리턴
export async function getAllByUserid(userid) {
  return Post.find({ userid }).sort({ createdAt: -1 });
}

// 글번호(id)에 대한 포스트를 리턴
export async function getById(id) {
  return Post.findById(id);
}

// 포스트를 작성
export async function create(text, id) {
  return UserRepository.findById(id).then((user) =>
    new Post({
      text,
      userIdx: user.id,
      name: user.name,
      userid: user.userid,
      url: user.url,
    }).save()
  );
}

// 포스트를 변경
export async function update(id, text) {
  return Post.findByIdAndUpdate(id, { text }, { ReturnDocument: "after" });
}

// 포스트를 삭제
export async function remove(id) {
  return Post.findByIdAndDelete(id);
}
