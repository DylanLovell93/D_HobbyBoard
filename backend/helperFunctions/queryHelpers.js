const updateProjectQueryBuilder = ({
  id,
  name,
  details,
  project_image,
  archived,
}) => {
  const variableObj = { name, details, project_image, archived };
  const queryVariables = [id];
  let varNum = 2;
  let query = [];

  const types = {
    name: "string",
    details: "string",
    project_image: "string",
    archived: "boolean",
  };

  for (let key in variableObj) {
    if (variableObj[key] === undefined || variableObj[key] === null) {
      continue;
    } else {
      if (types[key] !== typeof variableObj[key]) {
        throw new Error("Bad Request");
      }
      queryVariables.push(variableObj[key]);
      query.push(key + "=$" + varNum);
      varNum++;
    }
  }

  if (!query.length) {
    throw new Error("Bad Request");
  } else {
    return { queryVariables, queryString: query.join(", ") };
  }
};

module.exports = updateProjectQueryBuilder;