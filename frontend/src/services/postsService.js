import http from "./httpService";
import {apiUrl} from "../config.json"

export function createPost(post){
  return http.post(`${apiUrl}/posts`,post)
}

export function getMyPosts(){
  return http.get(`${apiUrl}/posts/my-posts`)
}

export function getPost(id){
  return http.get(`${apiUrl}/posts/${id}`);
}

export function editPost(post){
const {_id,...data}=post;
return http.put(`${apiUrl}/posts/${_id}`,data)
}
const service = {
  createPost,
  getMyPosts,
  editPost,
  getPost
};

export default service;