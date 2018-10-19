const { Doctor, doctors } = require("./doctor");
// doctor.create(doctors);
// doctor.save();
Doctor.collection.insert(doctors);