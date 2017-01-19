import React, {Component} from 'react'
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Dimensions,
	Modal
} from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer';
class Test extends Component {
	constructor(props) {
		super(props)
		this.state = {
			imgList   : [{
				url: 'http://scimg.jb51.net/allimg/160815/103-160Q509544OC.jpg'
			}, {
				url: 'http://img.sc115.com/uploads1/sc/jpgs/1508/apic22412_sc115.com.jpg'
			}, {
				url: 'http://v1.qzone.cc/avatar/201407/07/00/24/53b9782c444ca987.jpg!200x200.jpg'
			}],
			showViewer: true,
			showIndex : 0
		}
		this.viewerPressHandle = this.viewerPressHandle.bind(this)
		this.thumbPressHandle = this.thumbPressHandle.bind(this)
	}

	viewerPressHandle() {
		this.setState({
			showViewer: false
		})
	}

	thumbPressHandle(i) {
		this.setState({
			showIndex : i,
			showViewer: true
		})
	}

	render() {
		return (
			<Modal visible={true} transparent={true}>
				<ImageViewer imageUrls={this.state.imgList} />
			</Modal>
		)
	}
}
export {Test}
