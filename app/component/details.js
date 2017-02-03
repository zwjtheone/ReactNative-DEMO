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
	item: [],
};
var dataBlob = [
	{
		"catId": 1, "catName": "给水管", "children": [
		{"catId": 11, "catName": "给水管66"},
		{"catId": 12, "catName": "给水管667"}]
	},
	{
		"catId": 2, "catName": "排水管", "children": [
		{"catId": 21, "catName": "排水管66"},
		{"catId": 22, "catName": "排水管667"}]
	},
	{
		"catId": 3, "catName": "水管", "children": [
		{"catId": 31, "catName": "水管66"},
		{"catId": 32, "catName": "水管667"}]
	}]
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
			imgIndex    : 0,
			dataSource  : new ListView.DataSource({
				getSectionData         : this._getSectionData, // 获取组中数据
				getRowData             : this._getRowData, // 获取行中的数据
				rowHasChanged          : (r1, r2) => r1 !== r2,
				sectionHeaderHasChanged: (s1, s2) => s1 !== s2
			})
		};
	}

	_getSectionData(dataBlob, sectionID) {
		console.log(dataBlob);
		console.log(sectionID);
		return dataBlob[sectionID];
	}

	_getRowData(dataBlob, sectionID, rowID) {
		console.log(dataBlob);
		console.log(sectionID);
		console.log(rowID);
		return dataBlob[sectionID + ":" + rowID];
	}

	_backToMeiZi() {
		this.props.navigator.pop();
	}

	componentDidMount() {
		this._fetchData(this.state.day);
	}

	_fetchData(day) {
		var dataBlob   = {},
			sectionIDs = [],
			rowIDs     = [];
		fetch('http://gank.io/api/day/' + day, {
			method: 'GET',
		})
		.then((response) => response.text())
		.then((responseJson) => {
			try {
				console.log(JSON.parse(responseJson));
				let data = JSON.parse(responseJson);
				data.category.map(function (value, index, arr) {
					sectionIDs.push(value);
					rowIDs[index] = [];
					data.results[value].map(function (valuee, indexx, arrr) {
						// console.log(valuee)
						rowIDs[index].push(valuee);
						dataBlob[index + ':' + indexx] = valuee;
					})
				});
				console.log(dataBlob);
				console.log(sectionIDs);
				console.log(rowIDs)
			}
			catch (err) {
				console.log(err);
			}
			this.setState({
				dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
			});
		})
		.catch((error) => {
			console.error(error);
		});
	}

	// _goURl(url) {
	// 	this.props.navigator.push({
	// 		name     : 'webView',
	// 		component: wbView,
	// 		params   : {
	// 			url: url
	// 		}
	// 	})
	// }
	_renderRow(row, a, b) {
		console.log(row, a, b)
		return (
			<Text onPress={this._goURl.bind(this,row.url)}>{row.desc}</Text>
		)
	}

	// 每一组对应的数据
	_renderSectionHeader(sectionData, sectionId, b) {
		console.log(sectionData, sectionId, b)
		return (
			<View >
				<Text >{sectionData}</Text>
			</View>
		);
	}

	// _renderImageRow(row: {}, sectionID: number, rowID: number) {
	// 	return (
	// 		<Image style={[styles.thumb]}
	// 			   source={{uri: row.url}}
	// 			   indicator={ProgressPie}
	// 			   resizeMode={'cover'}
	// 			   onPress={this._onPressButton.bind(this,rowID)}
	// 		/>
	// 	)
	// }
	_onPressButton(rowID: number) {
		this.setState({modalVisible: !this.state.modalVisible, imgIndex: parseInt(rowID)});
	}

	_setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}

	render() {
		return (
			<View style={{paddingTop:10,flex:1,backgroundColor:'#fff'}}>
				<Modal
					visible={this.state.modalVisible}
					transparent={true}
					onRequestClose={() => {this._setModalVisible(false)}}>
					<ImageViewer index={this.state.imgIndex} imageUrls={cachedResults.item} />
				</Modal>
				<Text onPress={this._backToMeiZi.bind(this)}>{this.state.day}</Text>
				<ListView
					dataSource={this.state.Android}
					renderRow={this._renderRow.bind(this)}
					renderSectionHeader={this._renderSectionHeader.bind(this)}
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
