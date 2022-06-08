# DropboxExtensionForJoomla

### To run End-to-End tests

#### Pre-requisite

`1` Clone this repository

`2` Install Joomla

- These tests were performed on Joomla v3.9.
- Click the link [here](https://linuxhostsupport.com/blog/how-to-install-joomla-3-9-on-ubuntu-20-04/) to install Joomla-3.9

`3` :arrow_down: To install the Dropbox component:

    - Go to `Install` sub-menu in the `Extension` menu from Joomla Home Page

    - Select the option `Install from Folder`

    - Provide the path of this repository and click on `Check and Install`

  Or you can simply run the dropboxInstallation.feature file to automate the installation step.
### Run the tests:

`Step 1`: Inside the repo, navigate to `tests/e2e`. Then run the following command to install all the required packages.

```
npm install
```

`Step 2`: Open the file `.env-example` and fill up the necessary parameters. After that, rename the file to `.env`

### To finally run the tests, use the following commands while being in the `*/tests/e2e/` directory

```
npm i

npm run test:acceptance features/'name-of-feature-file'
```
