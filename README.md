# Stahl's Freelancer App

This is the repository of my Phase 5 final project for Flatiron School.

*This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It was also built using Ruby v2.7.4 on Rails v7.0.4*

[Check out the live version of project (hosted on Render)](https://stahl-freelance-app.onrender.co`0-
## Goal

The goal of this project is to create a single-page application by leverage my knowledge of the following:
- Ruby
- Rails
- PostgreSQL
- Active Record
- JavaScript
- React
- Bootstrap
- client-side routing
- server-manipulation
- sessions/cookies
- login authentication
- APIs

## Getting Starting
Before you begin, you will need to install dependencies and run individual servers on the client-side and server-side modules. For the client-side, you will want to run `npm install --prefix client` to install the client dependencies for this project and `npm run --prefix client` to start the server. In a separate terminal, run `bundle install` to install the server dependencies. Then, run `rails db:migrate db:seed` to create the migrations and seed the database. Finally, run `rails s` to start the server.

## PostgreSQL Database
I built this project using a PostgreSQL database since that allowed me to deploy my code to the Render platform. As such, one of the Ruby dependencies was the pg gem (you can see this by going to the Gemfile in the root directory of this repository). There are some details included on [the Flatiron School starter code for our React-Rails repository](https://github.com/learn-co-curriculum/project-template-react-rails-api). You can walk through those steps to learn more on the deploying process.

## Project Overview
Time to jump be and join the gig economy! This application will allow you to post what you're selling or what you're looking to buy. You can also search for and communicate with other users on the platform. Finally, when you've connected with the right people and you have a clear understanding of what you're looking to accomplish, you can create a project to kick off your partnership.

Check out this gif for a quick walkthrough of the final project (this might take about 15-25 seconds to load):
![](https://github.com/Andrewstahl/phase-5-final-project/blob/main/media/Freelancer%20App%20Walkthrough.gif)

## Database Migration Structure
Here is a quick visual for the database structure.
![](https://github.com/Andrewstahl/phase-5-final-project/blob/main/media/Flatiron%20Phase%205%20Database%20Diagram%20-%20Freelancer%20App.png)

## Toggle Functionality
You will see on the top-right of the application that you can switch between Freelancer and Buyer views. This will change the color scheme of the application so you have a visual representation of what part of the system you are on (<u>purple</u> is freelancer, <u>green</u> is buyer). More importantly, it will show you only what's applicable to your current system mode. For example, if you are on Freelancer mode, you will only see the postings you have made as a freelancer. These distinctions will be noted in the page sub-sections below.

## Pages
### **Login**
The "Login" page will allow the user to log into their account with their credentials. If they enter in incorrect credentials, it will prompt the user with applicable errors. The user can also select to signup if they want to create a user account from scratch.

This page uses cookies and sessions within the browser. If the browser is set to not store cookies, the login won't work.

### **Postings**
The first link on the navbar is the "Postings" page. This page gives users full CRUD functionality through the action buttons and posting form.
- <u>**Freelancer Mode**</u>: Only shows you the postings that you have made as a freelancer. This would be the postings/skillsets that you are looking to *sell*
- <u>**Buyer Mode**</u>: Only shows you the postings that you have made as a buyer. This would be the postings/skillsets that you are looking to *buy*.

### **Search**
The "Search" page will show you all of the other users on the platform. This will display each user as a card, with pertinent information like the number of their buyer/freelancer postings and the specialty categories associated with those postings.

### **Conversations**
The "Conversations" page will show all conversations that you have opened with other users on the platform. You can click on the "New Conversation" button on the top-left to start a new conversation. Whenever you select a new conversation, it will show all of the messages on the right side of the screen. The messages section will also display the user at the top and the number of messages. Sender and receiver messages will appear on opposite sides of the screen and the colors for the sender messages will mirror the system mode color scheme.

### **Projects**
The "Projects" page will show you all of the projects that you have attached to your account. You can have full CRUD functionality for current/future projects and read access for past projects. You will need to tie your projects to a posting and another user. If you have any postings, you will need to go to the "Postings" section and create a posting. Once you create a project, it will show up below along with the cost/price and the due date. The wording and formatting will change depending on if the project was completed (due date is in the past) or if it is yet to be completed.
- <u>**Freelancer Mode**</u>: Only shows you the projects that you have as a freelancer. The other user attached to project will be marked as the buyer in the database and you will be marked as the freelancer.
- <u>**Buyer Mode**</u>: Only shows your projects as a buyer. The other user attached to project will be marked as the freelancer in the database and you will be marked as the buyer.

### **Profile**
The "Profile" page will allow the user to change their credentials. They can change their username or password and fully delete their account. If the fetch request to change the information returns an error, the user will get a pop-up notifying them that the account update has failed. If they are successful in changing their account, it will give them a success pop-up. If they fully delete their account, it will kick the user back to the login page.

## Future Development
- Login Page
  - Additional password validations (capital letter, lowercase letter, number, etc.) with visual cues on password creation
  - Toggle password visibility
- Search page
  - Filter for specific specialities 
  - Seeing project details for each user
  - Favoriting certain users and filtering for them
  - Clicking on users and having a side bar pop up with their posting/project details
    - We can show each posting and then a detail under that would be how many previous and current projects they have for that project
  - Click on a button to message someone directly from their search result
- Conversations Page
  - Editing/deleting specific messages
  - Deleting conversations
  - Adding multiple users to a conversation
  - Reorder conversations based on the last updated message date
- Projects Page
  - Date validation to ensure projects cannot be created for a previous time/date
  - Immediately show newly created postings when creating a new project without needing to refresh
- Profile Page
  - Add an icon for each person

## Resources
- [Live version of project (hosted on Render)](https://stahl-freelance-app.onrender.com)
- [Flatiron starter code for React-Rails repository](https://github.com/learn-co-curriculum/project-template-react-rails-api)
- [Create-React-App for starter client repository](https://github.com/facebook/create-react-app)

## Additional Posts
- [YouTube walkthrough of the project](https://youtu.be/usV88ABxVno)
- [Medium blog post about getting started with cookies and sessions on Rails](https://andrewstahlsoftware.medium.com/getting-started-with-cookies-session-management-ruby-on-rails-project-7878d8995cce)