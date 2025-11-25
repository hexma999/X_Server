import MongoDB from "mongodb";
import { getUsers } from "../db/database.mjs";
const ObjectID = MongoDB.ObjectId;

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
  {
    id: "3",
    userid: "orange",
    password: "3333",
    name: "오렌지",
    email: "orange@orange.com",
    url: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: "4",
    userid: "berry",
    password: "4444",
    name: "배애리",
    email: "orange@orange.com",
    url: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    id: "5",
    userid: "melon",
    password: "5555",
    name: "이메론",
    email: "orange@orange.com",
    url: "https://randomuser.me/api/portraits/men/29.jpg",
  },
];

// 회원가입
export async function createUser(user) {
  // const user = {
  //   id: Date.now().toString(),
  //   userid,
  //   password,
  //   name,
  //   email,
  //   url: "https://randomuser.me/api/portraits/men/29.jpg",
  // };

  // users = [user, ...users];
  //return user;
  return getUsers()
    .insertOne(user)
    .then((result) => result.insertedId.toString());
}

// 모든 회원을 리턴
export async function getAll() {
  return users;
}

// 사용자 아이디(userid)에 대한 회원을 리턴
export async function getAllByUserid(userid) {
  return users.filter((user) => user.userid === userid);
}

// 로그인
// export async function login(userid, password) {
//   const user = users.find(
//     (user) => user.userid === userid && user.password === password
//   );
//   return user;
// }

export async function findByUserid(userid) {
  //const user = users.find((user) => user.userid === userid);
  //return user;
  return getUsers().find({ userid }).next().then(mapOptionalUser);
}

export async function findById(id) {
  // const user = users.find((user) => user.id === id);
  // return user;
  return getUsers()
    .find({ _id: new ObjectID(id) })
    .next()
    .then(mapOptionalUser);
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}
