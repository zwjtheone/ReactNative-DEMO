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
import DayDetails from './DayDetails';

var cachedResults = {
	nextPage: 1,
	item    : [],
	total   : 0
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
		console.log(rowID);
		this.setState({modalVisible: !this.state.modalVisible, imgIndex: parseInt(rowID)});
	}
	_loadPage(){
		console.log(this.props)
		this.props.navigator.push({
			name:'DayDetails',
			component: DayDetails,
		})
	}
	renderRow(row: {}, sectionID: number, rowID: number) {
		// console.log(row, sectionID, rowID)
		return (
			<View style={[styles.imgView]}>
				<TouchableHighlight onPress={this._loadPage.bind(this)}>
					<Text style={styles.imgText}>{new Date(row.publishedAt).toLocaleDateString()}</Text>
				</TouchableHighlight>
				<TouchableOpacity activeOpacity={1} onPress={this._onPressButton.bind(this,rowID)}>
					<Image style={[styles.thumb]}
						   source={{uri: row.url}}
						   indicator={ProgressPie}
						   resizeMode={'cover'}
						   onPress={this._onPressButton.bind(this,rowID)}
					/>
				</TouchableOpacity>
			</View>
		)
	}

	componentDidMount() {
		console.log('componentDidMount');
		this._fetchData(cachedResults.nextPage);
	}

	_fetchData(page) {
		console.log('拉取');
		console.log(page);
		fetch('http://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/' + page, {
			method: 'GET',
		})
		.then((response) => response.json())
		.then((responseJson) => {
			cachedResults.nextPage++;
			let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
			cachedResults.item = cachedResults.item.concat(responseJson.results);
			console.log(cachedResults.item.length);
			this.setState({listViewData: ds.cloneWithRows(cachedResults.item), isRefreshing: false});
		})
		.catch((error) => {
			console.error(error);
		});
	}

	_fetchMoreData() {
		console.log('_fetchMoreData');
		this._fetchData(cachedResults.nextPage);
	}

	_renderFooter() {
		return (
			<ActivityIndicator
				animating={this.state.animating}
				style={[styles.centering, {height: 80}]}
				size="large"
			/>
		)
	}

	_onRefresh() {
		console.log('下拉刷新');
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
				<Modal visible={this.state.modalVisible} transparent={true} onRequestClose={() => {this._setModalVisible(false)}}>
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
	list      : {
		justifyContent: 'center',
		flexDirection : 'row',
		flexWrap      : 'wrap'
	},
	thumb     : {
		justifyContent: 'center',
		width         : Dimensions.get('window').width * .48,
		height        : Dimensions.get('window').height * .5,
	},
	imgText   : {
		marginTop: 40
	},
	imgView   : {
		justifyContent: 'center',
		width         : Dimensions.get('window').width * .49,
		height        : Dimensions.get('window').height * .5,
		marginBottom  : 25
	},
	text      : {
		flex      : 1,
		marginTop : 5,
		fontWeight: 'bold'
	},
	lightBox  : {
		width : Dimensions.get('window').width / 2,
		height: Dimensions.get('window').height / 2
	},
	imageStyle: {
		width          : 240,
		height         : 360,
		backgroundColor: 'red'
	},
});
export {AAHome}
