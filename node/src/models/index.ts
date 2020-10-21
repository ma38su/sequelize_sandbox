import { User } from './user';
import { Profile } from './profile';
import { Team } from './team';
import { TeamUserRelation } from './team-user-relation';
import { Job } from './job';
import { ForeignKeyConstraintError } from 'sequelize';

// Configure Sequelize for RDB
async function sync() {

  console.log('drop table if exists...');
  await TeamUserRelation.drop();
  await Profile.drop(),
  await User.drop();

  console.log('sync...');
  await Job.sync({ force: true });
  await Team.sync({ force: true });
  await User.sync();
  await Profile.sync();
  await TeamUserRelation.sync(),

  console.log('setting relations...');
  User.hasOne(Profile, {sourceKey: 'id', foreignKey: 'userId', as: 'profile'});
  //User.belongsTo(Job, { foreignKey: 'jobId', targetKey: 'id', as: 'job'});

  User.hasMany(TeamUserRelation, {sourceKey: 'id', foreignKey: 'userId', as: 'relations'});
  TeamUserRelation.belongsTo(User, {foreignKey: 'userId', targetKey: 'id', as: 'user'});

  Team.hasMany(TeamUserRelation, {sourceKey: 'id', foreignKey: 'teamId', as: 'relations'});
  TeamUserRelation.belongsTo(Team, {foreignKey: 'teamId', targetKey: 'id', as: 'team'});

  User.belongsToMany(Team, {through: TeamUserRelation, as: 'teams'});

  console.log('upsert...');

  const [engineer] = await Job.upsert({title: 'Engineer'});
  const [resercher] = await Job.upsert({title: 'Reseacher'});
  
  const [userA] = await User.upsert({name: 'User A', jobTitle: 'Engineer'});
  const [userB] = await User.upsert({name: 'User B', jobTitle: 'Reseacher'});

  console.log('upsert error1...');
  try {
    await User.upsert({name: 'User C', jobTitle: 'Sales'});
    throw new Error('disabled Foreign Key Constraint');
  } catch (err) {
    if (err instanceof ForeignKeyConstraintError) {
      console.log('ok');
    } else {
      throw err;
    }
  }

  const [userC] = await User.upsert({name: 'User C', jobTitle: 'Engineer'});

  const [team1] = await Team.upsert({name: 'Team 1'});
  const [team2] = await Team.upsert({name: 'Team 2'});

  console.log('upsert error2...');
  try {
    await Profile.upsert({userId: 100, mail: 'err@example.com'});
    throw new Error('disabled Foreign Key Constraint');
  } catch (err) {
    if (err instanceof ForeignKeyConstraintError) {
      console.log('ok');
    } else {
      throw err;
    }
  }

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
