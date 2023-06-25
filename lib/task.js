import axios from "axios";

export function createTask(task) {
  return axios.post("http://localhost:8080/tasks", task);
}

export function updateTask(id, task) {
  return axios.put(`http://localhost:8080/tasks/${id}`, task);
}

export function deleteTask(id) {
  return axios.delete(`http://localhost:8080/tasks/${id}`);
}
