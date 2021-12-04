const BASEURL = "http://localhost:8000";

function service(params = {}) {
  if (!params.url) {
    params.url = "/";
  }
  if (params.params) {
    params.url = params.url + objToQuery(params.params);
  }
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return new Promise((resolve, reject) => {
    fetch(params.url, config)
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function objToQuery(params = {}) {
  const keys = Object.keys(params);
  let query = "";
  if (keys.length) {
    let str = keys.map((key) => {
      return `${key}=${params[keys]}`;
    });
    str = str.join("&");
    query = "?" + str;
  }
  return query;
}

function getArticles(params = {}) {
  return new Promise((resolve, reject) => {
    service({
      method: "GET",
      url: BASEURL + "/api/article/getArticle",
      params,
    })
      .then((res) => {
        resolve(res);
      })
      .catch(() => {
        resolve({
          code: 0,
          data: { records: [] },
        });
      });
  });
}

function getHomeData(params) {
  return new Promise((resolve, reject) => {
    service({
      method: "GET",
      url: BASEURL + "/api/blogdata",
      params,
    })
      .then((res) => {
        resolve(res);
      })
      .catch(() => {
        resolve({});
      });
  });
}

function getHotClassify(params) {
  return new Promise((resolve, reject) => {
    service({
      method: "GET",
      url: BASEURL + "/api/classify/hotClassify",
      params,
    })
      .then((res) => {
        resolve(res);
      })
      .catch(() => {
        resolve({});
      });
  });
}

export { getArticles, getHomeData, getHotClassify };
