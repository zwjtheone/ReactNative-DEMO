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
import {View, Text, StyleSheet} from 'react-native';
class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.header}>
				<Text style={styles.headerTitle}>妹子</Text>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	header     : {
		paddingTop     : 12,
		paddingBottom  : 12,
		backgroundColor: '#f4f5f6'
	},
	headerTitle: {
		color     : 'black',
		textAlign : 'center',
		fontSize  : 16,
		fontWeight: '600'
	}
});
export {Header};
