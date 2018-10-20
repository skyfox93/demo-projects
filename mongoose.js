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
      type: String
    }
            }
        ],
        date: {
      type: String
    }
    })
topicModel = mongoose.model('topicModel', topicSchema );

/*topicModel.create(topics[0], function (err, instance) {
  if (err) return console.log(err);console.log(instance)
  // saved!
});

*/
topicModel.find(function (err, athletes) {
  if (err) {return handleError(err);}
	else{console.log(athletes);}
  // 'athletes' contains the list of athletes that match the criteria.
})
