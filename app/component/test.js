/**
 * VERSION: 0.2.0
 * RN-Demo
 * Created on 2017/2/4.~
 * Talk is cheap. Show me the code.
 * GIT:https://github.com/zwj47
 *
 * @author: by Jay99, email:zwj@zwj.space
 * ==============================================
 */
import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ListView,
	TouchableOpacity,
	Image,
	AlertIOS
} from 'react-native';
var Car = require('./car.json');
var SectionListView = React.createClass({
	getInitialState(){
		var getSectionData = (dataBlob, sectionID) => {
			// console.log(dataBlob)
			// console.log(sectionID)
			return dataBlob[sectionID];
		};
		var getRowData = (dataBlob, sectionID, rowID) => {
			// console.log(dataBlob)
			// console.log(sectionID)
			console.log(rowID)
			return dataBlob[sectionID + ":" + rowID];
		};
		return {
			dataSource: new ListView.DataSource({
				getSectionData         : getSectionData,
				getRowData             : getRowData,
				rowHasChanged          : (r1, r2) => r1 !== r2,
				sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
			})
		};
	},
	render(){
		return (
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this.renderRow}
				renderSectionHeader={this.renderSectionHeader}
				contentContainerStyle={styles.listStyle}
			/>
		);
	},
	componentDidMount(){
		this.loadListViewDataFormJson();
	},
	loadListViewDataFormJson(){
		//    拿到所有的json数据
		var jsonData = Car.data;
		//    定义变量
		var dataBlob   = {},
			sectionIDs = [],
			rowIDs     = [];
		for (var i = 0; i < jsonData.length; i++) {
			//    1.拿到所有的sectionId
			sectionIDs.push(i);
			//    2.把组中的内容放入dataBlob内容中
			dataBlob[i] = jsonData[i].title;
			//    3.设置改组中每条数据的结构
			rowIDs[i] = [];
			//    4.取出改组中所有的数据
			var cars = jsonData[i].cars;
			//    5.便利cars,设置每组的列表数据
			for (var j = 0; j < cars.length; j++) {
				//    改组中的每条对应的rowId
				rowIDs[i].push(j);
				// 把每一行中的内容放入dataBlob对象中
				dataBlob[i + ':' + j] = cars[j];
			}
		}
		console.log(dataBlob)
		console.log(sectionIDs)
		console.log(rowIDs)
		// 更新状态
		this.setState({
			dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
		});
	},
	// 每一行中的数据
	renderRow(rowData){
		return (
			<TouchableOpacity>
				<View style={styles.rowView}>
					<Image source={{uri:rowData.icon}} style={styles.rowImage} />
					<View style={styles.rowTitleSup}>
						<Text style={styles.rowTitle}>{rowData.name}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	},
	// 每一组对应的数据
	renderSectionHeader(sectionData, sectionId){
		return (
			<View style={styles.sectionView}>
				<Text style={styles.sectionTitle}>{sectionData}</Text>
			</View>
		);
	}
});
const styles = StyleSheet.create({
	listStyle  : {},
	sectionView: {
		height         : 22,
		backgroundColor: "#c3c3c3",
		justifyContent : "center"
	},
	sectionTitle: {
		marginLeft: 16,
	},
	rowView     : {
		height       : 44,
		flexDirection: 'row',
		paddingLeft  : 16,
		alignItems   : 'center'
	},
	rowImage    : {
		width : 44,
		height: 44
	},
	rowTitleSup : {
		height           : 44,
		width            : 700,
		borderBottomWidth: 1,
		borderBottomColor: "#c3c3c3",
		marginLeft       : 16,
		justifyContent   : 'center'
	},
	rowTitle    : {
		fontSize: 16,
	}
});
module.exports = SectionListView;
