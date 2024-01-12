export default {
  login: {
    login: { task: 'post', url: '/api/login' }
  },
  userInfo: {
    notice: { task: 'post', target: 'firebase', url: '/api/user/notice', requestAuth: true }
  },
  place: {
    selectedRoom: { task: 'get', url: '/api/room/#id', requestAuth: true },
    control: { target: 'goqual', task: 'post', url: '/openapi/control/#deviceId', requestAuth: true }
  }
}

// ex)
// const data = await http.process("reserve", "reservedOrder", { id: id })
// http.process("manage", "searchUserByReserve", { name: state.memberName })
// let params = {
//   deviceId: item.id,
//   "requirments": {
//     "temperature": data.temp,
//     "fanSpeed": data.fanSpeed,
//     "power": data.bPower,
//     "mode": data.mode,
//   }
// }
// await http2.process('place', 'control', params);
