import APIService from "../utils/api-service"

export function saveTask(data) {
  const options = {
    method: "POST",
    url: "task",
    data: data,
  }
  return APIService(options)
}

export function updateTask(data) {
  const options = {
    method: "PUT",
    url: "task",
    data: data,
  }
  return APIService(options)
}

export function fetchAllTasksByListId(listId) {
  const options = {
    method: "GET",
    url: `task/getAll/${listId}`,
  }
  return APIService(options)
}

export function markTaskComplete(payload) {
  const options = {
    method: "POST",
    url: "task/status",
    data: payload,
  }
  return APIService(options)
}

export function deleteTask(id) {
  const options = {
    method: "DELETE",
    url: `task/${id}`,
    data: id,
  }
  return APIService(options)
}
