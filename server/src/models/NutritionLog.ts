import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { INutritionLogAttributes, IMeal } from '../types';

interface NutritionLogCreationAttributes extends Optional<INutritionLogAttributes, 'id' | 'totalCalories' | 'totalProtein' | 'totalCarbs' | 'totalFats' | 'waterIntake' | 'notes'> {}

class NutritionLog extends Model<INutritionLogAttributes, NutritionLogCreationAttributes> implements INutritionLogAttributes {
  public id!: string;
  public userId!: string;
  public date!: string;
  public meals!: IMeal[];
  public totalCalories!: number;
  public totalProtein!: number;
  public totalCarbs!: number;
  public totalFats!: number;
  public waterIntake!: number;
  public notes?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

NutritionLog.init(
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
    meals: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: []
    },
    totalCalories: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'total_calories'
    },
    totalProtein: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      field: 'total_protein'
    },
    totalCarbs: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      field: 'total_carbs'
    },
    totalFats: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      field: 'total_fats'
    },
    waterIntake: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      field: 'water_intake',
      comment: 'Water intake in liters'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'nutrition_logs',
    indexes: [
      { fields: ['user_id'] },
      { fields: ['date'] },
      { 
        fields: ['user_id', 'date'],
        unique: true
      }
    ]
  }
);

export default NutritionLog;