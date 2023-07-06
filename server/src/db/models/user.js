import { sequelize } from "../index";
import { Sequelize, DataTypes } from "sequelize";

export const UserModel = sequelize.define(
  'users',
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    
    name:  {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    
    birthYear: DataTypes.INTEGER,
    
    gender: {
      type: DataTypes.STRING(10),
      defaultValue: 'UNKNOWN',
      allowNull: false,
      validate: {
        checkEnumValues: (value) => {
          const enums = ['MALE', 'FEMALE', 'OTHER', 'UNKNOWN'];
          if (!enums.includes(value)) {
            throw new Error(`[${value}] is not a valid gender`);
          }
        }
      }
    },

    email: {
      type: DataTypes.STRING(100),
      validate: { isEmail: true },
      allowNull: false,
      unique: true
    },

    createdBy: DataTypes.STRING(50),

    updatedBy: DataTypes.STRING(50)
  }
);