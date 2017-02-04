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
	Text,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');
export default class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.title
		}
	}

	componentWillMount() {
	}

	_goBack() {
		this.props.handle();
	}

	render() {
		return (
			<View style={[styles.container,{paddingLeft:10,paddingRight:10,}]}>
				<TouchableOpacity style={{flex:1}} onPress={()=>{this._goBack()}}>
					<View style={styles.leftButton}>
						<Icon style={{lineHeight:32,paddingRight:3}} name="ios-arrow-back" size={22} color="#000" />
						<Text style={styles.title}>返回</Text>
					</View>
				</TouchableOpacity>
				<View style={[styles.licontainer,{justifyContent: 'center'}]}>
					<Text numberOfLines={1} style={[styles.title]}>{this.state.title}</Text>
				</View>
				<View style={[styles.licontainer]}>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container  : {
		backgroundColor: '#fff',
		flexDirection  : 'row',
		height         : 44,
	},
	licontainer: {
		flex      : 1,
		height    : 44,
		alignItems: 'center',
	},
	leftButton : {
		flexDirection: 'row',
		alignSelf    : 'flex-start',
		height       : 44,
		paddingTop   : 5
	},
	title      : {
		fontSize  : 16,
		lineHeight: 32
	}
});

