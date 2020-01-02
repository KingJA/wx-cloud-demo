//index.js

const db = wx.cloud.database();

Page({
  data: {
    images: [],

  },

  insert: function() {
    db.collection('user').add({
      data: {
        name: 'tom',
        age: 18
      }
    }).then(res => {
      console.log('success:' + res);
    }).catch(res => {
      console.log('error:' + error);
    })


    // database.collection('user').add({
    //   data: {
    //     name: 'kingja4',
    //     age: 20
    //   },
    //   success: res => {
    //     console.log('success:' +res);
    //   },
    //   fail: error => {
    //     console.log('error:' +error);
    //   }
    // })
  },

  update: function() {
    db.collection('user').doc('b040a67a5e05b41e07adb2f420010578').update({
      data: {
        age: 88
      }
    }).then(res => {
      console.log('update success:' + res);
    }).catch(error => {
      console.log('update error:' + error);
    })
  },

  search: function() {
    db.collection('user').where({
      name: 'tom'
    }).get().then(res => {
      console.log(res);
    }).catch(error => {
      console.log('search error:' + error);
    })
  },
  delete: function() {
    db.collection('user').doc('dbff9fc75e05b46107ae77aa1947ae94').remove().then(res => {
      console.log(res);
    }).catch(error => {
      console.log('update error:' + error);
    })
  },
  sum: function() {
    wx.cloud.callFunction({
      name: 'sum',
      data: {
        a: 2,
        b: 3
      }
    }).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    });
  },
  getOpenId: function() {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    });
  },
  batchDelete: function() {
    wx.cloud.callFunction({
      name: 'batchDelete'
    }).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    });
  },
  upload: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths

        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: new Date().getTime() + '.png',
          // 指定要上传的文件的小程序临时文件路径
          filePath: tempFilePaths[0],
          // 成功回调
          success: res => {
            console.log('上传成功', res)
            db.collection('image').add({
              data: {
                fileID: res.fileID
              }

            }).then(res => {
              console.log(res);
            }).catch(error => {
              console.error(error);
            });
          },
        })
      }
    })
  },
  getFile: function() {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      db.collection('image').where({
        _openid: res.result._openid
      }).get().then(res2 => {
        console.log(res2);

        this.setData({
          images: res2.data
        });

      })
    }).catch(error => {
      console.log(error);
    });
  },
  downloadFile: function(event) {
    console.log('开始下载' + event.target.dataset.fileid);
    wx.cloud.downloadFile({
      fileID: event.target.dataset.fileid, //仅为示例，并非真实的资源
      success(res) {
        console.log(res.tempFilePath);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功',
            })
            console.log(res);
          }
        })
      },
      fail(error) {
        console.log(error);
      }
    })
  }


})