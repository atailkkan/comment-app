import sequelize from "@/config/connection";
import { DataTypes } from "sequelize";

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.STRING(32),
        allowNull: false,
        primaryKey: true,
        unique: true
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
    tableName: "category",
    createdAt: false,
    updatedAt: false
});

Category.sync().catch((err) => console.log(err.message));

export default Category;