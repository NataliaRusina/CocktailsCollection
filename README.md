# Cocktails collection - React + TypeScript + Vite

This is a test project built using React, TypeScript, and Vite. It demonstrates the basic setup for a modern frontend application with fast development build times and type-safety features.

## Features

- React 18 with TypeScript
- Vite for fast development and build
- Hot Module Replacement (HMR)
- Basic UI for adding and viewing cocktails
- Local Storage for saving cocktails

## Getting Started

To get this project up and running locally, follow these steps:

1. Clone the repository:

git clone <repository-url>

2. Navigate into the project directory:

cd cocktails_collection

3. Install dependencies:

npm install

4. Run the development server:

npm run dev

The application will be available at http://localhost:3000.

Features of the Application

Display Cocktails: 
The app shows a list of cocktails, displaying their names and images. 
If searchBar is empty the app shows cocktails which names start with "A". When user starts searching the app shows search results. By clicking on cocktail item user gets recipe of the cocktail.

Add Cocktail: The user can input details about a cocktail, including its name, ingredients, instructions, category, and an optional image. If image is not uploaded - the default image will be used. The information is stored in the local storage.

Form Validation: The form ensures that all required fields are filled before submission.



