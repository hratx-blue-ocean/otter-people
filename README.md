![OtterPeopleBanner](https://user-images.githubusercontent.com/79018160/126011396-d5465aee-869e-44ae-9989-76cc26c933c2.png)

# Otter People 
*Stay in touch with each otter.*

A place for alumni and friends to create private groups and events. <br>
Invite like-minded others and get activity recommendations tailored to your locations.<br>

Never lose touch with your friends and each otter again!

## Table of Contents

1. [Overview](#overview)
2. [UI & Usage](#usage)
3. [Installation](#installation)
4. [Technologies](#tech)
5. [Contributors](#contributors)
6. [Project Takeaways](#takeaways)
7. [License](#license)





## Overview <a name="overview"/>
**Otter People** was a capstone project for [Hack Reactor](https://www.hackreactor.com/) Austin's 56 cohort. The team of 6 engineers was given one week to create the full-stack application based on client requirements. The client requested an alumni networking application where users could create and join both groups and events. The client wanted groups to be private and invite-only and upcoming events to be prominently displayed and specific to individual groups. Additionally, the client wished for event and meetup recommendations based on group members' geolocations.


## UI & Usage <a name="usage"/>

Otter People's UI has both custom dark and light themes that easily toggle in the upper right-hand corner of the application. 

### Dark Logo
<img src="https://user-images.githubusercontent.com/33425993/125796028-b0f718f1-9368-43c7-854f-3e21b79b0b25.png" width=135>

### Light Logo
<img src="https://user-images.githubusercontent.com/33425993/125796025-9e57f2a2-12fe-464c-8e01-53ae94354903.png" width=135>

### Walkthrough
On page load, the user is presented with Otter People's landing page to enter their credentials to log in. If not already a member, the user can click the 'Sign up' button, and a modal sign-up form will appear. Once signed in or signed up, the user is rerouted to their personal dashboard.

![Otter People Demo - Sign Up](https://user-images.githubusercontent.com/33425993/126394822-a30f177b-760f-4292-86a5-a96b39bf2a10.gif)

The personal dashboard is an intuitive three-column layout. The left column displays the user's group information. Only groups that the user is a member of will be displayed. If the member wants to create a group, they click on the 'Create New Group' button and will be presented with a modal form to create the group. The new group will be created on form submission, the group creator will automatically be added to the group, and the user's group list will rerender.
                            
The center column displays the group's information, including the name, description, and invitation code. A sorted list of upcoming group events appears below. Each event card shows the event details and the ability for a user to RSVP. A user clicks on '+ Event' at the top of the column to create a new event.

![Otter People Demo - New Group and Event](https://user-images.githubusercontent.com/33425993/126392791-46094f66-2f9f-4ce7-b7be-e826a359d37f.gif)


The right column displays two widgets. At the top is a list of the current group's members. When a new group is selected, the member's list updates. Underneath is the Around Town widget, which provides users event and activity suggestions based on group member's geolocations.

A user clicks on 'Join Existing Group' and provides the secret group invitation code to join a group. If they enter the correct code, the user is immediately added to the group.

All groups are private. To invite new members to the group, an existing group member must share the group's invitation code. 

![Otter People Demo - Invite to Group](https://user-images.githubusercontent.com/33425993/126377034-4b23a3f1-9618-4b08-b518-d27978489f09.gif)


## Installation <a name="installation"/>

### Pre-requisites 
To use the 'Around Town' widget you will need get access to [Amadeus's API](https://developers.amadeus.com/) and a [Radar.io key](https://radar.io/) 

### Install
1. Clone down repo
   ```
   git clone https://github.com/hratx-blue-ocean/alumni-meetup.git 
   ``` 
2. Install NPM packages
   ```
   npm install
   ```
  
3. Create a .env file in the main directory of the application that looks like:
   ```
   AMADEUS_KEY=YOUR_KEY
   AMADEUS_SEC=YOUR_KEY
   RADAR_KEY=YOUR_KEY
   ```
   
    
4. Open two terminals

    Start the frontend (development mode):
    ```
    npm run start
    ```
    Start the server:
    ```
    npm run devServer
    ```

## Technologies <a name="tech"/>

<table>
<tr>
    <td>Languages</td>
    <td><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"> <img src="https://camo.githubusercontent.com/5d3b0191832237fcbfc6d4497524e8bb547c6bfc9eafb738d5205c629d202067/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f68746d6c352532302d2532334533344632362e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d68746d6c35266c6f676f436f6c6f723d7768697465"></td>
</tr>
<tr>
<tr>
    <td>Frameworks / Libraries</td>
   
<td><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"> 
<img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"> <img height="28" src="https://user-images.githubusercontent.com/75913066/125658941-12717ddd-ec81-471c-9aa2-faacde559a31.png"> </td>
</tr>

  <tr>
    <td>Databases</td>
    <td><img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"></td>
</tr>
  <tr>
    <td>Hosting</td>
    <td><img src="https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white"></td>
</tr>
  <tr>
    <td>Testing/Tools</td>
    <td><img src="https://camo.githubusercontent.com/f0e7f8890d0e8f4b44c7aaaad3dac77195b2756de5e20d9c79fafbaf32baf456/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d6a6573742d2532334332313332353f267374796c653d666f722d7468652d6261646765266c6f676f3d6a657374266c6f676f436f6c6f723d7768697465">  <img alt="Postman" src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=red" />
      </td>
 <tr>
     <td>Design</td>
     <td><img alt="Figma" src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white"/></td>
 </tr>
  <tr>
      <td>Workflow</td>
      <td><img alt="Trello" src="https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white"/> <img alt="Discord" src="https://img.shields.io/badge/Discord-%237289DA.svg?style=for-the-badge&logo=discord&logoColor=white"/></td>
    </tr>

</table>

## Contributors <a name="contributors"/>
[Angela Wu](https://github.com/aywgit)

[Addie Johnsen](https://github.com/addiejohnsen)

[Eric Handley](https://github.com/erichand18)

[Felipe Erazo](https://github.com/ferazo94)

[Michael Palmer](https://github.com/gitInLoserWereGoingShopping)

[Ryan May](https://github.com/ryan-m-may)

## Takeaways <a name="takeaways"/>


## License <a name="license"/>

## Sources & Thanks 
React-date picker wrapper for Chakra by: https://gist.github.com/igoro00/99e9d244677ccafbf39667c24b5b35ed
