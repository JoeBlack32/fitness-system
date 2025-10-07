import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { IWorkoutAttributes, IExercise, WorkoutType } from '../types';

interface WorkoutCreationAttributes extends Optional<IWorkoutAttributes, 'id' | 'caloriesBurned' | 'notes' | 'rating' | 'completed'> {}

class Workout extends Model<IWorkoutAttributes, WorkoutCreationAttributes> implements IWorkoutAttributes {
  public id!: string;
  public userId!: string;
  public date!: string;
  public type!: WorkoutType;
  public name!: string;
  public duration!: number;
  public exercises!: IExercise[];
  public caloriesBurned?: number;
  public notes?: string;
  public rating?: number;
  public completed!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Workout.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    type: {
      type: DataTypes.ENUM(...Object.values(WorkoutType)),
      allowNull: false,
      defaultValue: WorkoutType.STRENGTH
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Duration in minutes'
    },
    exercises: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: []
    },
    caloriesBurned: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'calories_burned'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5
      }
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: 'workouts',
    indexes: [
      { fields: ['user_id'] },
      { fields: ['date'] },
      { fields: ['user_id', 'date'] }
    ]
  }
);

export default Workout;