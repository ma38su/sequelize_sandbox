import { User } from './user';
import { Profile } from './profile';
import { Team } from './team';
import { TeamUserRelation } from './team-user-relation';

// Configure Sequelize for RDB
async function sync() {

  console.log('sync...');
  await User.sync({ force: true });
  await Team.sync({ force: true });
  await Profile.sync({ force: true });
  await TeamUserRelation.sync({ force: true });

  console.log('setting relations...');
  User.hasOne(Profile, {sourceKey: 'id', foreignKey: 'userId', as: 'profile'});

  User.hasMany(TeamUserRelation, {sourceKey: 'id', foreignKey: 'userId', as: 'relations'});
  TeamUserRelation.belongsTo(User, {foreignKey: 'userId', targetKey: 'id', as: 'user'});

  Team.hasMany(TeamUserRelation, {sourceKey: 'id', foreignKey: 'teamId', as: 'relations'});
  TeamUserRelation.belongsTo(Team, {foreignKey: 'teamId', targetKey: 'id', as: 'team'});

  User.belongsToMany(Team, {through: TeamUserRelation, as: 'teams'});

  console.log('upsert...');
  
  const [userA] = await User.upsert({name: 'User A'});
  const [userB] = await User.upsert({name: 'User B'});
  const [userC] = await User.upsert({name: 'User C'});
  const [team1] = await Team.upsert({name: 'Team 1'});
  const [team2] = await Team.upsert({name: 'Team 2'});

  await Promise.all([
    Profile.upsert({userId: userA.id, mail: 'a@example.com'}),
    Profile.upsert({userId: userB.id, mail: 'b@example.com'}),
    Profile.upsert({userId: userC.id, mail: 'c@example.com'}),

    TeamUserRelation.upsert({teamId: team1.id, userId: userA.id}),
    TeamUserRelation.upsert({teamId: team1.id, userId: userB.id}),
    TeamUserRelation.upsert({teamId: team2.id, userId: userA.id}),
    TeamUserRelation.upsert({teamId: team2.id, userId: userC.id}),
  ]);

  console.log('initialized sequelize');
}

export { sync, User, Profile, Team, TeamUserRelation };
