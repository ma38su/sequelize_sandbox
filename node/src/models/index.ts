import { User } from './user';
import { Profile } from './profile';
import { Team } from './team';
import { TeamUserRelation } from './team-user-relation';

// Configure Sequelize for RDB
async function sync() {

  console.log('User.sync...');
  await User.sync({ force: true });

  console.log('Team.sync...');
  await Team.sync({ force: true });

  console.log('Profile.sync...');
  await Profile.sync({ force: true });

  console.log('TeamUserRelation.sync...');
  await TeamUserRelation.sync({ force: true });

  console.log('setting relations...');
  User.hasOne(Profile, {sourceKey: 'id', foreignKey: 'userId', as: 'profile'});

  console.log('upsert userA...');
  const [userA] = await User.upsert({name: 'User A'});
  console.log('upsert userA.profile...');
  await Profile.upsert({userId: userA.id, mail: 'a@example.com'});

  console.log('upsert userB...');
  const [userB] = await User.upsert({name: 'User B'});
  console.log('upsert userB.profile...');
  await Profile.upsert({userId: userB.id, mail: 'b@example.com'});

  console.log('upsert userC...');
  const [userC] = await User.upsert({name: 'User C'});
  console.log('upsert userC.profile...');
  await Profile.upsert({userId: userC.id, mail: 'c@example.com'});

  console.log('initialized sequelize');
}

export { sync, User, Profile, Team, TeamUserRelation };
