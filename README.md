## Neighborhood Project

A project that shows the locations of different hipster places in the Los Angeles.

The information is retrieved from the FourSquare API and is displayed through the Google Maps API.

This project was created using the guidance of the MVVM design pattern. Knockout was used to
bind the objects together.

Project is deployed on: https://neighborhood-project.herokuapp.com/

## Installation
This project requires multiple dependencies. In order to get these dependencies, you need to install 
[npm](https://www.npmjs.com/). Details for installing this package can be found on this
[link](https://www.npmjs.com/get-npm). 


The `node` and `npm` versions used for this project is `5.5.1` and `8.4.0`, respectively.

the latest version of `node` and `npm` for a linux can be installed with the following command:
```bash
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo apt-get install -y build-essential
``` 

For a Mac, you need to ensure that you have a XCode and Homebrew.

Afterwards, install `node` with the following command:

```bash
 brew install node
```

After installing `npm`,  run the following to get all module dependencies on the terminal:

```
npm install
```


Afterwards, you will need to install some `ruby` dependencies for this project, such as [SASS](http://sass-lang.com/).
Assuming you have `ruby`, you can install them by using the following command for `linux`

```bash
sudo gem install sass --no-user-install
```

For a mac, it would be
```bash
gem install sass
```


If you do not have the binaries, `gem` or `ruby`, you may need to install 
`ruby` from this [link](https://www.ruby-lang.org/en/documentation/installation/) and `gem` from this [link](https://rubygems.org/gems/rubygems-update-2.6.14.gem).

For a Mac, `ruby` comes preinstalled.

If you have a linux and do not have `ruby`, the following commands can be used to install ruby automatically:

```bash
sudo apt-add-repository ppa:brightbox/ruby-ng
sudo apt-get update
sudo apt-get install ruby2.4
sudo apt-get install ruby`ruby -e 'puts RUBY_VERSION[/\d+\.\d+/]'`-dev
``` 

## Running Project
Afterwards you will need to all the bundled all the javascript files into one file with the 
following command on the terminal:

```bash
npm run-script build:dev
```

The project can be viewed by first running it on a local server with the 
following command;

```bash
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

