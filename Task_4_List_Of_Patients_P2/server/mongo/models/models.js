// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// /* Definition schema for patient */
// const schema1 = new Schema({
//     _id: Schema.Types.String,
//     firstName: String,
//     lastName: String,
//     birthDate: Date,
//     gender: { type: String, enum: ['Male', 'Female'] },
//     phoneNumber: String,
//     email: String
// });

// /* Definition schema for Doctor */
// const schema2 = new Schema({
//     _id: Schema.Types.String,
//     firstName: String,
//     lastName: String
// });

// /* Definition schema for description */
// const schema3 = new Schema({
//     _id: Schema.Types.String,
//     value: String
// });

// /* Definition schema for visit */
// const schema4 = new Schema({
//     _id: Schema.Types.String,
//     description: { type: Schema.Types.String, ref: 'Description' },
//     doctor: { type: Schema.Types.String, ref: 'Doctor' },
//     patient: { type: Schema.Types.String, ref: 'Patient' },
//     date: Date
// });


// const Patient = mongoose.model('Patient', schema1);
// const Doctor = mongoose.model('Doctor', schema2);
// const Description = mongoose.model('Descripton', schema3);
// const Visit = mongoose.model('Visit', schema4);

// module.exports = {
//     Patient,
//     Doctor,
//     Description,
//     Visit
// };
