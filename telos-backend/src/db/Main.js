import mongoose from 'mongoose';

async function clearDatabase(dbSchema) {
  const result = dbSchema.deleteMany({});
  console.log(`Successfully cleared database (removed ${(await result).deletedCount})`);
}

async function addData(Schema, dummyData) {
  const result = await Schema.insertMany(dummyData.map((h) => new Schema(h)));
  console.log(`Successfully added ${result.length} values in database!`);
}

async function main(Schema, dummyData) {
  await mongoose.connect('mongodb://localhost:27017/telosdatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  console.log('Connected to database!');
  console.log();

  await clearDatabase(Schema);
  console.log();

  await addData(Schema, dummyData);
  console.log();

  await mongoose.disconnect();
  console.log('Disconnected from database!');
}

export default main;
