//index.js

const db = wx.cloud.database();

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
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

  search: function () {
    db.collection('user').where({
      name: 'tom'
    }).get().then(res => {
      console.log(res);
    }).catch(error => {
      console.log('search error:' + error);
    })
  }, delete: function () {
    db.collection('user').doc('dbff9fc75e05b46107ae77aa1947ae94').remove().then(res => {
      console.log( res);
    }).catch(error => {
      console.log('update error:' + error);
    })
  },


})