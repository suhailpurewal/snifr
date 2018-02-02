# Snif-r

## A Dating webapp for dogs!

### The purpose of this app is to connect dogs based off of personality traits, allow them to easily communicate via direct messages, and show interest by using the "Sniff" feature.

#### This app used a tremendous amount of technologies to be functional, including: Passport, Node, Sequelize, Axios, Cloudinary, GearHost DB, HandlebarsJS, Express, HTML, CSS & JS.

## _Home Page_
* This page gives the user the option to log in, or create a new account. 
* Upon logging in, it will take you to your dogs homepage.
* If you need to create an account, it will route you to our creation pages.

## _New Account_
* These pages go through the steps of setting up an account. It will request username, password and then route you to our Dog Information page.

## _Dog Information_
* This page takes basic information about your dog and an image. The image is uploaded to cloudinary, and the direct link is saved as a variable in our DB linked to the user information.

## _Suvery Pages_
* These pages get personality traits of your pup through questions that are weighted and you pick how strongly you either agree or disagree.

## _Filters Page_
* This page takes your prefrence of a dog match. If you only want to be matched with a specific gender, size, activity level, etc. This will limit the results of the match page to be based off of your filters. This data is stored in a seperate table and linked to your dogs ID.

## _Profile Page_
* This page shows your dog, and has a link to be able to edit some basic information which edits the DB.
* It also has a link to view all of your chat conversations.
