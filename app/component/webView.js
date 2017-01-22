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
const {width, height} = Dimensions.get('window');
const url = "http://www.58.com";
export default class WebViewExample extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: ''
		}
	}

	componentWillMount() {
		this.setState({url: this.props.url})
	}

	_backTopDetails() {
		this.props.navigator.pop();
	}

	render() {
		return (
			<View style={styles.container}>
				<Text onPress={this._backTopDetails.bind(this)}>返回</Text>
				<WebView
					style={{width:width,height:height-20,backgroundColor:'gray'}}
					source={{uri:this.state.url,method: 'GET'}}
					javaScriptEnabled={true}
					domStorageEnabled={true}
					scalesPageToFit={false}
					startInLoadingState={true}
					allowsInlineMediaPlayback={false}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex           : 1,
		backgroundColor: '#f2f2f2',
		paddingTop     : 20,
	},
});

