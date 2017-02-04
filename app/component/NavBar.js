/**
 * VERSION: 0.2.0
 * RN-Demo
 * Created on 2017/2/4.~
 * Talk is cheap. Show me the code.
 * GIT:https://github.com/zwj47
 *
 * @author: by Jay99, email:zwj@zwj.space
 * ==============================================
 */
/**
 * VERSION: 0.2.0
 * RN-Demo
 * Created on 2017/1/22.~
 * Talk is cheap. Show me the code.
 * GIT:https://github.com/zwj47
 *
 * @author: by Jay99, email:zwj@zwj.space
 * ==============================================
 */
'use strict';
import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	WebView,
	Dimensions,
	Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');
export default class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: ''
		}
	}

	componentWillMount() {
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={[styles.licontainer,{paddingLeft:10}]}>
					<Text style={styles.leftButton}>
						<Icon name="ios-arrow-back" size={22} color="#000" />返回</Text>
				</View>
				<View style={{alignSelf:'center'}}>
					<Text style={styles.title}>Title</Text>
				</View>
				<View style={styles.licontainer}>
				</View>

			</View>
		);
	}
}
const styles = StyleSheet.create({
	container : {
		backgroundColor: '#fff',
		flexDirection  : 'row',
		height         : 44,
		alignItems:'center'
	},
	licontainer:{
		flex:1
	},
	leftButton: {
		base
		// alignSelf: 'center'
	},
	title     : {
		// alignSelf: 'flex-end'
	}
});

