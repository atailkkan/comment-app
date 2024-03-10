import sequelize from "@/config/connection";
import { DataTypes } from "sequelize";

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.STRING(32),
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    category_id: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    detail: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true
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
    tableName: "post",
    createdAt: false,
    updatedAt: false
});

Post.sync().catch((err) => console.log(err.message));

export default Post;