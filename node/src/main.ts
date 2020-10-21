import { Profile, sync, Team, TeamUserRelation, User } from './models';

async function main() {

  console.log('sync...');
  await sync();
  console.log('finished sync.');

  console.log();
  await dumpRels();
  await dumpUsersWithProfile();
  await dumpUsersWithProfileAndTeam();
  await dumpUsersWithTeams();
}

async function dumpUsersWithProfile() {
  console.log('dump users with profile')
  const users = await User.findAll({
    include: {
      model: Profile,
      as: 'profile'
    }
  });

  users.forEach(user => {
    const {id, name, profile} = user;
    const { mail } = profile;
    console.log("User, ", id, name, mail);
  });
}

async function dumpRels() {

  console.log('dump rels')

  const rels = await TeamUserRelation.findAll({
    include: {
      model: Team,
      as: 'team'
    }
  })
  rels.forEach(rel => {
    const {team} = rel;
    console.log("Rel ", rel.userId, rel.teamId, team.name);
  });
}

async function dumpUsersWithProfileAndTeam() {

  console.log('dump users with profile and teams')

  const users = await User.findAll({
    include: [
      {
        model: Profile,
        as: 'profile'
      },
      {
        model: TeamUserRelation,
        as: 'relations',
        include: [{
          model: Team,
          as: 'team'
        }]
      }
    ]
  });

  users.forEach(user => {
    const {id, name, profile, relations} = user;
    const { mail } = profile;
    console.log("User, ", id, name, mail);
    for (const rel of relations) {
      const { team } = rel; 
      console.log("  Team", team.id, team.name);
    }
  });
}

async function dumpUsersWithTeams() {

  console.log('dump users with teams')

  const users = await User.findAll({
    include: [
      {
        model: Team,
        as: 'teams'
      }
    ]
  });

  users.forEach(user => {
    const {id, name, teams} = user;
    console.log("User, ", id, name);
    for (const team of teams) {
      console.log("  Team", team.id, team.name);
    }
  });
}

main();
