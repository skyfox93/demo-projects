var topic= new mongoose.Schema(
    {
        heading: {
      type: String
    },
        user: {
      type: String
    },
        comments: [
            {
                comment: {
      type: String
    },
                user: {
      type: String
    },
                date: {
      type: date
    }
            }
        ],
        date: {
      type: date
    }
    })
module.exports = mongoose.model('topicModel', topic );
