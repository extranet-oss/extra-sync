// queue-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const queue = new Schema({
    queryType: {
      type: String,
      enum: ['push', 'pull'],
      required: true
    },
    action: {
      type: String,
      required: true
    },
    token: {type: String},
    params: {
      type: Object,
      required: true
    },
    start: Date,
    end: Date,
    error: {
      required: false,
      code: {type: String, required: true},
      message: {type: String, required: true},
      additionalData: Object
    },
    stats: {
      intraquery: {
        retry: {type: Number, default: 0},
        start: Date,
        end: Date,
        completionTime: Number
      },
      extraquery: {
        retry: {type: Number, default: 0},
        start: Date,
        end: Date,
        completionTime: Number
      },
      completionTime: Number
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('queue', queue);
};
