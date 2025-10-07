import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { IProgramAttributes, IProgramSchedule, IProgramProgress, Goal, ProgramLevel } from '../types';

interface ProgramCreationAttributes extends Optional<IProgramAttributes, 'id' | 'description' | 'isActive' | 'startDate' | 'endDate' | 'progress'> {}

class Program extends Model<IProgramAttributes, ProgramCreationAttributes> implements IProgramAttributes {
  public id!: string;
  public userId!: string;
  public name!: string;
  public description?: string;
  public goal!: Goal;
  public level!: ProgramLevel;
  public duration!: number;
  public schedule!: IProgramSchedule;
  public isActive!: boolean;
  public startDate?: string;
  public endDate?: string;
  public progress!: IProgramProgress;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Program.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    goal: {
      type: DataTypes.ENUM(...Object.values(Goal)),
      allowNull: false
    },
    level: {
      type: DataTypes.ENUM(...Object.values(ProgramLevel)),
      defaultValue: ProgramLevel.BEGINNER
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 4,
      comment: 'Duration in weeks'
    },
    schedule: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {}
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_active'
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'start_date'
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'end_date'
    },
    progress: {
      type: DataTypes.JSONB,
      defaultValue: {
        completedWorkouts: 0,
        totalWorkouts: 0,
        currentWeek: 1
      }
    }
  },
  {
    sequelize,
    tableName: 'programs',
    indexes: [
      { fields: ['user_id'] },
      { fields: ['is_active'] }
    ]
  }
);

export default Program;