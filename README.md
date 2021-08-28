# rn-group-checkbox

[ ![NPM version](http://img.shields.io/npm/v/rn-group-checkbox.svg?style=flat)](https://www.npmjs.com/package/rn-group-checkbox)
[![License MIT](http://img.shields.io/badge/license-MIT-orange.svg?style=flat)](https://github.com/Malik-Adil/react-native-group-checkbox/blob/main/LICENSE)



Checkbox Group component for react native, it works on iOS and Android.

## Content

- [Installation](#installation)
- [Getting started](#getting-started)
- [API](#api)
- [Contribution](#contribution)

## Installation

* 1.Run `npm i rn-group-checkbox --save` OR `yarn add rn-group-checkbox`
* 2.`import GroupCheckBox from 'rn-group-checkbox'`    

## Getting started  

Add `rn-group-checkbox` to your js file.   

`import GroupCheckBox from 'rn-group-checkbox'`  

Inside your component's render method, use CheckBox:   

```javascript
<GroupCheckBox
    onClick = {(value)=>console.log(value)}
/>
```

Then you can use it like this:   


### Custom CheckBox   

```javascript
<GroupCheckBox
    style={{flex: 1, padding: 10}}
    labelPosition="left"
    labelStyle={{
        color:'Orange',
        fontSize:14
    }}
    data={["one","two","three"]}
    defaultValue = {["one"]}
    onClick={(value)=>{
      console.log(value)
    }}
   
/>
 ```

**More Usage:**    

[GitHubPopular](https://github.com/Malik-Adil?tab=repositories)



## API


Props              | Type     | Optional | Default     | Description
----------------- | -------- | -------- | ----------- | -----------
labelPosition  | PropTypes.oneOf  | left/right |  left |   Custom style checkbox
labelStyle  |  PropTypes.object |  |  | Custom left Text style
data | PropTypes.array.isRequired |false |  ["one","tow","three"] | any
checkboxCheckedStyle | PropTypes.object | true |   |  Custom checkbox checked style
checkboxUnCheckedStyle | PropTypes.object | true |   |  Custom checkbox unchecked style
checkedImage  | Text.propTypes.style | true |  | Custom right Text style
unCheckedImage  |  PropTypes.element  | true  |  Default image  | Custom  unchecked Image
onClick   |  PropTypes.func.isRequired |  false  |  | callback  function

## Contribution

Issues are welcome. Please add a screenshot of bug and code snippet. Quickest way to solve issue is to reproduce it on one of the examples.

Pull requests are welcome. If you want to change API or making something big better to create issue and discuss it first.

---

**MIT Licensed**