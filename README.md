# NutriAI Dashboard
An AI-powered Nutrition Dashboard that helps users calculate health metrics, generate personalized nutrition plans using AI, edit meal plans, and export professional PDF reports.

## Live Demo

Frontend: https://ai-nutritiondashboard.netlify.app

Backend API: https://ai-nutrition-dashboard-backend.onrender.com

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### Health Metrics

* BMI Calculation
* Ideal Body Weight (IBW) Calculation
* User Profile Management

### AI Nutrition Planning

* Personalized AI-generated meal plans
* Nutrition preference selection

  * Vegetarian
  * Vegan
  * Eggetarian
  * Non-Vegetarian
* Fitness goal selection

  * Weight Gain
  * Weight Loss
  * Maintain Weight

### Meal Plan Management

* Editable meal plans
* Update food items and quantities
* Save changes to MongoDB

### Nutrition Summary

* Total Calories
* Protein
* Carbohydrates
* Fat Breakdown

### PDF Export

* Download professional nutrition reports
* Includes profile information, metrics, meal plan, and nutrition summary

### Responsive Design

* Desktop
* Tablet
* Mobile

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Bootstrap 5
* jsPDF

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

### AI Integration

* Groq API (Llama Model)

### Deployment

* Frontend: Netlify
* Backend: Render

---

## Project Structure

```bash
frontend/
│
├── src/
│   ├── pages/
│   ├── components/
│   ├── api/
│   └── App.jsx
│
└── public/

backend/
│
├── controllers/
├── routes/
├── models/
├── middleware/
├── services/
├── config/
└── server.js
```

---

## Installation

### Clone Repository

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Nutrition

```http
POST /api/nutrition/generate
GET /api/nutrition
PUT /api/nutrition/:id
```

---

## Assignment Requirements Covered

* User Profile Form
* BMI Calculation
* Ideal Body Weight (IBW)
* Nutrition Preferences
* Fitness Goals
* AI-Powered Nutrition Plan Generation
* Editable Meal Plans
* Dynamic Nutrition Calculations
* PDF Export
* Responsive Design
* Frontend + Backend Implementation
* MongoDB Integration
* JWT Authentication
* AI Integration

---

## Author

Roshan Wankhede

MERN Stack Developer
