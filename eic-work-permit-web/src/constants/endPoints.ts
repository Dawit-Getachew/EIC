/* eslint-disable */
const deployed = false;

export default {
  deployed,
  baseURL: deployed
    ? "http://ec2-35-174-137-12.compute-1.amazonaws.com:8090/graphql"
    : "http://localhost:3003/graphql",
  websocketURL: deployed
    ? "ws://investment-gateway.rahove.com:3003/graphql"
    : "ws://localhost:3003/graphql",
  uploadURL: deployed
    ? "http://ec2-35-174-137-12.compute-1.amazonaws.com:3003/upload"
    : "http://localhost:3003/upload",
  surveyURL: "http://localhost:4024/graphql",
  url: "http://localhost:8080/",
};
