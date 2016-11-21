const mongoose = require('mongoose');
const User = require('../models/user');
const Challenge = require('../models/challenge');

//  If wanting to remove the promise warning on running the seeds file..
const Promise = require('bluebird');
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/wdi23-project3');

User.collection.drop();
Challenge.collection.drop();
console.log('Dropping the db\'s');

// const usersArray = [];
// const challengesArray = [];
//
// User.create([{
//   username: 'Joe Blogs',
//   email: 'joeb@gmail.com',
//   password: 'password',
//   passwordConfirmation: 'password',
//   dob: '13/09/1991',
//   gender: 'male',
//   strapline: 'Thrill seeker',
//   bio: 'Professional climber for Redbull',
//   coverPhoto: 'https://s-media-cache-ak0.pinimg.com/236x/5a/d5/52/5ad552b18314423d718aac9b43c2f556.jpg',
//   profilePhoto: 'http://image1.redbull.com/rbcom/010/2016-04-26/1331791190164_2/0010/1/1500/1000/2/dynos-are-the-coolest-moves-in-climbing.jpg',
//   activeChallenges: [], //Challenge
//   like: [] //User
// },{
//   username: 'Dan Jenkins',
//   email: 'dj@gmail.com',
//   password: 'password',
//   passwordConfirmation: 'password',
//   dob: '16/02/1981',
//   gender: 'male',
//   strapline: 'Lifelong kayaker in search of new adventures',
//   bio: 'Love kayaking and all things water',
//   coverPhoto: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Female_kayaker_paddles.jpg',
//   profilePhoto: 'http://www.nwrafting.com/wp-content/uploads/2012/01/JR.jpg',
//   activeChallenges: [],
//   like: []
// }],((err, user) => {
//   // console.log(user);
//   usersArray.push(user);
//   // console.log(usersArray);
// })).then((err, thing) => {
//   if(err) return console.log(err);
//   console.log('thing', thing);
//   console.log('usersArray here: ', usersArray);
//   Challenge.create([{
//     name: 'Climb Annapurna',
//     startDate: '01/01/16',
//     finishDate: '20/07/16',
//     cost: '5000',
//     location: { lat: 54, lng: 53 },
//     description: 'Climb the worlds deadliest Mountain with experienced Mountain Guide Micky Ginger',
//     image: 'http://lh6.ggpht.com/MYBmrR4UydPzD1fKuTuIgPir_kEfiYcFU3gSF24K59q4GX0sULvu4JrBY4aI1t1q75w9jNnRttDl7QkxKxPoBw',
//     video: 'video',
//     like: [usersArray[1]],
//     projectCreator: 'Chris',
//     comments: 'Not for the faint hearted',
//     participants: {
//       userId: usersArray[0],
//       data: {
//         id: usersArray[0],
//         donation: [5]
//       }
//     }
//   }],((err, thing) => {
//     // console.log(thing);
//     challengesArray.push(thing);
//     console.log('challengesArray', challengesArray);
//     console.log('usersArray', usersArray);
//     // mongoose.connection.close();
//   })).then((that) => {
//     console.log('done:', that);
//   // mongoose.connection.close();
//   }).error((error) => {
//     console.log('error: ', error);
//   // mongoose.connection.close();
//   });
// });




//
//
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
  like: [] //User
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
  like: []
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
    location: { lat: 54, lng: 53 },
    description: 'Climb the worlds deadliest Mountain with experienced Mountain Guide Micky Ginger',
    image: 'http://lh6.ggpht.com/MYBmrR4UydPzD1fKuTuIgPir_kEfiYcFU3gSF24K59q4GX0sULvu4JrBY4aI1t1q75w9jNnRttDl7QkxKxPoBw',
    video: 'video',
    like: [],
    projectCreator: 'Chris',
    comments: 'Not for the feint hearted',
    participants: {
      data: {
        ids: [user1ID],
        donations: [5]
      },
      userIds: [user2ID] }
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
      location: { lat: 54, lng: 53 },
      description: 'Motorbike around the world, the long way ',
      image: 'http://longwayround.com/images/banner_long-way-round.jpg',
      video: 'video',
      like: [],
      projectCreator: 'Ewan McGregor',
      comments: 'comment 1',
      participants: {
        data: {
          ids: [user2ID],
          donations: [15]
        },
        userIds: [user2ID] }
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
