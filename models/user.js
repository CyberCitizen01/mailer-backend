const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const MailSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  to: {
    required: true,
    type: String,
  },
  cc: {
    type: [String],
  },
  bcc: {
    type: [String],
  },
  subject: {
    required: true,
    type: String,
  },
  body: {
    required: true,
    type: String,
  },
})

const SentMailsSchema = new mongoose.Schema({
  mail: MailSchema,
  sentAt: {
    type: Date,
    default: Date.now(),
  },
})

const ScheduledMailsSchema = new mongoose.Schema({
  mail: MailSchema,
  sentAt: {
    type: Date,
    default: Date.now(),
  },
  scheduledTo: {
    type: Date,
    required: true,
  },
})

const RecurringMailsSchema = new mongoose.Schema({
  mail: MailSchema,
  sentAt: {
    type: Date,
    default: Date.now()
  },
  recurringPeriod: {
    type: String,
    required: true,
  },
})

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  sentMails: [SentMailsSchema],
  scheduledMails: [ScheduledMailsSchema],
  recurringMails: [RecurringMailsSchema],
});

MailSchema.plugin(AutoIncrement, {inc_field: 'id'});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);