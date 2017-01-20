/**
 * VERSION: 0.2.0
 * RN-Demo
 * Created on 2017/1/20.~
 * Talk is cheap. Show me the code.
 * GIT:https://github.com/zwj47
 *
 * @author: by Jay99, email:zwj@zwj.space
 * ==============================================
 */
import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	ListView,
	Navigator
} from 'react-native';
import SideMenu from'react-native-side-menu';
import {AAHome} from './app/component/AA';
import {Menu} from './app/component/Menu';
// class Menu extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			selectedTab : 'aa',
// 			isOpen      : false,
// 			selectedItem: 'About',
// 		}
// 	}
//
// 	render() {
// 		return (
// 			<View>
// 				<Text>测试</Text>
// 			</View>
//
// 		);
// 	}
// }
class AwesomeProject2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab : 'aa',
			isOpen      : false,
			selectedItem: 'About',
		}
	}

	updateMenuState(isOpen) {
		this.setState({isOpen,});
	}

	onMenuItemSelected(item) {
		this.setState({
			isOpen      : false,
			selectedItem: item,
		});
	}

	render() {
		return (
			<SideMenu
				menu={<Menu />}
				isOpen={this.state.isOpen}
				onChange={(isOpen) => this.updateMenuState(isOpen)}>
				<AAHome />
			</SideMenu>
		);
	}
}
const styles = StyleSheet.create({
	container   : {
		flex           : 1,
		backgroundColor: '#F5FCFF',
	},

});
AppRegistry.registerComponent('AwesomeProject2', () => AwesomeProject2);
