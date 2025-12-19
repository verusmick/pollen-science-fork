# PollenScience Numbers Frontend
PollenScience Numbers Frontend is the client application that uses data from a REST interface which is common to ePIN's REST interface (see https://epin.lgl.bayern.de/schnittstelle) and is installed on same server.

The client is written in Vue.js 3 using a couple of third party libraries. For packaging Webpack is used. 

# Development
Currently, Node.js 20.0.0 is supported.

## Checkout
    git clone git@github.com:zaum-environment/pollenscience-numbers.git
    npm i

## Start
    npm start

## Build
    npm build

## Deploy
Set up some server and throw in the destination directory. The ```package.json``` file is prepared to call a file .local/deploy.bat. This bat-file is not checked in but your are free to create one locally and put some script in for automatic deployment. Currently, there is no pipeline set-up.

# Licenses
This project uses Font Awesome. The license is acquired by software owner Robert Gebauer (robert.gebauer@gmx.de). Before developing this project you must acquire a license at Robert as there are only a few free seats available.