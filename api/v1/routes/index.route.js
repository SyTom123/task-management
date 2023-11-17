const taskRoutes = require("./task.route");
const userRoutes = require("./user.route");
const authenMiddleware = require("../../v1/middleware/authen.middleware");

module.exports = (app) => {;
    const version = "/api/v1";
    app.use(version + "/tasks",authenMiddleware.requireAuth ,taskRoutes);
    app.use(version + "/users", userRoutes);
}