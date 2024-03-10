import sequelize from "@/config/connection";
import { DataTypes } from "sequelize";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.STRING(32),
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    firstname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "user",
    createdAt: false,
    updatedAt: false
});

User.sync().catch((err) => console.log(err.message));

export default User;