import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	ListView,
	Dimensions,
	Modal,
	TouchableOpacity,
	ActivityIndicator,
	BackAndroid
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
			animating   : true,
			dataSource  : new ListView.DataSource({
				getSectionData         : this._getSectionData, // 获取组中数据
				getRowData             : this._getRowData, // 获取行中的数据
				rowHasChanged          : (r1, r2) => r1 !== r2,
				sectionHeaderHasChanged: (s1, s2) => s1 !== s2
			})
		};
		this.handleBack = this.handleBack.bind(this);
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

	componentWillMount() {
		BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
	}

	componentDidUnmount() {
		BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
	}

	handleBack() {
		const {navigator} = this.props;
		const routers = navigator.getCurrentRoutes();
		console.log('当前路由长度：' + routers.length);
		if (routers.length > 1) {
			navigator.pop();
			return true;//接管默认行为
		}
		return false;//默认行为
	}

	_fetchData(day) {
		let dataBlob   = {},
			sectionIDs = [],
			rowIDs     = [],
			dayy       = day.split('/'),
			that       = this;
		let url = 'http://gank.io/api/day/20' + dayy[2] + '/' + dayy[0] + '/' + dayy[1];
		// let url = 'http://gank.io/api/day/' + day;
		// alert('http://gank.io/api/day/20' + dayy[2] + '/' + dayy[0] + '/' + dayy[1])
		fetch(url, {
			method: 'GET',
		})
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
				setTimeout(() => this.setState({animating: false}), 900)
			}
			catch (err) {
				alert(err)
			}
		})
		.catch((error) => {
			console.error(error);
		});
	}

	_goURl(url, title) {
		this.props.navigator.push({
			name     : 'webView',
			component: wbView,
			params   : {
				url  : url,
				title: title
			}
		})
	}

	_renderRow(row) {
		return (
			<TouchableOpacity activeOpacity={0.8} onPress={()=>{this._goURl(row.url,row.desc)}}>
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

	_onPressButton(rowID: number) {
		this.setState({modalVisible: !this.state.modalVisible, imgIndex: parseInt(rowID)});
	}

	_setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}

	render() {
		return (
			<View style={{flex:1,backgroundColor:'#fff'}}>
				<Modal
					visible={this.state.modalVisible}
					transparent={true}
					onRequestClose={() => {this._setModalVisible(false)}}>
					<ImageViewer index={this.state.imgIndex} imageUrls={cachedResults.item} />
				</Modal>
				<NavBar title={new Date(this.props.day).toLocaleDateString()} handle={() => this.props.navigator.pop()} />
				{
					this.state.animating == false ? (
							<ListView
								dataSource={this.state.dataSource}
								renderRow={this._renderRow.bind(this)}
								renderSectionHeader={this._renderSectionHeader}
								contentContainerStyle={styles.list}
								enableEmptySections={true}
								showsVerticalScrollIndicator={false} />
						) : (
							<ActivityIndicator
								animating={this.state.animating}
								style={[styles.centering]}
								size="large"
							/>
						)
				}

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
	centering   : {
		height        : screenHeight - 44,
		alignItems    : 'center',
		justifyContent: 'center',
		padding       : 8,
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
