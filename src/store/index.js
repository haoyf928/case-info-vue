// store/index.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    caseInfo: {
      policyNo: '',
      accidentTime: '',
      reportTime: '',
      isfirstsiteFlag: '1',
      weatherSituation: ''
    },
    activeTab: 'reportInfo',
    formErrors: {}
  },
  mutations: {
    SET_CASE_INFO(state, info) {
      state.caseInfo = { ...state.caseInfo, ...info }
    },
    SET_ACTIVE_TAB(state, tab) {
      state.activeTab = tab
    },
    SET_FORM_ERRORS(state, errors) {
      state.formErrors = errors
    }
  },
  actions: {
    async submitForm({ commit, state }) {
      const errors = validateForm(state.caseInfo, requiredFields)
      
      if (Object.keys(errors).length > 0) {
        commit('SET_FORM_ERRORS', errors)
        scrollToFirstError()
        return false
      }
      
      try {
        // 提交到后端
        await api.submitCase(state.caseInfo)
        return true
      } catch (error) {
        console.error('提交失败:', error)
        return false
      }
    }
  }
})