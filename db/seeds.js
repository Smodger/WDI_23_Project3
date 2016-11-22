const mongoose = require('mongoose');
const User = require('../models/user');
const Challenge = require('../models/challenge');

//  If wanting to remove the promise warning on running the seeds file..
const Promise = require('bluebird');
mongoose.Promise = Promise;

const db = require('../config/db');
mongoose.connect(db.uri);

User.collection.drop();
Challenge.collection.drop();
console.log('Dropping the db\'s');


let user1ID;

const user1 = new User({
  username: 'Joe Blogs',
  email: 'joeb@gmail.com',
  password: 'password',
  passwordConfirmation: 'password',
  dob: '13/09/1991',
  gender: 'male',
  strapline: 'Thrill seeker',
  bio: 'Professional climber for Redbull',
  coverPhoto: 'https://s-media-cache-ak0.pinimg.com/236x/5a/d5/52/5ad552b18314423d718aac9b43c2f556.jpg',
  profilePhoto: 'http://image1.redbull.com/rbcom/010/2016-04-26/1331791190164_2/0010/1/1500/1000/2/dynos-are-the-coolest-moves-in-climbing.jpg',
  // activeChallenges: [], //Challenge
  video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/48lpr0K54DM" frameborder="0" allowfullscreen></iframe>',
  like: [], //User
  locked: false
});

user1.save((err, user1) => {
  if(err) return console.log(err);
  console.log(user1 + ' Was created!');
  user1ID = user1._id;
  console.log('user1 id is :', user1ID);
});

let user2ID;
const user2 = new User({
  username: 'Dan Jenkins',
  email: 'dj@gmail.com',
  password: 'password',
  passwordConfirmation: 'password',
  dob: '16/02/1981',
  gender: 'male',
  strapline: 'Lifelong kayaker in search of new adventures',
  bio: 'Love kayaking and all things water',
  coverPhoto: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Female_kayaker_paddles.jpg',
  profilePhoto: 'http://www.nwrafting.com/wp-content/uploads/2012/01/JR.jpg',
  // activeChallenges: [],
  like: [], //User
  locked: false
});

user2.save((err, user2) => {
  if(err) return console.log(err);
  console.log(user2 + ' Was created!');
  user2ID = user2._id;
  console.log('User2 id is: ', user2ID);

  let challenge1ID;
  const challenge1 = new Challenge({
    name: 'Climb Annapurna',
    startDate: '01/01/16',
    finishDate: '20/07/16',
    cost: '5000',
    location: { lat: 27.2099755, lng: 86.8899597 },
    description: 'Climb the worlds deadliest Mountain with experienced Mountain Guide Micky Ginger',
    image: 'http://lh6.ggpht.com/MYBmrR4UydPzD1fKuTuIgPir_kEfiYcFU3gSF24K59q4GX0sULvu4JrBY4aI1t1q75w9jNnRttDl7QkxKxPoBw',
    video: 'video',
    like: [],
    projectCreator: [user1ID],
    comments: 'Not for the feint hearted',
    participants: [user1ID]
  });

  challenge1.save((err, challenge1) => {
    if(err) return console.log(err);
    // console.log('running?');
    challenge1ID = challenge1._id;
    console.log('challenge1ID: ',challenge1ID);
    console.log('Created ', challenge1);

    let challenge2ID;
    const challenge2 = new Challenge({
      name: 'The Long Way Round ',
      startDate: '01/06/17',
      finishDate: '01/12/17',
      cost: '£2000',
      location: { lat: 51.5031086, lng: -0.2354964 },
      description: 'Motorbike around the world, the long way ',
      image: 'http://longwayround.com/images/banner_long-way-round.jpg',
      video: 'video',
      like: [],
      projectCreator: [user2ID],
      comments: 'comment 1',
      participants: [user2ID]
    });

    challenge2.save((err, challenge2) => {
      if(err) return console.log(err);
      // console.log('running?');
      challenge2ID = challenge2._id;
      console.log('challenge2ID: ',challenge2ID);
      console.log('Created ', challenge2);
    });


    //Now update the user with the challenges they participate in...
    User.findByIdAndUpdate(user1ID, {
      activeChallenges: [challenge1ID]
    }, { new: true }, (err, user) => {
      if (err) return console.log(err);
      console.log(user);
      // Close the connection to the db
      // mongoose.connection.close();
    });
  });
});

//USER 3 CN FOR SEEDS AMALGAMATION

