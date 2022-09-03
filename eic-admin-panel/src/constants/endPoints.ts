const deployed = false;

export default {
  deployed,
  baseURL: deployed
    ? "http://ec2-35-174-137-12.compute-1.amazonaws.com:3002/graphql"
    : "http://localhost:3002/graphql",
  websocketURL: deployed
    ? "ws://investment-gateway.rahove.com:3002/graphql"
    : "ws://localhost:3002/graphql",
  uploadURL: deployed
    ? "https://EIC-api-gateway.herokuapp.com/upload"
    : "http://localhost:3002/upload",
  surveyURL: "http://localhost:4024/graphql",
  url: "http://localhost:8080/",
};
