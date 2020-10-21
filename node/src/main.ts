import { Profile, sync, Team, TeamUserRelation, User } from './models';
import { Job } from './models/job';

async function main() {

  await sync();

  console.log();
  await dumpUsersWithProfileAndTeam();
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
      },
      {
        model: Team,
        as: 'teams'
      },
      {
        model: Job,
        as: 'job'
      }
    ]
  });

  users.forEach(user => {
    const {id, name, profile, relations, teams, job} = user;
    const { mail } = profile;
    const jobTitle = job.title;

    console.log("User, ", {id, name, mail, jobTitle});
    for (const rel of relations) {
      const { team } = rel; 
      const { id, name } = team;
      console.log("  Team", { id, name });
    }
    for (const team of teams) {
      const { id, name } = team;
      console.log("  Team", { id, name });
    }
  });
}

main();
