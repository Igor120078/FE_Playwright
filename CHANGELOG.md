# CHANGELOG

### 2.0.3

- updated conding standards
- rework of phonePattern data generator to use enum and load operator identifiers from single file
- added country, countryPhonePrefix enums to export

### 2.0.1 + 2.0.2

- minor playwright config changes

### 2.0.0

- fixed checbox
- raised breaking change name due to renames in v 1.0.9 (late raise)

### 1.0.9

- improved framework logging
- generalize naming of components
- implement wui checkbox
- generalize checkboxes into commonCheckbox and separate children
- add option to drive retry by using boolean type condition
- renamed components to carry type wui
- fixed some tests

### 1.0.8

- added explicit wait to validate success of login procedure in auth provider to guarantee successfull login

### 1.0.7

- fix missing .js in imports

### 1.0.6

- generalized validateAllComponents method on POM

### 1.0.5

- added phone number generator 
- added zip number generator

#### 0.1.18

* Formatted existing code to match lint/prettier definition
* Generalized component check + added to factory
* Increase default wait timeout to 3s
* Unified default methods + self validations
* Rename test to test folder to match other repos
* Changed attributes in components to private
* Added local pw config to enable tests to run
* Added translation key option
* Implemented input component
* Enforce component factory via private constructors
* Moved TodoTypes to own declaration file
* Prettyfied code to match global prettier def.
* Added new exports from package
* Added playwright test outputs into gitignore
* Rename interfaces to match other projects
* Added local pw config to allow tests in repo
* Initialized login page POM

#### 0.1.17

* Added basic framewotk structure
* Added basic examples for POM, Components and DTOs
* Created skeleton PCOM model

#### 0.1.13

* updated playwright config for superfix

#### 0.1.2

* updated waitPage types