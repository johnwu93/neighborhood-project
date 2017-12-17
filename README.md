## Neighborhood Project

A project that shows the locations of different hipster places in the Los Angeles.

The information is retrieved from the FourSquare API and is displayed through the Google Maps API.

This project was created using the guidance of the MVVM design pattern. Knockout was used to
bind the objects together.

Project is deployed on: https://neighborhood-project.herokuapp.com/

## Installation
This project requires multiple dependencies. In order to get these dependencies, you need to install 
[npm](https://www.npmjs.com/). Details for installing this package can be found on this
[link](https://www.npmjs.com/get-npm). After installing `npm`,  run the following to get all module
dependencies on the terminal:

```
npm install
```

Afterwards, you will need to install some Ruby dependencies for this project, such as [SASS](http://sass-lang.com/) 
by using the package manager, Bundler. You can find more information about this manager on this link,
[link](https://github.com/bundler/bundler).

If you have a MacOsX, you can install `bundler` with the following command:

```
sudo gem install bundler
bundle install
```

If you do not have the binaries, `gem` or `ruby`, you may need to install 
`ruby` from this [link](https://www.ruby-lang.org/en/documentation/installation/) and `gem` from this [link](https://rubygems.org/gems/rubygems-update-2.6.14.gem) 

## Running Project
Afterwards you will need to all the bundled all the javascript files into one file with the 
following command on the terminal:

```
npm run-script build:dev
```

The project can be viewed by first running it on a local server with the 
following command;

```
npm run-script start
```

The website should pop up automatically. If it doesn't, look at the terminal window that called the previous task.
It will tell you what is the localhost url. Copy and paste that url link to your browser. The url should look something like
this:

```
http://localhost:3000
```

If you have any trouble running this project or have some concerns, 
please notify me through my email, johnwu93@gmail.com

