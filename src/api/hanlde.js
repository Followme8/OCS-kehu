import request from "./axios";

export function handlePostJSON(url, data, headers, needToken = true) {
  return request({
    url,
    method: "post",
    data,
    needToken,
    headers: {
      "Content-Type": "application/json",
      ...headers
    }
  });
}

// export function handlePostJSONdata(url, data, headers, needToken = true) {
//   return request({
//     url,
//     method: "post",
//     data,
//     needToken,
//     headers: {
//       "Content-Type": "multipart/form-data",
//       ...headers
//     }
//   });
// }
export function handleGet(url, params, headers, needToken = true) {
  return request({
    url,
    method: "get",
    params,
    needToken,
    headers: {
      "Content-Type": "application/json",
      ...headers
    }
  });
}
