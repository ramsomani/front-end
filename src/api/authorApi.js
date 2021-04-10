import { handleResponse, handleError } from "./apiUtils";
import {authors} from "../tools/mockData";
const baseUrl = "http://localhost:30001/authors/";

export function getAuthors() {
  return authors;
}
