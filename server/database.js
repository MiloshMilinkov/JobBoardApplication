import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';

const __dirname = path.resolve();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, 'posts.db')
});

// Define the Sequelize model
const JobPostModel = sequelize.define('JobPost', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  payRange: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  workLocation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: false
});

// Sync the model with the database
sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});

export { sequelize, JobPostModel };
