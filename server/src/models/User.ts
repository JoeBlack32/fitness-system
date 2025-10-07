import { DataTypes, Model, Optional } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from '../config/db';
import { IUserAttributes, IUserSafeAttributes, Gender, Goal, IUserSettings } from '../types';

interface UserCreationAttributes extends Optional<IUserAttributes, 'id' | 'age' | 'gender' | 'weight' | 'height' | 'goal' | 'settings' | 'lastLogin'> {}

class User extends Model<IUserAttributes, UserCreationAttributes> implements IUserAttributes {
  public id!: string;
  public email!: string;
  public password!: string;
  public name!: string;
  public age?: number;
  public gender?: Gender;
  public weight?: number;
  public height?: number;
  public goal?: Goal;
  public settings?: IUserSettings;
  public lastLogin?: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Метод для проверки пароля
  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  // Метод для получения данных без пароля
  public toSafeObject(): IUserSafeAttributes {
    const { password, ...safeUser } = this.toJSON();
    return safeUser;
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100]
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM(...Object.values(Gender)),
      allowNull: true
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    goal: {
      type: DataTypes.ENUM(...Object.values(Goal)),
      defaultValue: Goal.MAINTENANCE
    },
    settings: {
      type: DataTypes.JSONB,
      defaultValue: {
        notifications: true,
        theme: 'light',
        units: 'metric'
      }
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'users',
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  }
);

export default User;