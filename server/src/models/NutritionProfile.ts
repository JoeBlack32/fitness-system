import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

export enum NutritionGoal {
  LOSS = 'loss',
  MAINTAIN = 'maintain',
  GAIN = 'gain'
}

export interface INutritionProfileAttributes {
  id: string;
  userId: string;
  height: number;
  targetWeight: number;
  goal: NutritionGoal;
  activityLevel: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface NutritionProfileCreationAttributes extends Optional<INutritionProfileAttributes, 'id'> {}

class NutritionProfile extends Model<INutritionProfileAttributes, NutritionProfileCreationAttributes> implements INutritionProfileAttributes {
  public id!: string;
  public userId!: string;
  public height!: number;
  public targetWeight!: number;
  public goal!: NutritionGoal;
  public activityLevel!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

NutritionProfile.init(
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
      unique: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: 'Height in cm'
    },
    targetWeight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'target_weight',
      comment: 'Target weight in kg'
    },
    goal: {
      type: DataTypes.ENUM(...Object.values(NutritionGoal)),
      allowNull: false,
      defaultValue: NutritionGoal.MAINTAIN
    },
    activityLevel: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 1.55,
      field: 'activity_level',
      comment: 'Activity multiplier: 1.2-1.9'
    }
  },
  {
    sequelize,
    tableName: 'nutrition_profiles',
    indexes: [
      { fields: ['user_id'], unique: true }
    ]
  }
);

export default NutritionProfile;