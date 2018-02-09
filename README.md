# Predix UI

This repo hosts predix-ui.com, the website for GE's Predix Design System. The site includes component demos, design and development guides, and additional tools for using the Predix Design System.

## How to run on your machine

### Install tools

If you don't have them already, you'll need node, bower, and gulp to be installed globally on your machine:

1. Install [node](https://nodejs.org/en/download/). This includes npm -- the node package manager.
2. Install [bower](https://bower.io/) globally: `$ npm install bower -g`
3. Install [gulp](http://gulpjs.com/) globally: `$ npm install gulp-cli -g`

### Clone the project and install dependencies

1. Clone the project to your machine and open the folder:
	```
	$ git clone https://github.com/predix-ui/predix-ui.github.io.git
	$ cd predix-ui.github.io
	```
2. Install dependencies:

	```
	$ npm install
	$ bower install
	```

### Developing locally

As you are developing, you can see your changes by running `gulp serve` from your command line. This will build the project files, serve the site locally, and automatically refresh the site as you make changes.

### Running a local build

When you think you are ready to deploy your changes, you can build the site locally to test how the changes will behave in production. The localBuild task runs additional tasks that simulate how the site will be built for production. Many of these tasks take a significant amount of time to run, so you should only run this command once you want test that your changes are ready to push to production.

To run a local build:
  ```
  $ gulp localBuild
  $ cd build/default
  ```
Serve the site using [npm serve](https://www.npmjs.com/package/serve) or any other static web server. To install npm serve run:
  ```
  $ npm install -g serve
  ```
Then you can run `serve` from the `build/default` directory to serve the local build of the site.

### Running a production build
You should never run the `gulp prodBuild` task manually. This task is run on Travis as part of our CI/CD process when a change is pushed to production.

## Build a new component

### Developing the component
1. Generate a basic component structure using the [generator-px-comp](https://github.com/predixdev/generator-px-comp) Yeoman generator.
2. Write the code to create a new component in that folder. (Have fun! 🎉)
3. Write tests for your component that are now passing. (Nice work! 💯)
4. Publish your component on bower:
	```
	$ bower register px-COMPONENT-NAME https://github.com/PredixDev/px-COMPONENT-NAME.git
	```

### Adding interactive documentation

All components should have an interactive documentation and demo page on the [Predix Design System site](https://www.predix-ui.com). These documentation pages are built automatically by Travis CI for each component when a new release (i.e. a new tag) is pushed to Github.

Before you begin, you'll need to install the following tools:

1. [Ruby](https://www.ruby-lang.org/en/) version 1.9.3 or higher (this could be tricky, and the ruby build that shipped with your system might be too old)
2. [Travis CLI ruby gem](https://github.com/travis-ci/travis.rb)

Once you are ready you can:
1. [Enable the repository](https://docs.travis-ci.com/user/getting-started#To-get-started-with-Travis-CI%3A) you'd like to build in Travis CI. **Note: you only need to follow steps 1 & 2 of the Travis instructions.**
2. Run the following command, replacing "xxxxx" with your Sauce Labs username and key:
	```
	$ travis encrypt "SAUCE_USERNAME=xxxxx SAUCE_ACCESS_KEY=xxxxx" --add
	```
	(To find your Sauce Labs key, log into your account > select your name in the top right > select my account > click the "show" button under Access Key)
3. Check the `.travis.yml` file with your newly encrypted credentials into git.

### Adding the component to site nav and component gallery

1. Add the component to `bower.json`:
  ```
  "px-COMPONENT NAME": "^1.0.0"
  ```
2. Add the component demo to the 'fragments' array in `polymer.json`:
  ```
  "bower_components/px-COMPONENT-NAME/demo/px-COMPONENT-NAME-demo.html"
  ```
3. Add the component to `elements/px-catalog/pages.json`:
    ```
    {
      "path": "px-COMPONENT-NAME",
      "label": "COMPONENT NAME",
      "module": "px-COMPONENT-NAME-demo",
      "entrypoint": "/bower_components/px-COMPONENT-NAME/demo/px-COMPONENT-NAME-demo.html",
      "keywords": [
        "px-COMPONENT-NAME",
        // Keywords will be used to search within the site nav
      ],
      "tags": [
        // Tags will be used to filter the Component Gallery
      ]
    }
    ```
    The ‘keywords’ array specifies search terms for the site nav. The ‘tags’ array specifies the tags used for filtering the component within the component gallery. Only use the tags already in use in the [component gallery](https://www.predix-ui.com/#/gallery).

    **Note: You do not need to manually edit `tile-data.json` and `component-data.json`  These files will be generated for you based on the information you added to the `pages.json` file.**
2. Add the component gallery images to the `raw-img/component-gallery` directory. Make sure you add four images:

  - COMPONENT-NAME_dark.png
  - COMPONENT-NAME_dark@2x.png
  - COMPONENT-NAME_light.png
  - COMPONENT-NAME_light@2x.png

    These images will be compressed and put in the `img/component-gallery` directory.

    **Note: If the component should not be shown in the component gallery, add it to the 'ExcludedComponentsArray' in `scripts/json-builder/create-components-info.js`.**
3. Follow the instructions in the [Running a local build](#running-a-local-build) section above to test your changes before pushing them to production.


## Support and further information

If you find any bugs, have issues with the code, or want to request enhancements, file a issue on this [Github repo](https://github.com/predix-ui/predix-ui.github.io).

## Copyright

Copyright &copy; 2018 GE Global Research. All rights reserved.

The copyright to the computer software herein is the property of GE Global Research. The software may be used and/or copied only with the written permission of GE Global Research or in accordance with the terms and conditions stipulated in the agreement/contract under which the software has been supplied.
