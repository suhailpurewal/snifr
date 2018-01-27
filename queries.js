
// Get all users where email equals param
db.User.findAll({
    where: {
        email: req.params.email
    }
});

// Get all survey results that meet filter requirements
db.Survey.findAll({
    include: [{
        model: Dog,
        where: {
            temperament: req.params.temperament,
            size: {
                [Op.lt]: req.params.size,
            },
            sex: req.params.sex,
            neutured_spayed: req.params.neutured_spayed
        }
    }]
})

// Get all the survey results
db.Survey.findAll({})

// Create New Dog
db.Dog.create({  
    UserId: req.params.UserID,
    name: 'Spot',
    breed: 'Boxer',
    age: 2,
    sex: true,
    size: 30,
    temperament: 3,
    fixed: true,
    photo: "www.google.com",
    description: "A very good girl"
  })

// Create New Survey
db.Survey.create({
    DogId: req.params.DogId,
    q1: 2,
    q2: 2,
    q3: 2,
    q4: 2,
    q5: 2,
    q6: 2,
    q7: 2,
    q8: 2,
    q9: 2,
    q10: 2
})

// Edit a Dog
db.Dog.findOne({  
    dog_id: req.params.dog_id
  })
  .then(dog => {
    dog.updateAttributes({
      name: 'Maizey',
      breed: 'pointer',
      age: 1,
      sex: true,
      size: 35,
      temperament: 2,
      fixed: true,
      photo: 'www.google.com',
      description: 'A very good girl'
    });
  });

//   Edit a Survey
db.Survey.findOne({
    survey_id: 4
})
.then(survey => {
    survey.updateAttributes({
        q1: 2,
        q2: 2,
        q3: 2,
        q4: 2,
        q5: 2,
        q6: 2,
        q7: 2,
        q8: 2,
        q9: 2,
        q10: 2,

    })
})

// Delete a Dog
db.Dog.destory({  
    where: { id: req.params.id}
  })
  .then(deletedPet => {
    console.log(`Has the dog been deleted? 1 means yes, 0 means no: ${deletedPet}`);
  });




