import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize-loader';
import { User } from './user';

class Job extends Model {
  public id!: number;
  public title!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // public readonly users!: User;
}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    sequelize,
    tableName: 'jobs',
    freezeTableName: true,
    timestamps: true
  }
);

export { Job };
