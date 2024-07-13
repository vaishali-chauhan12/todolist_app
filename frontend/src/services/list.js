import APIService from "../utils/api-service"

export function fetchAllList(data) {
  const options = {
    method: "POST",
    url: "list/getAll",
    data: data,
  }
  return APIService(options)
}

export function saveList(data) {
  const options = {
    method: "POST",
    url: "list",
    data: data,
  }
  return APIService(options)
}

export function updateList(data) {
  const options = {
    method: "PUT",
    url: "list",
    data: data,
  }
  return APIService(options)
}

export function deleteList(id) {
  const options = {
    method: "DELETE",
    url: `list/${id}`,
    data: id,
  }
  return APIService(options)
}
