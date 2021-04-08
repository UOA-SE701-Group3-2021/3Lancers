import mongoose from 'mongoose';
import Habit from '../models/habit';
import dummyHabitTrackers from './dummy-habit-tracker';

async function clearDatabase() {
  const result = Habit.deleteMany({});
  console.log(`Successfully cleared database (removed ${(await result).deletedCount})`);
}

async function addDummyHabitTrackers() {
  const result = await Habit.insertMany(dummyHabitTrackers.map((h) => new Habit(h)));
  console.log(`Successfully added ${result.length} habits!`);
}

async function main() {
  await mongoose.connect('mongodb://localhost:27017/telosdatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  console.log('Connected to database!');
  console.log();

  await clearDatabase();
  console.log();

  await addDummyHabitTrackers();
  console.log();

  await mongoose.disconnect();
  console.log('Disconnected from database!');
}

main();
