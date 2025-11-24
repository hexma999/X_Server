import { db } from "../db/database.mjs";

const SELECT_JOIN = `
  SELECT 
    p.id, 
    p.text, 
    p.createAt, 
    u.userid, 
    u.name, 
    u.url
  FROM users u
  JOIN posts AS p
    ON u.idx = p.useridx
`;

const ORDER_DESC = "order by p.createAt desc";
const ORDER_ASC = "order by p.createAt asc";

let posts = [
  {
    id: "1",
    name: "김사과",
    userid: "apple",
    text: "Node.js 배우는 중인데 Express 진짜 편하다! :로켓:",
    createdAt: Date.now().toString(),
    url: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: "2",
    name: "오렌지",
    userid: "orange",
    text: "오늘의 커피 :커피:️ + 코딩 = 최고의 조합!",
    createdAt: Date.now().toString(),
    url: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: "3",
    name: "이메론",
    userid: "melon",
    text: "Elasticsearch 연동 완료! 실시간 검색 API 짜릿해 :돋보기:",
    createdAt: Date.now().toString(),
    url: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: "4",
    name: "반하나",
    userid: "banana",
    text: "JavaScript 비동기 너무 어렵다... Promises, async/await, 뭐가 뭔지 :울음:",
    createdAt: Date.now().toString(),
    url: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    id: "5",
    name: "채리",
    userid: "cherry",
    text: "새 프로젝트 시작! Express + MongoDB + EJS 조합 좋아요 :전구:",
    createdAt: Date.now().toString(),
    url: "https://randomuser.me/api/portraits/women/29.jpg",
  },
];

// 모든 포스트를 리턴
export async function getAll() {
  //return posts;
  return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);
}

// 사용자 아이디(userid)에 대한 포스트를 리턴
export async function getAllByUserid(userid) {
  //return posts.filter((post) => post.userid === userid);
  return db
    .execute(`${SELECT_JOIN} where u.userid=? ${ORDER_DESC}`, [userid])
    .then((result) => result[0]);
}

// 글번호(id)에 대한 포스트를 리턴
export async function getById(id) {
  //return posts.find((post) => post.id === id);
  //return db.execute(`select * from posts where id=?`, [id]);
  return db
    .execute(`${SELECT_JOIN} where p.id=?`, [id])
    .then((result) => result[0][0]);
}

// 포스트를 작성
export async function create(text, idx) {
  // const post = {
  //   id: Date.now().toString(),
  //   userid,
  //   name,
  //   text,
  //   createAt: Date.now().toString(),
  // };

  // posts = [post, ...posts];
  // return post;
  return db
    .execute("insert into posts(useridx,text) values(?,?)", [idx, text])
    .then((result) => getById(result[0].insertId));
}

// 포스트를 변경
export async function update(id, text) {
  // const post = posts.find((post) => post.id === id);
  // if (post) {
  //   post.text = text;
  // }
  // return post;
  return db
    .execute("update posts set text = ? where id=?", [text, id])
    .then(() => getById(id));
}

// 포스트를 삭제
export async function remove(id) {
  //posts = posts.filter((post) => post.id !== id);
  return db.execute("delete from posts where id=?", [id]);
}
