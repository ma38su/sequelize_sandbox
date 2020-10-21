import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize-loader';
import { User } from './user';
import { Team } from './team';

class TeamUserRelation extends Model {
  public teamId!: number;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public team!: Team;
  public user!: User;
}

TeamUserRelation.init(
  {
    teamId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
  },
  {
    sequelize,
    tableName: 'team-user-relations',
    freezeTableName: true,
    timestamps: true
  }
);
export { TeamUserRelation };
