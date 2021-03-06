import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize-loader';
import { User } from './user';
import { Team } from './team';

class TeamUserRelation extends Model {
  public teamId!: number;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // relations
  public readonly team!: Team;
  public readonly user!: User;
}

TeamUserRelation.init(
  {
    teamId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      // foreign key constraint
      references: {
        model: Team,
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      // foreign key constraint
      references: {
        model: User,
        key: 'id'
      }
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
