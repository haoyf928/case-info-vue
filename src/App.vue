<template>
  <div class="app-wrapper">
    <!-- 顶部系统标题栏 -->
    <header class="app-header">
      <div class="header-left">
        <i class="iconfont icon-shield"></i>
        <h2 class="system-title">保险理赔管理系统</h2>
      </div>
    </header>

    <!-- 选项卡导航 -->
    <div class="tabs-nav">
      <button 
        :class="['tab-btn', { active: currentPage === 'caseForm' }]" 
        @click="currentPage = 'caseForm'"
      >
        案件录入
      </button>
      <button 
        :class="['tab-btn', { active: currentPage === 'policySearch' }]" 
        @click="currentPage = 'policySearch'"
      >
        保单查询
      </button>
    </div>

    <!-- 原有双栏布局容器 -->
    <div class="app-container">
      <!-- 主内容区 -->
      <main class="main-content"
      :class="{ 'full-width': currentPage === 'policySearch' }"
      >
        <!-- 案件录入表单 -->
        <CaseInfoForm 
          v-if="currentPage === 'caseForm'" 
          ref="caseForm" 
          :case-info="caseInfo" 
          @submit="handleSubmit" 
          @save="handleSave"
          @transfer="handleTransfer" 
        />
        
        <!-- 保单查询页面 -->
        <PolicySearch 
          v-if="currentPage === 'policySearch'" 
        />
      </main>

      <!-- 右侧固定导航栏 - 只在案件录入页面显示 -->
      <aside v-if="currentPage === 'caseForm'" class="sidebar-fixed">
        <SidebarNavigation :active-tab="activeTab" @tab-change="handleTabChange" />
      </aside>
    </div>

    <!-- 固定在底部的按钮区域 - 只在案件录入页面显示 -->
    <div v-if="currentPage === 'caseForm'" class="form-actions-sticky">
      <button type="button" @click="validateAndSubmit" class="btn-submit">
        <i class="iconfont icon-fasong"></i> 提交
      </button>
      <button type="button" @click="handleSaveFromApp" class="btn-save">
        <i class="iconfont icon-icon-zancun"></i> 暂存
      </button>
      <button type="button" @click="handleTransferFromApp" class="btn-transfer">
        <i class="iconfont icon-arrow-1-right"></i> 转专岗处理
      </button>
    </div>
  </div>
</template>

<script>
import CaseInfoForm from './components/CaseInfoForm.vue'
import SidebarNavigation from './components/SidebarNavigation.vue'
import PolicySearch from './components/policySearch.vue'  // 引入新组件

