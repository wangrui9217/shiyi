import Cookie from 'js-cookie'

const mutations = {
  TOGGLE_SIDE_MENU: state => {
    if (state.side_menu_open) {
      Cookie.set('sidemenuStatus', 1)
    } else {
      Cookie.set('sidemenuStatus', 0)
    }
    state.side_menu_open = !state.side_menu_open
  },
  TOGGLE_PERSONAL_CENTER: state => {
    state.show_personal_center = !state.show_personal_center
  },
  CHANGE_STORE_ID: (state, val) => {
    state.store_id = val
  }
}
export default mutations
