import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize-loader';
import { Job } from './job';
import { Profile } from './profile';
import { Team } from './team';
import { TeamUserRelation} from './team-user-relation';

class User extends Model {
  public id!: number;
  public name!: string;
  public jobId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // relations
  public readonly job!: Job;
  public readonly profile!: Profile;
  public readonly relations!: TeamUserRelation[];
  public readonly teams!: Team[];
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,

      // foreign key constraint
      references: {
        model: Job,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    tableName: 'users',
    freezeTableName: true,
    timestamps: true
  }
);
export { User };
