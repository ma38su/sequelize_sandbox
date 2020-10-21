import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize-loader';
import { Job } from './job';
import { Profile } from './profile';
import { Team } from './team';
import { TeamUserRelation} from './team-user-relation';

class User extends Model {
  public id!: number;
  public name!: string;
  public jobTitle!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // relations
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
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      // foreign key constraint
      references: {
        model: Job,
        key: 'title'
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
