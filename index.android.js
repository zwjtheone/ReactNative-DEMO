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
	Navigator
} from 'react-native';
import {AAHome} from './app/component/AA';

class AwesomeProject2 extends Component {
	/**
	 * 使用动态页面加载
	 * @param route 路由
	 * @param navigator 导航器
	 * @returns {XML} 页面
	 */
	_renderScene(route, navigator) {
		return <route.component navigator={navigator}  {...route.params} />;
	}
	_configureScene(){
		return Navigator.SceneConfigs.FloatFromRight;
	}
	render() {
		return (
			<Navigator
				initialRoute={{name:'MeiZi',component: AAHome}}
				configureScene={this._configureScene.bind(this)}
				renderScene={this._renderScene.bind(this)} />
		);
	}
}
AppRegistry.registerComponent('AwesomeProject2', () => AwesomeProject2);