export default {
  name: 'App',
  components: {
    CaseInfoForm,
    SidebarNavigation,
    PolicySearch  // 注册新组件
  },
  data() {
    return {
      currentPage: 'policySearch',  // 控制当前显示的页面
      caseInfo: {
        policyNo: '29932070365202500000008',
        appliName: '吴*行',
        insuredName: '吴*行',
        agentName: '李祥荣',
        insuranceName: '机动车、特种车商业保险2020版',
        policyStartDateStr: '2025/11/27 00:00:00',
        policyEndDateStr: '2026/11/26 23:59:59',
        insurerName: '32070101-招商财产保险股份有限公司连云港中心支公司业务一部出单机构一',
        workUnit: '',
        customerSource: '',
        customerTag: '一般客户',
        customerLevel: '新客户',
        specialistName: '',
        specialistPhone: '',
        serviceLevel: '',
        damageLocationType: '',
        street: '',
        doorNumber: '',
        longitude: '',
        latitude: '',
        currentAreaProvince: '',
        currentAreaCity: '',
        currentAreaDistrict: '',
        currentStreet: '',
        currentDoorNumber: '',
        currentLongitude: '',
        currentLatitude: '',
        accidentDescription: '',
        accidentCause: '',
        handleDepartment: '',
        handleType: '',
        responsibility: '',
        driverIsInsured: '',
        insuredCertType: '',
        emergencyLevel: '',
        isOutProvince: '',
        isWeChatClaim: '',
        accidentReason: '',
        isAlarm: '',
        alarmTime: '',
        isDisaster: '',
        disasterType: '',
        disasterName: '',
        isOnSiteSurvey: '',
        tags: [],
        accidentTime: '',
        reportTime: '',
        isfirstsiteFlag: '1',
        weatherSituation: '',
        damageAddress: '',
        areaProvince: '',
        areaCity: '',
        areaDistrict: '',
        lsType: '',
        damageCode: '',
        licenseNumber: '',
        engineNumber: '',
        frameNumber: '',
        driverName: '',
        reportorName: '',
        reportorPhonenumber: '',
        linkerName: '',
        linkerPhone: '',
        propFlag: '',
        woundFlag: '',
        reporterRelation: '',
        reporterCertType: '',
        reporterCertNo: '',
        handlerCode: '133100013',
        isSubrogation: '0',
        currentLicenseNumber: '',
        damageStatus: '1',
        driverName: '',
        driverCertType: '',
        driverCertNo: '',
        damageDegree: '',
        vehicleCanRun: '1',
        vehicleStatus: '1',
        engineNumber: '',
        frameNumber: ''
      },
      activeTab: 'policyInfo'
    }
  },
  methods: {
    handleSubmit(caseInfo) {
      console.log('提交数据:', caseInfo)
      alert('提交成功！')
    },
    handleSave(caseInfo) {
      console.log('暂存数据:', caseInfo)
      alert('暂存成功！')
    },
    handleTransfer(caseInfo) {
      console.log('转专岗数据:', caseInfo)
      alert('转专岗成功！')
    },

    // 从 App.vue 触发的事件处理方法
    validateAndSubmit() {
      if (this.$refs.caseForm) {
        this.$refs.caseForm.validateAndSubmit()
      }
    },

    handleSaveFromApp() {
      if (this.$refs.caseForm) {
        this.$refs.caseForm.handleSave()
      }
    },

    handleTransferFromApp() {
      if (this.$refs.caseForm) {
        this.$refs.caseForm.handleTransfer()
      }
    },

    handleTabChange(tab) {
      console.log('导航栏点击:', tab)
      this.activeTab = tab
      this.$nextTick(() => {
        if (this.$refs.caseForm && this.$refs.caseForm.navigateToSection) {
          this.$refs.caseForm.navigateToSection(tab)
        } else {
          console.error('CaseForm 组件或 navigateToSection 方法不存在')
        }
      })
    }
  }
}
</script>
<style scoped>
.tabs-nav {
  display: flex;
  margin: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.tab-btn {
  padding: 10px 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.tab-btn.active {
  border-bottom: 2px solid #3B4DAA;
  color: #3B4DAA;
  font-weight: bold;
}

/* 其他样式保持不变 */
/* 全局重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  color: #333;
  background-color: #F5F7FA;
  overflow-y: auto;
}

/* 整体页面容器 */
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: #F5F7FA;
}

/* 顶部标题栏 */
.app-header {
  height: 40px;
  line-height: 40px;
  width: 100%;
  padding: 0 2rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  z-index: 200;
  position: fixed;
  top: 0;
  left: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.system-title {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

/* 双栏布局容器 */
.app-container {
  display: flex;
  flex-direction: row;
  flex: 1;
  padding: 60px 24px 20px; /* 调整了顶部内边距以适应固定头部 */
  gap: 20px;
  width: 100%;
  position: relative;
}

/* 主内容区 */
.main-content {
  flex: 1;
  width: 100%;
  max-width: calc(100% - 170px);
  padding-bottom: 160px !important;
  margin-left: 0;
}

/* 当显示保单查询页面时，主内容区占满宽度 */
.main-content.full-width {
  max-width: 100% !important;
}

/* 确保 policySearch 容器也充分利用空间 */
.main-content.full-width .policy-search-container {
  width: 100%;
  margin: 0;
}

/* 右侧固定导航栏 */
.sidebar-fixed {
  width: 150px;
  flex-shrink: 0;
  position: fixed;
  right: 24px;
  top: 60px;
  height: calc(100vh - 140px);
  overflow-y: auto;
  z-index: 100;
}

/* 底部按钮 */
.form-actions-sticky {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  background-color: #ffffff;
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  flex-wrap: wrap;
  border-radius: 0;
}

/* 按钮样式 */
.btn-submit,
.btn-save,
.btn-transfer {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-submit {
  background-color: #3B4DAA;
  color: white;
}

.btn-submit:hover {
  opacity: 0.9;
}

.btn-save,
.btn-transfer {
  background-color: #F5F7FA;
  color: #212529;
}

.btn-transfer:hover {
  background-color: #4D9F8D;
  color: #fff;
}

/* 响应式样式 */
@media (max-width: 1024px) {
  .app-container {
    flex-direction: column;
    padding: 80px 16px 20px;
  }

  .main-content {
    max-width: 100%;
    padding-bottom: 200px !important;
  }

  /* 当在小屏幕上时，即使在案件录入页面也要调整侧边栏 */
  .sidebar-fixed {
    position: relative;
    width: 100%;
    height: auto;
    max-height: 120px;
    right: auto;
    top: auto;
    margin-bottom: 12px;
  }
  
  .main-content.full-width .policy-search-container {
    padding-left: 16px;
    padding-right: 16px;
  }
}

@media (max-width: 768px) {
  .app-header {
    padding: 0 12px;
  }

  .app-container {
    padding: 80px 12px 20px;
  }

  .main-content {
    padding-bottom: 220px !important;
  }
  
  .main-content.full-width {
    padding-right: 12px;
  }
  
  .main-content.full-width .policy-search-container {
    padding-left: 12px;
    padding-right: 12px;
  }

  .form-actions-sticky {
    padding: 10px;
    gap: 8px;
  }

  .btn-submit,
  .btn-save,
  .btn-transfer {
    padding: 6px 12px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .form-actions-sticky {
    justify-content: space-between;
    padding: 8px 6px;
  }

  .btn-submit,
  .btn-save,
  .btn-transfer {
    flex: 1;
    justify-content: center;
  }
}
</style>