import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	ListView
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import {AAHome} from './app/component/AA';
import {Test} from './app/component/test';
const TabNavigatorItem = TabNavigator.Item;
// const aaOff = require('./app/img/aaoff.png');
// const aaOn = require('./app/img/aaon.png');
// const dcOff = require('./app/img/dcoff.png');
// const dcOn = require('./app/img/dcon.png');
// const sfOff = require('./app/img/sfoff.png');
// const sfOn = require('./app/img/sfon.png');
// const mineOff = require('./app/img/mineoff.png');
// const mineOn = require('./app/img/mineon.png');
class AwesomeProject2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'aa'
		}
	}

	/**
	 tab点击方法
	 **/
	onPress(tabName) {
		if (tabName) {
			this.setState(
				{
					selectedTab: tabName,
				}
			);
		}
	}

	render() {
		return (
			<TabNavigator
				tabBarStyle={styles.tab}
			>
				<TabNavigatorItem
					title={'妹子'}
					renderIcon={() => <Icon style={styles.tabIcon} name="ios-heart-outline" color="#4F8EF7" /> }
					renderSelectedIcon={() => <Icon style={styles.tabIcon} name="ios-heart" color="#4F8EF7" />}
					selected={this.state.selectedTab === 'aa'}
					selectedTitleStyle={{color: 'black'}}
					onPress={() => this.onPress('aa')}>
					<AAHome />
				</TabNavigatorItem>
				<TabNavigatorItem
					title={'胜负'}
					renderIcon={() => <Icon style={styles.tabIcon} name="ios-home-outline" color="#4F8EF7" />}
					renderSelectedIcon={() => <Icon style={styles.tabIcon} name="ios-home" color="#4F8EF7" />}
					selected={this.state.selectedTab === 'sf'}
					selectedTitleStyle={{color: 'black'}}
					onPress={() => this.onPress('sf')}>
					<Test />
				</TabNavigatorItem>
				<TabNavigatorItem
					title={'订场'}
					renderIcon={() => <Icon style={styles.tabIcon} name="ios-paper-outline" color="#4F8EF7" />}
					renderSelectedIcon={() => <Icon style={styles.tabIcon} name="ios-paper" color="#4F8EF7" />}
					selected={this.state.selectedTab === 'dc'}
					selectedTitleStyle={{color: 'black'}}
					onPress={() => this.onPress('dc')}>
					<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>订场</Text></View>
				</TabNavigatorItem>
				<TabNavigatorItem
					title={'我的'}
					renderIcon={() => <Icon style={styles.tabIcon} name="ios-person-outline" color="#4F8EF7" />}
					renderSelectedIcon={() => <Icon style={styles.tabIcon} name="ios-person" color="#4F8EF7" />}
					selected={this.state.selectedTab === 'mi'}
					selectedTitleStyle={{color: 'black'}}
					onPress={() => this.onPress('mi')}>
					<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>我的</Text></View>
				</TabNavigatorItem>
			</TabNavigator>
		);
	}
}
const styles = StyleSheet.create({
	container   : {
		flex           : 1,
		backgroundColor: '#F5FCFF',
	},
	welcome     : {
		fontSize : 20,
		textAlign: 'center',
		margin   : 10,
	},
	instructions: {
		textAlign   : 'center',
		color       : '#333333',
		marginBottom: 5,
	},
	tab         : {
		height         : 52,
		alignItems     : 'center',
		backgroundColor: '#f4f5f6',
	},
	tabIcon     : {
		width    : 35,
		height   : 25,
		fontSize : 28,
		textAlign: 'center',
		color    : 'black'
	},
	badgeView   : {
		width          : 22,
		height         : 14,
		backgroundColor: '#f85959',
		borderWidth    : 1,
		marginLeft     : 10,
		marginTop      : 3,
		borderColor    : '#FFF',
		alignItems     : 'center',
		justifyContent : 'center',
		borderRadius   : 8,
	},
	badgeText   : {
		color   : '#fff',
		fontSize: 8,
	}
});
AppRegistry.registerComponent('AwesomeProject2', () => AwesomeProject2);
