/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	navigator,
	WebView,
	Dimensions
} from 'react-native';
const url = "http://www.58.com";
const {width, height} = Dimensions.get('window');
export default class DayDetails extends Component {
	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			day           : new Date(this.props.day).toLocaleDateString(),
			WebViewContent: '',
			dataSource: ds.cloneWithRows([]),
		};
	}

	_backToMeiZi() {
		this.props.navigator.pop();
	}

	componentWillMount() {
		//拉去某日数据
		fetch('http://gank.io/api/day/' + this.state.day, {
			method: 'GET',
		})
		.then((response) => response.json())
		.then((responseJson) => {
			this.setState({WebViewContent: responseJson.results});
			console.log(this.state.WebViewContent);
		})
		.catch((error) => {
			console.error(error);
		});
	}

	_delHtmlTag(str) {
		return str.replace(/<[^>]+>/g, "");
		//去掉所有的html标记
	}

	render() {
		return (
			<View style={styles.container}>
				<Text onPress={this._backToMeiZi.bind(
					this)} style={styles.welcome}>
					Welcome to React Native!
				</Text>
				<Text style={styles.welcome}>
					休息视频
				</Text>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={(rowData) => <Text>{rowData}</Text>}
				/>
				<Text style={styles.welcome}>
					Android
				</Text>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={(rowData) => <Text>{rowData}</Text>}
				/>
				<Text style={styles.welcome}>
					IOS
				</Text>
				<Text style={styles.welcome}>
					App
				</Text>
				<Text style={styles.welcome}>
					拓展资源
				</Text>
			</View>

		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex           : 1,
		justifyContent : 'center',
		alignItems     : 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome  : {
		fontSize : 20,
		textAlign: 'center',
		margin   : 10,
	},
});

{/*<WebView*/}
	{/*style={{width:width,height:height-20,backgroundColor:'gray'}}*/}
	{/*source={{uri:url,method: 'GET'}}*/}
	{/*scalesPageToFit={true}*/}
	{/*startInLoadingState={true}*/}
	{/*onLoad={()=>alert('加载成功')}*/}
{/*/>*/}
