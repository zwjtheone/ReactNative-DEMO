/**
 * VERSION: 0.2.0
 * AwesomeProject2
 * Created on 2017/1/16.~
 * Talk is cheap. Show me the code.
 * GIT:https://github.com/zwj47
 *
 * @author: by Jay99, email:zwj@zwj.space
 * ==============================================
 */
import React, {Component} from 'react';
import {
	View, Text, CameraRoll, ListView, RefreshControl, ActivityIndicator, StyleSheet, Dimensions, Modal,
	TouchableOpacity, TouchableHighlight
} from 'react-native';
import Image from 'react-native-image-progress';
import ProgressPie from 'react-native-progress/Pie';
import ImageViewer from 'react-native-image-zoom-viewer';

import details from './details';
var cachedResults = {
	nextPage  : 1,
	item      : [],
	imgUrlList: [],
	total     : 0
};
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
class AAHome extends Component {
	constructor(props) {
		super(props);
		let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			listViewData: ds.cloneWithRows([]),
			loaded      : false,//控制Request请求是否加载完毕
			isRefreshing: false,
			modalVisible: false,
			imgIndex    : 0
		};
	}

	_onPressButton(rowID: number) {
		this.setState({modalVisible: !this.state.modalVisible, imgIndex: parseInt(rowID)});
	}

	_loadPage(publishedAt) {
		this.props.navigator.push({
			name     : 'details',
			component: details,
			params   : {
				day: publishedAt
			}
		})
	}

	renderRow(row: {}, sectionID: number, rowID: number) {
		// console.log(row, sectionID, rowID)
		return (
			<View style={[styles.imgView]}>
				<TouchableOpacity activeOpacity={1} onPress={this._onPressButton.bind(this,rowID)}>
					<Image style={[styles.thumb]}
						   source={{uri: row.url}}
						   indicator={ProgressPie}
						   resizeMode={'cover'}
						   onPress={this._onPressButton.bind(this,rowID)}
					/>
				</TouchableOpacity>
				<View>
					<Text numberOfLines={2} onPress={this._loadPage.bind(this,row.publishedAt)} style={styles.imgText}>{row.day} {row.desc}</Text>
				</View>
			</View>
		)
	}

	componentDidMount() {
		this._fetchData(cachedResults.nextPage);
	}

	_fetchData(page) {
		//拉去Image
		fetch('http://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/' + page, {
			method: 'GET',
		})
		.then((response) => response.json())
		.then((responseJsonn) => {

			//拉去Text
			fetch('http://gank.io/api/data/休息视频/10/' + page, {
				method: 'GET',
			})
			.then((response) => response.json())
			.then((responseJson) => {
				// console.log(responseJson);
				// console.log(responseJsonn);
				cachedResults.nextPage++;
				let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
				let item = [];
				let imgUrlList = [];
				for (let i = 0; i < responseJson.results.length; i++) {
					let gg = {};
					let url = {};
					gg.desc = responseJson.results[i].desc;
					gg.day = responseJsonn.results[i].desc;
					gg.url = responseJsonn.results[i].url;
					gg.publishedAt = responseJsonn.results[i].publishedAt;
					item.push(gg);
				}
				// console.log(item);//imgUrlList
				cachedResults.item = cachedResults.item.concat(item);
				this.setState({listViewData: ds.cloneWithRows(cachedResults.item), isRefreshing: false});
			})
			.catch((error) => {
				console.error(error);
			});
		})
		.catch((error) => {
			console.error(error);
		});
	}

	_fetchMoreData() {
		this._fetchData(cachedResults.nextPage);
	}

	_renderFooter() {
		return (
			<View style={{width:screenWidth}}>
				<ActivityIndicator
					animating={this.state.animating}
					style={[styles.centering, {height: 80}]}
					size="large"
				/>
			</View>
		)
	}

	_onRefresh() {
		if (this.state.isRefreshing) return;
		this.setState({isRefreshing: true});
		cachedResults.nextPage = 0;
		cachedResults.item = [];
		this._fetchData(cachedResults.nextPage);
	}

	_setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}

	render() {
		return (
			<View >
				<Modal animationType={"slide"} visible={this.state.modalVisible} transparent={true} onRequestClose={() => {this._setModalVisible(false)}}>
					<ImageViewer index={this.state.imgIndex} imageUrls={cachedResults.item} />
				</Modal>
				<ListView
					dataSource={this.state.listViewData}
					renderRow={this.renderRow.bind(this)}
					contentContainerStyle={styles.list}
					enableEmptySections={true}
					renderFooter={this._renderFooter.bind(this)}
					onEndReached={this._fetchMoreData.bind(this)}
					onEndReachedThreshold={20}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={this.state.isRefreshing}
							onRefresh={this._onRefresh.bind(this)}
							tintColor="#ff0000"
							title="Loading..."
							titleColor="#00ff00"
							colors={['#000']}
							progressBackgroundColor="#F5FCFF"
						/>
					}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	list     : {
		justifyContent : 'space-around',
		flexDirection  : 'row',
		flexWrap       : 'wrap',
		paddingLeft    : 5,
		paddingRight   : 5,
		paddingTop     : 20,
		backgroundColor: "#F5FCFF"
	},
	imgView  : {
		justifyContent: 'flex-start',
		flexDirection : 'column',
		width         : screenWidth / 2.15,
		height        : screenWidth * .64,
		marginBottom  : 20,
		borderWidth   : 1,
		borderColor   : '#ff6600'
	},
	thumb    : {
		width : screenWidth / 2,
		height: screenWidth / 2,
	},
	imgText  : {
		marginTop: 3,
		padding  : 3
	},
	centering: {
		alignSelf: 'center'
	}
});
export {AAHome}
