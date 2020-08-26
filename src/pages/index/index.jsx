import Taro, { Component,  } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  handleImg = async () => {
    const param = {
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
    }
    const { tempFilePaths } = await Taro.chooseImage(param);
      if (tempFilePaths.length > 0) {
        this.uploadFile(tempFilePaths[0])
      }
  }

  uploadFile = async (file) => {
    Taro.showLoading({ title: '上传中...' });
    Taro.uploadFile({
      url: 'http://thyrsi.com',
      filePath: file,
      name: 'file',
      success: res => {
        console.log(res, 'success')
        Taro.hideLoading()
      },
      fail: (err) => {
        console.log(err, 'fail')
      },
      complete: res => {
        console.log(res, 'complete')
        Taro.hideLoading();
      }
    })
  };


  render () {
    return (
      <View className='index' onClick={this.handleImg}>
        点击选择图片
      </View>
    )
  }
}
