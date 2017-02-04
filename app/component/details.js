import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	ListView,
	Dimensions,
	Modal,
	TouchableOpacity,
} from 'react-native';

import Image from 'react-native-image-progress';
import ProgressPie from 'react-native-progress/Pie';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
import NavBar from './NavBar';
import wbView from './webView';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var cachedResults = {
	item: [],
};

export default class details extends Component {
	constructor(props) {
		super(props);
		this.state = {
			day         : new Date(this.props.day).toLocaleDateString(),
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
		// console.log(dataBlob);
		// console.log(sectionID);
		return dataBlob[sectionID];
	}

	_getRowData(dataBlob, sectionID, rowID) {
		// console.log(dataBlob);
		// console.log(sectionID);
		// console.log(dataBlob[sectionID + ":" + rowID]);
		return dataBlob[sectionID + ":" + rowID];
	}

	_backToMeiZi() {
		this.props.navigator.pop();
	}

	componentDidMount() {
		this._fetchData(this.state.day);
	}

	_fetchData(day) {
		let dataBlob   = {},
			sectionIDs = [],
			rowIDs     = [],
			dayy       = day.split('/'),
			that       = this;
		// alert('http://gank.io/api/day/20' + dayy[2] + '/' + dayy[0] + '/' + dayy[1])
		fetch('http://gank.io/api/day/20' + dayy[2] + '/' + dayy[0] + '/' + dayy[1], {
			method: 'GET',
		})
		// fetch('http://gank.io/api/day/' + day, {
		// 	method: 'GET',
		// })
		.then((response) => response.json())
		.then((responseJson) => {
			// console.log(responseJson)
			try {
				// console.log(JSON.parse(responseJson));
				// let data = JSON.parse(responseJson);
				responseJson.category.map(function (value, index, arr) {
					sectionIDs.push(index);
					rowIDs[index] = [];
					dataBlob[index] = value;
					responseJson.results[value].map(function (valuee, indexx, arrr) {
						// console.log(valuee)
						rowIDs[index].push(indexx);
						dataBlob[index + ':' + indexx] = valuee;
					})
				});
				// console.log(dataBlob);
				// console.log(sectionIDs);
				// console.log(rowIDs);
				this.setState({
					dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
				});
			}
			catch (err) {
				alert(err)
			}
		})
		.catch((error) => {
			console.error(error);
		});
	}

	_goURl(url) {
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
			<TouchableOpacity activeOpacity={0.8} onPress={()=>{this._goURl(row.url)}}>
				<View style={styles.rowTitleSup}>
					<Text style={styles.rowTitle} numberOfLines={1}>{row.desc}</Text>
					<Text style={[styles.rowTitle,styles.flexEnd]}>{row.who}</Text>
				</View>
			</TouchableOpacity>
		)
	}

	// 每一组对应的数据
	_renderSectionHeader(sectionData) {
		return (
			<View style={styles.sectionView}>
				<Text style={styles.sectionTitle}>{sectionData}</Text>
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
		let dayy = this.state.day.split('/');
		const leftButtonConfig = {
			title: '<Icon name="ios-arrow-back" size={22} color="#000" />返回',
			handler: () => this._backToMeiZi(),
		};

		const titleConfig = {
			title: '20' +  dayy[2] + '/' + dayy[0] + '/' + dayy[1],
		};
		return (
			<View style={{flex:1,backgroundColor:'#fff'}}>
				<Modal
					visible={this.state.modalVisible}
					transparent={true}
					onRequestClose={() => {this._setModalVisible(false)}}>
					<ImageViewer index={this.state.imgIndex} imageUrls={cachedResults.item} />
				</Modal>
				<NavBar
					title={titleConfig}
					leftButton={leftButtonConfig} />
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this._renderRow.bind(this)}
					renderSectionHeader={this._renderSectionHeader}
					contentContainerStyle={styles.list}
					enableEmptySections={true}
					showsVerticalScrollIndicator={false} />
			</View>
		);
	}
}
const styles = StyleSheet.create({
	listStyle   : {},
	sectionView : {
		height         : 35,
		backgroundColor: "#c3c3c3",
		justifyContent : "center"
	},
	sectionTitle: {
		fontSize  : 18,
		marginLeft: 16,
	},
	rowView     : {
		height       : 80,
		flexDirection: 'row',
	},
	rowImage    : {
		width : 44,
		height: 44
	},
	rowTitleSup : {
		height           : 44,
		width            : screenWidth,
		borderBottomWidth: 1,
		borderBottomColor: "#c3c3c3",
		paddingLeft      : 5,
		paddingRight     : 5
	},
	rowTitle    : {
		fontSize: 16,
	},
	flexEnd     : {
		alignSelf: 'flex-end',
		fontSize : 12
	},
	thumb       : {
		width : screenWidth / 2,
		height: screenWidth / 2,
	},
});
