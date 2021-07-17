![OtterPeopleBanner](https://user-images.githubusercontent.com/79018160/126011396-d5465aee-869e-44ae-9989-76cc26c933c2.png)

# Otter People 
*Stay in touch with each otter.*

A place for alumni and friends to create private groups and events. <br>
Invite like-minded others and get activity recommendations tailored to your locations.<br>

Never lose touch with your friends and each otter again!

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [UI & Usage](#usage)
4. [Technologies](#tech)
5. [Contributors](#contributors)
6. [Project Takeaways](#takeaways)
7. [License](#license)





## Overview <a name="overview"/>
**Otter People** was a capstone project for [Hack Reactor](https://www.hackreactor.com/) Austin's 56 cohort. The team of 6 engineers was given one week to create the full-stack application based on client requirements. The client requested an alumni networking application where users could create and join both groups and events. The client wanted groups to be private and invite-only and upcoming events to be prominently displayed and specific to individual groups. Additionally, the client wished for event and meetup recommendations based on group members' geolocations.

## Installation <a name="installation"/>
1. Clone down repo
   ```
   git clone https://github.com/hratx-blue-ocean/alumni-meetup.git 
   ``` 
2. Install NPM packages
   ```
   npm install
   ```
  
3. Enter you API in config.js
    
4. Open two terminals

    Start the frontend (development mode):
    ```
    npm run start
    ```
    Start the server:
    ```
    npm run devServer
    ```





## UI & Usage <a name="usage"/>
### Dark Logo
<img src="https://user-images.githubusercontent.com/33425993/125796028-b0f718f1-9368-43c7-854f-3e21b79b0b25.png" width=135>

### Light Logo
<img src="https://user-images.githubusercontent.com/33425993/125796025-9e57f2a2-12fe-464c-8e01-53ae94354903.png" width=135>

### Walkthrough
On page load, the user is presented with Otter People's landing page to enter their credentials to log in. If not already a member, the user can click the 'Sign up' button, and a modal sign-up form will appear. Once signed in or signed up, the user is rerouted to their personal dashboard.

.

.

.

.

[SCREEN CAPTURE IMAGE HERE]

.

.

.

.






The personal dashboard is an intuitive three-column layout. The left column displays the user's group information. Only groups that the user is a member of will be displayed. If the member wants to create a group, they click on the 'Create New Group' button and will be presented with a modal form to create the group. The new group will be created on form submission, the group creator will automatically be added to the group, and the user's group list will rerender.

A user clicks on 'Join Existing Group' and provides the secret group invitation code to join a group. If they enter the correct code, the user is immediately added to the group.

All groups are private. To invite new members to the group, an existing group member must share the group's invitation code. 


.

.

.

.

[SCREEN CAPTURE IMAGE HERE]

.

.

.

.


The center column displays the group's information including the name, description, and the invitation code. Underneath the group details is a list of upcoming group events. 


Sign up

Create a group

Invite friends with the provided group code.

Get recommendations of what to do based on the geolocation of group members.




## Technologies <a name="tech"/>

<table>
<tr>
    <td>Languages</td>
    <td><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"> <img src="https://camo.githubusercontent.com/5d3b0191832237fcbfc6d4497524e8bb547c6bfc9eafb738d5205c629d202067/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f68746d6c352532302d2532334533344632362e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d68746d6c35266c6f676f436f6c6f723d7768697465"></td>
</tr>
<tr>
    <td>Frameworks/Libraries</td
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
