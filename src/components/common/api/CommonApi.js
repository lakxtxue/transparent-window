import request from "@/utils/request";

export function exist(entityName, params) {
  return request({
    url: "/generic/" + entityName + "/exist",
    method: "post",
    data: params
  });
}

export function queryPageList(entityName, params) {
  return request({
    url: "/generic/" + entityName + "/queryPageList",
    method: "post",
    data: params
  });
}
