import { DataTypes, Model } from 'sequelize';
import { sequelize } from './sequelize-loader';
import { TeamUserRelation } from './team-user-relation';

class Team extends Model {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly relations!: TeamUserRelation[];
}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'teams',
    freezeTableName: true,
    timestamps: true
  }
);
export { Team };
