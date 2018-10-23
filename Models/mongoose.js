const mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/mongoBasics';
mongoose.connect(mongoDB);

const express = require('express')

var topicSchema=new mongoose.Schema(
    {
        heading: {
      type: String
    },
        user: {
      type: String
    },      comments: [
            {
                comment: {
      type: String
    },
                user: {
      type: String
    },
                date: {
      type: String
    }
            }
        ],
        date: {
      type: String
    }
    })
var topic = mongoose.model('topic', topicSchema );
module.exports=topic;
/*topicModel.create(topics[0], function (err, instance) {
  if (err) return console.log(err);console.log(instance)
  // saved!
});

*/
