<!-- src/App.vue -->
<template>
  <div class="app-wrapper">
    <!-- 新增：顶部系统标题栏 -->
    <header class="app-header">
      <div class="header-left">
        <i class="iconfont icon-shield"></i>
        <h2 class="system-title">保险理赔管理系统</h2>
      </div>
    </header>

    <!-- 原有双栏布局容器 -->
    <div class="app-container">
      <!-- 主内容区 -->
      <main class="main-content">
        <CaseInfoForm ref="caseForm" :case-info="caseInfo" @submit="handleSubmit" @save="handleSave"
          @transfer="handleTransfer" />
      </main>

      <!-- 右侧固定导航栏 -->
      <aside class="sidebar-fixed">
        <SidebarNavigation :active-tab="activeTab" @tab-change="handleTabChange" />
      </aside>
    </div>

    <!-- 固定在底部的按钮区域 - 从 CaseInfoForm 移至此处 -->
    <div class="form-actions-sticky">
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

export default {
  name: 'App',
  components: {
    CaseInfoForm,
    SidebarNavigation
  },
  data() {
    return {
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
  /* 顶栏高度 */
  padding: 6px 24px;
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

/* ------------------------------ */
/* ✅ 响应式：平板 768~1024 */
/* ------------------------------ */
@media (max-width: 1024px) {
  .app-container {
    flex-direction: column;
    padding: 12px 16px;
  }

  .main-content {
    max-width: 100%;
    padding-bottom: 200px !important;
  }

  /* 右侧导航变成顶部横向 */
  .sidebar-fixed {
    position: relative;
    width: 100%;
    height: auto;
    max-height: 120px;
    right: auto;
    top: auto;
    margin-bottom: 12px;
  }
}

/* ------------------------------ */
/* ✅ 响应式：手机 <768 */
/* ------------------------------ */
@media (max-width: 768px) {
  .app-header {
    padding: 0 12px;
  }

  .app-container {
    padding: 8px 12px;
  }

  .main-content {
    padding-bottom: 220px !important;
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

/* ------------------------------ */
/* ✅ 超小屏幕 <480 */
/* ------------------------------ */
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