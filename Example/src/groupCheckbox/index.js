import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    ViewPropTypes as RNViewPropTypes,
} from 'react-native';

import PropTypes from "prop-types";
const GroupCheckBox = (props) => {
    const [selectedOption, setSelectedOption] = useState([])


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
            let options = selectedOption;
            options.push(option);
            setSelectedOption([...options]);
            props.onClick(options)
        }

     
    }

    const renderCheckbox = () => {
        const data = props.data;
        if (data && data.length > 0) {
            return data.map((Item, index) => {
                return (
                    <TouchableHighlight
                        key={`${Item}_${index}`}
                        onPress={() => CheckboxClicked(Item)}
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
            })
        }
    }


    const getCheckBox = (option) => {
        let source = require('./img/ic_check_box_outline_blank.png');
        let checkBoxStyle = props.checkboxUnCheckedStyle || styles.checkboxUnCheckedStyle
        if (selectedOption.includes(option)) {
            source = require('./img/ic_check_box.png');
            checkBoxStyle = props.checkboxCheckedStyle || styles.checkboxCheckedStyle
        }

        return <Image source={source} style={checkBoxStyle} />

    }


    return (

        <View style={[styles.container, props.containerStyle]}>
            {renderCheckbox()}
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
    defaultValue: PropTypes.array
};


GroupCheckBox.defaultProps = {
    data: ["one", "tow", "three"],
    onClick: (data) => { console.log(data) },
    defaultValue: ['one'],
    labelPosition: 'left',
    
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    itemContainer: {
        flex: 1,
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
    }

});


export default GroupCheckBox
