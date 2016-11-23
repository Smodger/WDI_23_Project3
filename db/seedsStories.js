const mongoose = require('mongoose');
const User = require('../models/user');
const Challenge = require('../models/challenge');
const Story = require('../models/story');

//  If wanting to remove the promise warning on running the seeds file..
const Promise = require('bluebird');
mongoose.Promise = Promise;

const db = require('../config/db');
mongoose.connect(db.uri);

Story.collection.drop();
console.log('Dropping the story db\'s');

const storyChris = new Story({
  userId: '5835758029136a00043e5b32',
  challengeId: '5835758029136a00043e5b35',
  entries: [{
    title: 'Haute Route Pyrenees - Stage 1',
    shortintro: 'Stage 1 - Hendaye to Lescun',
    mainContent: 'Start of a long walk',
    photo: ['https://scontent.flhr2-2.fna.fbcdn.net/v/t1.0-0/p370x247/11753287_10206148422102151_1234116927840207915_n.jpg?oh=e7cd9c160c52b8a02607a0fcb92b06a4&oe=58BD7A6A'],
    caption: 'Day 1 on the beach at Hendaye',
    order: 1
  }, {
    title: 'Haute Route Pyrenees - Stage 2',
    shortintro: 'Stage 2 - Lescun to Gavarnie',
    mainContent: 'Start entering the higher mountains',
    photo: ['https://scontent.flhr2-2.fna.fbcdn.net/v/t1.0-9/11825906_10204567008567751_3926431220038040428_n.jpg?oh=87e3aba0efeb59c0bfca8636353a4e59&oe=5886FAD6'],
    caption: 'Reach the snowline earlier than expected',
    order: 2
  }, {
    title: 'Haute Route Pyrenees - Stage 3',
    shortintro: 'Stage 3 - Gavarnie to Salardu',
    mainContent: 'Craving Coke and chocolate',
    photo: ['https://scontent.flhr2-2.fna.fbcdn.net/v/t1.0-9/11836630_10204617241263537_4930515482094797742_n.jpg?oh=4a36a1460a5a62b2159f3f47b9318b50&oe=58C12D2F'],
    caption: 'If Carlsberg did campsites',
    order: 3
  }, {
    title: 'Haute Route Pyrenees - Stage 4',
    shortintro: 'Stage 4 - Salardu to Andorra Viehla',
    mainContent: 'Fell and nearly died',
    photo: ['https://scontent.flhr2-2.fna.fbcdn.net/v/t1.0-9/11951838_10204712835093323_9016186575097653050_n.jpg?oh=f3eb49da26d83ebd1f4e75288d261437&oe=58D0B656'],
    caption: 'Lovely cloud inversion',
    order: 4
  }, {
    title: 'Haute Route Pyrenees - Stage 5',
    shortintro: 'Stage 5 - Andorra Viehla to Banyuls-sur-Mere',
    mainContent: 'Happy to finish',
    photo: ['https://scontent.flhr2-2.fna.fbcdn.net/v/t1.0-9/11954682_10204712846813616_9082390366798155313_n.jpg?oh=55badce016a0957d92ac69f253200d59&oe=58BD7DA8', 'https://scontent.flhr2-2.fna.fbcdn.net/v/t1.0-9/11951838_10204712835093323_9016186575097653050_n.jpg?oh=f3eb49da26d83ebd1f4e75288d261437&oe=58D0B656'],
    caption: 'Bath time for wild horses',
    order: 5
  }]
});

const storyLawrie = new Story({
  userId: '5835758029136a00043e5b30',
  challengeId: '5835758029136a00043e5b36',
  entries: [{
    title: 'Climb Mount Fuiji',
    shortintro: 'A three day expedition climbing one of East Asias most iconic peaks',
    mainContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    photos: ['http://jpninfo.com/wp-content/uploads/2015/07/climbing-Mt.Fuji3_.jpg','http://1stforeverything.com/wp-content/uploads/2013/08/Climbing-Mt.-Fuji.jpg','http://i.huffpost.com/gen/1114412/images/h-MOUNT-FUJI-WORLD-HERITAGE-628x314.jpg'],
    order: 1
  }]
});

const storyLuke = new Story({
  userId: '5835758029136a00043e5b34',
  challengeId: '5835758029136a00043e5b35',
  entries: [{
    title: 'So I went on an adventure..',
    shortIntro: 'It started off well',
    mainContent: 'Main Content goes here, again, lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    photos: ['https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/10360260_10153060690391944_7635975731720167414_n.jpg?oh=2a2e5afcc9ef01a76055e8f2674ee4b6&oe=58C4971F","http://image.shutterstock.com/z/stock-photo-a-young-traveler-girl-sit-on-the-top-of-mountain-in-halong-bay-and-enjoy-the-beauty-of-seascape-298757792.jpg","http://weknowyourdreams.com/images/adventure/adventure-03.jpg'],
    order: 1
  }, {
    title: 'But... I fell',
    shortIntro: 'and down a hill',
    mainContent: 'Main Content goes here, again',
    photos: ['http://www.visitjamaica.com/Media/Default/Things%20To%20Do/00_0_Things_to_do_Active-&-Relaxing_Adventure_Feature.jpg','https://media.gadventures.com/media-server/cache/26/11/2611e9746cdbfcd02977d875168580dd.jpg','http://ichef-1.bbci.co.uk/news/660/cpsprodpb/15B64/production/_88523988_b2765ec2-ef41-4f9c-9d73-5de186cbaeb0.jpg'],
    order: 1
  }, {
    title: 'and rolled of a cliff..',
    shortIntro: 'But I got some cool photos!',
    mainContent: 'Main Content goes here, so here is a story all about how I got flipped turned upside down.',
    photos: ['http://www.sandalslifestyle.com/wp-content/uploads/2012/10/ssg-scuba-650x352.jpg','http://i1.trekearth.com/photos/77214/chamonix_mountainscape.jpg','http://7-themes.com/data_images/out/3/6775952-beautiful-mountainscape.jpg'],
    order: 1
  }]
});

storyChris.save((err, storyChris) => {
  if(err) return console.log(err);
  console.log('storyChris was created', storyChris);

  storyLawrie.save((err, storyLawrie) => {
    if(err) return console.log(err);
    console.log('storyLawrie was created', storyLawrie);

    storyLuke.save((err, storyLuke) => {
      if(err) return console.log(err);
      console.log('storyLuke was created', storyLuke);
    });

    mongoose.connection.close();
  });
});