let user3ID;
const user3 = new User({
  username: 'Chris Norman',
  email: 'chrisnorman@gmail.com',
  password: 'password',
  passwordConfirmation: 'password',
  dob: '14/09/1988',
  gender: 'male',
  strapline: 'I am allergic to Camels',
  bio: 'Aspiring Gryffindor',
  coverPhoto: 'https://scontent.flhr2-2.fna.fbcdn.net/v/t1.0-9/11951838_10204712835093323_9016186575097653050_n.jpg?oh=f3eb49da26d83ebd1f4e75288d261437&oe=58D0B656',
  profilePhoto: 'https://www.facebook.com/photo.php?fbid=10204712823773040&set=pcb.10204712849173675&type=3&theater',
  // activeChallenges: [],
  like: [], //User
  locked: false
});

user3.save((err, user3) => {
  if(err) return console.log(err);
  console.log(user3 + ' Was created!');
  user2ID = user3._id;
  console.log('User3 id is: ', user3ID);

  let challenge3ID;
  const challenge3 = new Challenge({
    name: 'The HRP',
    startDate: '01/06/17',
    finishDate: '01/08/17',
    cost: '£2000',
    location: { lat: 42.6929641, lng: -1.7960056 },
    description: 'Walk from the Atlantic Coast to the Mediterranean Coast across they Pyrenees',
    image:'https://scontent.flhr2-2.fna.fbcdn.net/v/t1.0-9/11013614_10204617239103483_1541173441935147825_n.jpg?oh=d1080e1de8c698b52d2a94e87fd5aab6&oe=58BDED79',
    video: '<iframe width="640" height="360" src="https://www.youtube.com/embed/6vn0Er8wJIE" frameborder="0" allowfullscreen></iframe>',
    like: [],
    projectCreator: [user2ID],
    comments: 'comment 1',
    participants: [user2ID]
  });

  challenge3.save((err, challenge3) => {
    if(err) return console.log(err);
    // console.log('running?');
    challenge2ID = challenge3._id;
    console.log('challenge3ID: ',challenge3ID);
    console.log('Created ', challenge3);
  });

  user id : 'XXX'
  challengeid: 'XXX'
  entries: [{
    title: 'Haute Route Pyrenees - Stage 1'
    shortintro: 'Stage 1 - Hendaye to Lescun'
    mainContent: 'Start of a long walk'
    photo: 'https://scontent.flhr2-2.fna.fbcdn.net/v/t1.0-0/p370x247/11753287_10206148422102151_1234116927840207915_n.jpg?oh=e7cd9c160c52b8a02607a0fcb92b06a4&oe=58BD7A6A'
    caption: 'Day 1 on the beach at Hendaye'
    order: 1
  }, {
    title: 'Haute Route Pyrenees - Stage 2'
    shortintro: 'Stage 2 - Lescun to Gavarnie'
    mainContent: 'Start entering the higher mountains'
    photo: 'https://scontent.flhr2-2.fna.fbcdn.net/v/t1.0-9/11825906_10204567008567751_3926431220038040428_n.jpg?oh=87e3aba0efeb59c0bfca8636353a4e59&oe=5886FAD6'
    caption: 'Reach the snowline earlier than expected'
    order: 2
  }, {
    title: 'Haute Route Pyrenees - Stage 3'
    shortintro: 'Stage 3 - Gavarnie to Salardu'
    mainContent: 'Craving Coke and chocolate'
    photo: 'https://scontent.flhr2-2.fna.fbcdn.net/v/t1.0-9/11836630_10204617241263537_4930515482094797742_n.jpg?oh=4a36a1460a5a62b2159f3f47b9318b50&oe=58C12D2F'
    caption: 'If Carlsberg did campsites'
    order: 3
  }, {
    title: 'Haute Route Pyrenees - Stage 4'
    shortintro: 'Stage 4 - Salardu to Andorra Viehla'
    mainContent: 'Fell and nearly died'
    photo: 'https://scontent.flhr2-2.fna.fbcdn.net/v/t1.0-9/11951838_10204712835093323_9016186575097653050_n.jpg?oh=f3eb49da26d83ebd1f4e75288d261437&oe=58D0B656'
    caption: 'Lovely cloud inversion'
    order: 4
  }, {
    title: 'Haute Route Pyrenees - Stage 5'
    shortintro: 'Stage 5 - Andorra Viehla to Banyuls-sur-Mere'
    mainContent: ''
    photo: 'https://scontent.flhr2-2.fna.fbcdn.net/v/t1.0-9/11954682_10204712846813616_9082390366798155313_n.jpg?oh=55badce016a0957d92ac69f253200d59&oe=58BD7DA8'
    caption: 'Bath time for wild horses'
    order: 5
  }
