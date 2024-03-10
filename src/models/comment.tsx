import sequelize from "@/config/connection";
import { DataTypes } from "sequelize";

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.STRING(32),
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    parent_id: {
        type: DataTypes.STRING(32),
        allowNull: false,
        defaultValue: "0"
    },
    post_id: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    user_id: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_approval: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
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
    tableName: "comment",
    createdAt: false,
    updatedAt: false
});

Comment.sync().catch((err) => console.log(err.message));

export default Comment;