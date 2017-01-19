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
	View, Text, ListView, RefreshControl, ActivityIndicator, StyleSheet, Dimensions, TouchableOpacity, Modal
} from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Header} from '../common/Header';
var cachedResults = {
	nextPage: 1,
	item    : [],
	total   : 0,
	imgIndex: 0
};
class AAHome extends Component {
	constructor(props) {
		super(props);
		let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			listViewData: ds.cloneWithRows([]),
			loaded      : false,//控制Request请求是否加载完毕
			isRefreshing: false,
			modalVisible: false,
			imgIndexw   : 0
		};
		console.log('AAhome ')
	}

	_setModalVisible(visible) {
		let isTF = !this.state.modalVisible;
		this.setState({modalVisible: isTF});
	}

	_onPressImage(index) {
		console.log('onPress');
		console.log(index);
		this.setState({modalVisible: true, imgIndexw: index});
	}

	renderRow(row) {
		cachedResults.imgIndex += 1;
		return (
			<TouchableOpacity
				onPress={this._onPressImage.bind(this,cachedResults.imgIndex)}
				activeOpacity={1}>
				<Image
					style={styles.thumb}
					source={{uri: row.url}}
					indicator={ProgressBar}
				/>
			</TouchableOpacity>
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

	render() {
		return (
			<View >
				<Modal
					visible={this.state.modalVisible}
					transparent={true}
					animationType={"slide"}
					onRequestClose={() => {this._setModalVisible(false)}}>
					<ImageViewer index={this.state.imgIndexw-=1} imageUrls={cachedResults.item} />
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
		justifyContent: 'center',
	},
	thumb    : {
		justifyContent: 'center',
		width         : Dimensions.get('window').width,
		height        : Dimensions.get('window').height * .8,
		marginBottom  : 5
	},
	text     : {
		flex      : 1,
		marginTop : 5,
		fontWeight: 'bold'
	},
	centering: {}
});
export {AAHome}
