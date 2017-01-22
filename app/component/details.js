import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	ListView,
	Dimensions,
	Modal
} from 'react-native';
import Image from 'react-native-image-progress';
import ProgressPie from 'react-native-progress/Pie';
import ImageViewer from 'react-native-image-zoom-viewer';
import wbView from './webView';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var cachedResults = {
	item      : [],
};
export default class details extends Component {
	constructor(props) {
		super(props);
		this.state = {
			day         : new Date(this.props.day).toLocaleDateString(),
			Android     : ds.cloneWithRows([]),
			App         : ds.cloneWithRows([]),
			IOS         : ds.cloneWithRows([]),
			xiuxi       : ds.cloneWithRows([]),
			tuozhan     : ds.cloneWithRows([]),
			fuli        : ds.cloneWithRows([]),
			modalVisible: false,
			imgIndex    : 0
		};
	}

	_backToMeiZi() {
		this.props.navigator.pop();
	}

	componentDidMount() {
		//拉去某日数据
		fetch('http://gank.io/api/day/' + this.state.day, {
			method: 'GET',
		})
		.then((response) => response.json())
		.then((responseJson) => {
			let results = responseJson.results;
			console.log(results)

		})
		.catch((error) => {
			console.error(error);
		})
	}

	_goURl(url){
		this.props.navigator.push({
			name     : 'webView',
			component: wbView,
			params   : {
				url: url
			}
		})
	}

	_renderRow(row) {
		return (
			<Text onPress={this._goURl.bind(this,row.url)}>{row.desc}</Text>
		)
	}

	_renderImageRow(row: {}, sectionID: number, rowID: number) {
		return (
			<Image style={[styles.thumb]}
				   source={{uri: row.url}}
				   indicator={ProgressPie}
				   resizeMode={'cover'}
				   onPress={this._onPressButton.bind(this,rowID)}
			/>
		)
	}

	_onPressButton(rowID: number) {
		this.setState({modalVisible: !this.state.modalVisible, imgIndex: parseInt(rowID)});
	}

	_setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}

	render() {
		return (
			<View style={{paddingTop:10}}>
				<Modal
					visible={this.state.modalVisible}
					transparent={true}
					onRequestClose={() => {this._setModalVisible(false)}}>
					<ImageViewer index={this.state.imgIndex} imageUrls={cachedResults.item} />
				</Modal>
				<Text onPress={this._backToMeiZi.bind(this)}>{this.state.day}</Text>
				<Text onPress={this._backToMeiZi.bind(this)}>Android</Text>
				<ListView
					dataSource={this.state.Android}
					renderRow={this._renderRow.bind(this)}
					contentContainerStyle={styles.list}
					enableEmptySections={true}
					showsVerticalScrollIndicator={false}
				/>
				<Text onPress={this._backToMeiZi.bind(this)}>iOS</Text>
				<ListView
					dataSource={this.state.IOS}
					renderRow={this._renderRow.bind(this)}
					contentContainerStyle={styles.list}
					enableEmptySections={true}
					showsVerticalScrollIndicator={false}
				/>
				<Text onPress={this._backToMeiZi.bind(this)}>App</Text>
				<ListView
					dataSource={this.state.App}
					renderRow={this._renderRow.bind(this)}
					contentContainerStyle={styles.list}
					enableEmptySections={true}
					showsVerticalScrollIndicator={false}
				/>
				<Text onPress={this._backToMeiZi.bind(this)}>休息视频</Text>
				<ListView
					dataSource={this.state.xiuxi}
					renderRow={this._renderRow.bind(this)}
					contentContainerStyle={styles.list}
					enableEmptySections={true}
					showsVerticalScrollIndicator={false}
				/>
				<Text onPress={this._backToMeiZi.bind(this)}>拓展资源</Text>
				<ListView
					dataSource={this.state.tuozhan}
					renderRow={this._renderRow.bind(this)}
					contentContainerStyle={styles.list}
					enableEmptySections={true}
					showsVerticalScrollIndicator={false}
				/>
				<Text onPress={this._backToMeiZi.bind(this)}>福利</Text>
				<ListView
					dataSource={this.state.fuli}
					renderRow={this._renderImageRow.bind(this)}
					contentContainerStyle={styles.list}
					enableEmptySections={true}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	list : {
		justifyContent : 'space-around',
		flexDirection  : 'row',
		flexWrap       : 'wrap',
		paddingLeft    : 5,
		paddingRight   : 5,
		paddingTop     : 20,
		backgroundColor: "#F5FCFF"
	},
	thumb: {
		width : screenWidth / 2,
		height: screenWidth / 2,
	},
});
