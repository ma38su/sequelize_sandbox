import { Model, DataTypes } from 'sequelize';

import { sequelize } from './sequelize-loader';

class Profile extends Model {
  public id!: number;
  public userId!: number;
  public mail!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'profiles',
    freezeTableName: true,
    timestamps: true
  }
);
export { Profile };
