import { sync, User } from './models';

async function main() {

  console.log('sync...');
  await sync();
  console.log('finished sync.');

  const users = await User.findAll();

  users.forEach(user => {
    console.log("Hello, ", user);
  });
}
main();
