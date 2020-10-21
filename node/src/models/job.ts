import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize-loader';
import { User } from './user';

class Job extends Model {
  public id!: number;
  public title!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Job.init(
  {
    title: {
      type: DataTypes.STRING,
      primaryKey: true,
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
