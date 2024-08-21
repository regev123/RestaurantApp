const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
  number: {
    type: Number,
  },
  seats: {
    type: Number,
    required: true,
    min: 1,
  },
});

// Post hook to update orders after deletion
TableSchema.post('findOneAndDelete', async function (doc) {
  if (!doc) return; // If no document was deleted, do nothing

  await this.model.updateMany(
    { number: { $gt: doc.number } },
    { $inc: { number: -1 } }
  );
});

//Pre hook to generate table number
TableSchema.pre('save', async function (next) {
  //to check if the table is empty
  const count = await mongoose.connection.db
    .collection('tables')
    .estimatedDocumentCount();

  if (count === 0) {
    //if its empty insert table number as 1
    this.number = 1;
  } else {
    //if not find the highest number of the table number and inc by 1
    const highestNumber = await mongoose.connection.db
      .collection('tables')
      .find()
      .sort({ number: -1 })
      .limit(1)
      .toArray();
    this.number = highestNumber[0].number + 1;
  }

  next();
});

module.exports = Table = mongoose.model('table', TableSchema);
