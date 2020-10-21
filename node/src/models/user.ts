import { Model, DataTypes } from 'sequelize';
import { Profile } from './profile';
import { sequelize } from './sequelize-loader';
import { Team } from './team';
import { TeamUserRelation} from './team-user-relation';

class User extends Model {
  public id!: number;
  public name!: string;

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