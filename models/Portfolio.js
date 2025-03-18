const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  about: {
    name: String,
    role: String,
    description: String,
    photo: String,
    resumeUrl: String,
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
    },
  },
  skills: [{
    name: String,
    level: Number,
  }],
  projects: [{
    title: String,
    description: String,
    imageUrl: String,
    projectUrl: String,
    githubUrl: String,
    technologies: [String],
  }],
  experience: [{
    company: String,
    role: String,
    duration: String,
    description: String,
  }],
  education: [{
    institution: String,
    degree: String,
    duration: String,
    description: String,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
