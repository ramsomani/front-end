import { handleResponse, handleError } from "./apiUtils";
import {courses} from "../tools/mockData";
const baseUrl = "http://localhost:30001/courses/";

var v;
export function getCourses() {
  debugger;
  return courses;
  // return fetch(baseUrl)
  //   .then(handleResponse)
  //   .catch(handleError);
}

export function saveCourse(course) {
  debugger;
  let id = Math.floor(Math.random() * 100) + 10;
 if(course.id){
  let c =courses.find(a=> a.id === course.id);
  //courses.pop(c);
  let v = {...course,id:id};
  //courses.push(v);
  return v;
 }else{
   v = {...course,id:id};
   return v;
 }
  // return fetch(baseUrl + (course.id || ""), {
  //   method: course.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
  //   headers: { "content-type": "application/json" },
  //   body: JSON.stringify(course)
  // })
  //   .then(handleResponse)
  //   .catch(handleError);
}

export function deleteCourse(courseId) {
  let c =courses.find(a=> a.id === courseId);
  return c;
  // return fetch(baseUrl + courseId, { method: "DELETE" })
  //   .then(handleResponse)
  //   .catch(handleError);
}
