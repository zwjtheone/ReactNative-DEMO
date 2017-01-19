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
	View, Text, ListView, RefreshControl, ActivityIndicator, StyleSheet, Image, Dimensions, TouchableHighlight
} from 'react-native';
import Progress from 'react-native-progress';
import {Header} from '../common/Header';
var cachedResults = {
	nextPage: 1,
	item    : [],
	total   : 0
};
class AAHome extends Component {
	constructor(props) {
		super(props);
		let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			listViewData: ds.cloneWithRows([]),
			loaded      : false,//控制Request请求是否加载完毕
			isRefreshing: false
		}
	}

	renderRow(row) {
		return (
			<Image
				style={styles.thumb}
				source={{uri: row.url}}
				indicator={Progress.Pie}
				indicatorProps={{
					size: 80,
					borderWidth: 0,
					color: 'rgba(150, 150, 150, 1)',
					unfilledColor: 'rgba(200, 200, 200, 0.2)'
				}}
			/>
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
				<ListView
					dataSource={this.state.listViewData}
					renderRow={this.renderRow}
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
