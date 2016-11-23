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

//Additional
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
  profilePhoto: 'https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/11951109_10204712823773040_2398717380581520929_n.jpg?oh=af55c1e4ff1220ccb1aee997b4eac626&oe=58D22DE1',
  // activeChallenges: [],
  like: [], //User
  locked: false
});

user3.save((err, user3) => {
  if(err) return console.log(err);
  console.log(user3 + ' Was created!');
  user3ID = user3._id;
  console.log('User3 id is: ', user3ID);
});

let user4ID;

const user4 = new User({
  username: 'liam-fitzpatrick',
  email: 'liam-fitzpatrick@gmail.com',
  password: 'password',
  passwordConfirmation: 'password',
  dob: '03/02/1970',
  gender: 'male',
  strapline: 'love climbing!!',
  bio: 'Climbing enthusiast and photographer',
  coverPhoto: 'http://activeazur.wpengine.netdna-cdn.com/wp-content/uploads/2015/02/rock-climbing-south-of-france-730x230.jpg',
  profilePhoto: 'http://dmmclimbing.com/wp-content/uploads/2011/05/Liam-on-By-the-Power-of-RAAA-7C-St-Bees.jpg',
  // activeChallenges: [], //Challenge
  video: '<iframe width="560" height="315" src="https://www.youtube.com/watch?v=-8qvasMlYXo" frameborder="0" allowfullscreen></iframe>',
  like: [], //User
  locked: false
});

user4.save((err, user4) => {
  if(err) return console.log(err);
  console.log(user4 + ' Was created!');
  user4ID = user4._id;
  console.log('user4 id is :', user1ID);
});

const userLuke = new User({
  username: 'Luke Hammond',
  email: 'luke@example.com',
  password: 'password',
  passwordConfirmation: 'password',
  dob: '13/09/1991',
  gender: 'male',
  strapline: 'Amatuer skier',
  bio: 'I fall... a lot',
  profilePhoto: 'https://scontent-cdg2-1.cdninstagram.com/t51.2885-19/s320x320/14145461_601713173321653_551387777_a.jpg',
  video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/48lpr0K54DM" frameborder="0" allowfullscreen></iframe>',
  like: [], //User
  locked: false
});

userLuke.save((err, userLuke) => {
  if(err) return console.log(err);
  console.log(user1 + ' Was created!');
  const userLukeID = userLuke._id;
  console.log('user1 id is :', userLukeID);
});

let challenge3ID;
const challenge3 = new Challenge({
  name: 'Haute Route Pyrenees',
  startDate: '01/06/17',
  finishDate: '01/08/17',
  cost: '£2000',
  location: { lat: 42.6929641, lng: -1.7960056 },
  description: 'Walk from the Atlantic Coast to the Mediterranean Coast across they Pyrenees',
  image: 'https://scontent.flhr2-2.fna.fbcdn.net/v/t1.0-9/11013614_10204617239103483_1541173441935147825_n.jpg?oh=d1080e1de8c698b52d2a94e87fd5aab6&oe=58BDED79',
  video: '<iframe width="640" height="360" src="https://www.youtube.com/embed/6vn0Er8wJIE" frameborder="0" allowfullscreen></iframe>',
  like: [],
  projectCreator: [user3ID],
  comments: '',
  participants: [user3ID]
});

challenge3.save((err, challenge3) => {
  if(err) return console.log(err);
  // console.log('running?');
  challenge3ID = challenge3._id;
  console.log('challenge3ID: ',challenge3ID);
  console.log('Created ', challenge3);
});

let challenge4ID;
const challenge4 = new Challenge({
  name: 'Walk the Pennine Way',
  startDate: '01/06/18',
  finishDate: '20/07/18',
  cost: '£1000',
  location: { lat: 55.5475, lng: 2.2739 },
  description: 'Steeped in history, this National Trail chases along the mountain tops along the rugged backbone of England and offers 268 miles of the finest upland walking in England. A once in a lifetime experience. ',
  image: 'https://www.sherpavan.com/accomm_booking/images/PW.gif',
  video: 'video',
  like: [],
  projectCreator: [user4ID],
  comments: 'Not for the feint hearted',
  participants: [user4ID]
});

challenge4.save((err, challenge4) => {
  if(err) return console.log(err);
  // console.log('running?');
  challenge4ID = challenge4._id;
  console.log('challenge3ID: ',challenge4ID);
  console.log('Created ', challenge4);
});
