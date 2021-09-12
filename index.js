import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    TouchableHighlight,
    Alert,
    ViewPropTypes as RNViewPropTypes,
} from 'react-native';

import PropTypes from "prop-types";
const GroupCheckBox = (props) => {
    const [selectedOption, setSelectedOption] = useState([])
    const [otherOptionClicked, setOtherOptionClicked] = useState({ showOtherInput: false, otherInputValue: "" })


    const SetInitialProps = () => {
        if (props.defaultValue && props.defaultValue.length > 0) {
            setSelectedOption(props.defaultValue)
        } else {
            setSelectedOption([])
        }
    }

    useEffect(SetInitialProps, [])


    const CheckboxClicked = (option) => {



        if (selectedOption && selectedOption.includes(option)) {
            let newSelectedOption = selectedOption.filter(function (item) {
                return item !== option
            })
            setSelectedOption([...newSelectedOption])
            props.onClick(newSelectedOption)
        } else {
            if (props.applyMaxCondition && props.maxAllowToCheck < selectedOption.length) {
                showMaxOptionAlert()
            } else {

                let options = selectedOption;
                options.push(option);
                setSelectedOption([...options]);
                props.onClick(options)
            }
        }


    }


    const OtherCheckboxClicked = () => {
        if (otherOptionClicked.showOtherInput) {
            let newSelectedOption = selectedOption.filter(function (item) {
                return item !== otherOptionClicked.otherInputValue
            })
            setSelectedOption([...newSelectedOption])
            setOtherOptionClicked({
                showOtherInput: false,
                otherInputValue: ""
            })
            props.onClick(newSelectedOption)
        } else {
            if (props.applyMaxCondition && props.maxAllowToCheck < selectedOption.length) {
                showMaxOptionAlert()
            } else {
                setOtherOptionClicked({
                    showOtherInput: true,
                    otherInputValue: ""
                })
            }

        }
    }

    const singleCheckbox = (Item, index, onCheckBoxClicked) => {
        return (
            <TouchableHighlight
                key={`${Item}_${index}`}
                onPress={() => onCheckBoxClicked(Item)}
                underlayColor='transparent'
            >
                <View style={[
                    styles.itemContainer,
                    props.itemContainer
                ]}>
                    {props.labelPosition === 'left' && <Text style={[
                        styles.labelStyle,
                        props.labelStyle
                    ]}> {Item} </Text>}
                    {getCheckBox(Item)}
                    {props.labelPosition === 'right' && <Text style={[
                        styles.labelStyle,
                        props.labelStyle
                    ]}> {Item} </Text>}
                </View>
            </TouchableHighlight>
        )
    }

    const getCheckBox = (option) => {
        let source = require('./img/ic_check_box_outline_blank.png');
        let checkBoxStyle = props.checkboxUnCheckedStyle || styles.checkboxUnCheckedStyle
        if (option === props.otherOptionLabel && otherOptionClicked.showOtherInput) {
            source = require('./img/ic_check_box.png');
            checkBoxStyle = props.checkboxCheckedStyle || styles.checkboxCheckedStyle
        }
        else if (selectedOption.includes(option)) {
            source = require('./img/ic_check_box.png');
            checkBoxStyle = props.checkboxCheckedStyle || styles.checkboxCheckedStyle
        }

        return <Image source={source} style={checkBoxStyle} />

    }

    const renderCheckbox = () => {
        const data = props.data;
        if (data && data.length > 0) {
            return data.map((Item, index) => {
                return singleCheckbox(Item, index, CheckboxClicked)
            })
        }
    }

    const renderOther = () => {
        if (props && props.otherOption) {
            return singleCheckbox(props.otherOptionLabel, props.data.length, OtherCheckboxClicked)
        }
    }

    const onChangeText = (text) => {

        if (otherOptionClicked.otherInputValue === "") {
            let newOption = selectedOption;
            newOption.push(text);
            setSelectedOption([...newOption])

        } else {
            let newSelectedOption = selectedOption.filter(function (item) {
                return item !== otherOptionClicked.otherInputValue
            })
            newSelectedOption.push(text)
            setSelectedOption([...newSelectedOption])
        }

        setOtherOptionClicked({ showOtherInput: true, otherInputValue: text })
        props.onClick(selectedOption)
    }

    const renderOtherInput = () => {
        if (otherOptionClicked.showOtherInput) {
            return (
                <View style={styles.OtherTextBoxContainer}>
                    <TextInput
                        style={[styles.input, props.otherInputStyle]}
                        onChangeText={onChangeText}
                    />
                </View>
            )
        }
    }

    const showMaxOptionAlert = () => {
        Alert.alert(
            props.messageForMaxLimitExceed,
            "",
            [
                { text: props.maxLimitExceedAlertButtonText, onPress: () => console.log("OK Pressed") }
            ]
        );
        return
    }

    return (
        <View style={[styles.container, props.containerStyle]}>
            {renderCheckbox()}
            {renderOther()}
            {renderOtherInput()}
        </View>
    );
}

GroupCheckBox.propTypes = {
    labelPosition: PropTypes.oneOf(['left', 'right']).isRequired,
    labelStyle: PropTypes.object,
    containerStyle: PropTypes.object,
    itemContainer: PropTypes.object,
    checkedImage: PropTypes.element,
    unCheckedImage: PropTypes.element,
    checkboxUnCheckedStyle: PropTypes.object,
    checkboxCheckedStyle: PropTypes.object,
    onClick: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    checkboxStyle: PropTypes.object,
    defaultValue: PropTypes.array,
    otherOption: PropTypes.bool,
    otherOptionLabel:PropTypes.string,
    otherInputStyle:PropTypes.object,
    applyMaxCondition: PropTypes.bool,
    maxAllowToCheck: PropTypes.number,
    messageForMaxLimitExceed: PropTypes.string,
    maxLimitExceedAlertButtonText:PropTypes.string
};


GroupCheckBox.defaultProps = {
    data: ["one", "tow", "three"],
    onClick: (data) => { console.log(data) },
    defaultValue: ['one'],
    labelPosition: 'left',
    otherOption: true,
    applyMaxCondition: true,
    maxAllowToCheck: 1,
    messageForMaxLimitExceed:"You can select max 3 option",
    maxLimitExceedAlertButtonText:"Okay",
    otherOptionLabel:"Other"

};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },

    itemContainer: {
       
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelStyle: {
        fontSize: 18,
        textTransform: 'capitalize'
    },
    checkboxUnCheckedStyle: {
        tintColor: '#000000'
    },
    checkboxCheckedStyle: {
        tintColor: 'green'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width:'100%'
    },
    OtherTextBoxContainer: {
        alignSelf: 'flex-start',
    }

});


export default GroupCheckBox
