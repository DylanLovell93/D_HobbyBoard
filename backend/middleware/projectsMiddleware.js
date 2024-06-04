const { getOneProject } = require("../queries/projectsQueries");

const fieldTypes = {
  name: ["string"],
  details: ["string"],
  project_image: ["string"],
  archived: ["boolean"],
  creator: ["string"],
};

const requiredFields = ["name", "details", "creator"];

const validateProjectIdMiddleware = (req, res, next) => {
  const id = Number(req.params.id);
  if (!id || id > 9999999999 || !Number.isInteger(id)) {
    return res.status(400).json({ message: "400: Invalid Project ID" });
  } else {
    next();
  }
};

const validateProjectExistsMiddleware = async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    await getOneProject(id);
  } catch (error) {
    const statusCode =
      error.message === "No data returned from the query." ? 404 : 500;
    return res.status(statusCode).json({
      message:
        statusCode === 404
          ? "404: Project Not Found"
          : "500: Internal Server Error",
    });
  }
  next();
};

const validateProjectStructureMiddleware = (req, res, next) => {
  const project = req.body;
  for (let field in project) {
    if (fieldTypes[field] === undefined) {
      return res.status(400).json({
        message: `400: Invalid Request. "${field}" is an invalid input.`,
      });
    }

    if (!fieldTypes[field].includes(typeof project[field])) {
      return res.status(400).json({
        message: `400: Invalid Request. Expected ${field} to have the type of ${fieldTypes[
          field
        ].join(" or ")}`,
      });
    }
  }
  next();
};

const validateCreateProjectMiddleware = (req, res, next) => {
  const project = req.body;

  for (let field of requiredFields) {
    if (project[field] === undefined) {
      return res.status(400).json({
        message: `400: Invalid Request. "${field}" is a required input.`,
      });
    }
  }

  next();
};

module.exports = {
  validateProjectIdMiddleware,
  validateProjectExistsMiddleware,
  validateProjectStructureMiddleware,
  validateCreateProjectMiddleware,
};
