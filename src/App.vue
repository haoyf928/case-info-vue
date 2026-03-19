<!-- src/App.vue -->
<template>
  <div class="app-wrapper">
    <!-- 新增：顶部系统标题栏 -->
    <header class="app-header">
      <div class="header-left">
        <i class="iconfont icon-shield .system-icon " ></i>
        <h2 class="system-title">保险理赔管理系统</h2>
      </div>
    </header>

    <!-- 原有双栏布局容器 -->
    <div class="app-container">
      <!-- 左侧主内容区 -->
      <main class="main-content">
        <CaseInfoForm 
          ref="caseForm" 
          :case-info="caseInfo" 
          @submit="handleSubmit" 
          @save="handleSave"
          @transfer="handleTransfer" 
        />
      </main>

      <!-- 右侧导航栏 -->
      <aside class="sidebar">
        <SidebarNavigation 
          :active-tab="activeTab" 
          @tab-change="handleTabChange" 
        />
      </aside>
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
      activeTab: 'reportInfo'
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
  background-color: #f5f5f5;
}

/* 整体页面容器：垂直布局（顶部栏 + 双栏内容） */
.app-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  width: 100%;
}

/* 新增：顶部系统标题栏样式 */
.app-header {
  height: 40px;
  line-height: 40px;
  padding: 0 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  z-index: 200;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.system-icon {
  font-size: 24px; /* 图标大小，按需调整（推荐20-28px） */
  color: #0056a4; /* 替代行内style，统一管理 */
  vertical-align: middle;
}

.system-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

/* 双栏布局容器：占满剩余高度 */
.app-container {
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow: hidden;
}

/* 左侧主内容区 */
.main-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 24px;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

/* 右侧导航栏 */
.sidebar {
  width: 240px;
  flex-shrink: 0;
  background-color: #f9fafb;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 100;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

/* 隐藏滚动条 */
::v-deep .main-content::-webkit-scrollbar,
::v-deep .sidebar::-webkit-scrollbar {
  display: none;
}

/* 响应式适配 */
@media (max-width: 1024px) {
  .app-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: 120px;
    border-right: none;
    border-top: 1px solid #e5e7eb;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
  }

  .main-content {
    height: calc(100vh - 60px - 120px); /* 扣除顶部栏和导航栏高度 */
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
  }
}
</style>