import User from './User';
import Workout from './Workout';
import Program from './Program';
import NutritionLog from './NutritionLog';
import NutritionProfile from './NutritionProfile'; // ✅ УЖЕ ЕСТЬ

// User -> Workouts (один ко многим)
User.hasMany(Workout, {
  foreignKey: 'userId',
  as: 'workouts',
  onDelete: 'CASCADE'
});
Workout.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// User -> Programs (один ко многим)
User.hasMany(Program, {
  foreignKey: 'userId',
  as: 'programs',
  onDelete: 'CASCADE'
});
Program.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// User -> NutritionLogs (один ко многим)
User.hasMany(NutritionLog, {
  foreignKey: 'userId',
  as: 'nutritionLogs',
  onDelete: 'CASCADE'
});
NutritionLog.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// User -> NutritionProfile (один к одному)
User.hasOne(NutritionProfile, { 
  foreignKey: 'userId', 
  as: 'nutritionProfile',
  onDelete: 'CASCADE' 
});
NutritionProfile.belongsTo(User, { 
  foreignKey: 'userId', 
  as: 'user' 
});

export {
  User,
  Workout,
  Program,
  NutritionLog,
  NutritionProfile // ← Это должно быть!
};