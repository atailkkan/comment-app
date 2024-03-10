import { Sequelize } from "sequelize";

const sequelize = new Sequelize("comment_app", "root", "", {
    host: "localhost",
    dialect: "mysql",
    dialectModule: require("mysql2")
});

sequelize.authenticate()
    .then(() => console.log("Connection success!"))
    .catch((err) => console.log("Connection error: " + err));

export default sequelize;