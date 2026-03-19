<!-- src/App.vue -->
<template>
  <div class="app-container">
    <!-- 左侧主内容区 -->
    <main class="main-content">
      <!-- 添加 ref="caseForm" -->
      <CaseInfoForm ref="caseForm" :case-info="caseInfo" @submit="handleSubmit" @save="handleSave"
        @transfer="handleTransfer" />
    </main>

    <!-- 右侧导航栏 -->
    <aside class="sidebar">
      <SidebarNavigation :active-tab="activeTab" @tab-change="handleTabChange" />
    </aside>
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
        reporterRelation: '', // 报案人跟被保险人关系
        reporterCertType: '', // 报案人证件类型
        reporterCertNo: '',   // 报案人证件号码
        handlerCode: '133100013',
        isSubrogation: '0',           // 是否要求代位
        currentLicenseNumber: '',     // 现有车牌号
        damageStatus: '1',            // 损失情况：损/无损
        driverName: '',               // 驾驶员姓名
        driverCertType: '',           // 驾驶员证件类型
        driverCertNo: '',             // 驾驶员证件号码
        damageDegree: '',             // 损坏程度
        vehicleCanRun: '1',           // 车辆能否正常行驶
        vehicleStatus: '1',           // 车辆状态：需要拖车 / 气囊弹出
        engineNumber: '',             // 发动机号
        frameNumber: ''               // 车架号
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

      // 确保在 nextTick 中调用，因为 DOM 可能还未更新
      this.$nextTick(() => {
        console.log('caseForm 引用:', this.$refs.caseForm)
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

<style>
/* 保持原有样式不变 */
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

.app-container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f5f5f5;
}

.sidebar {
  width: 220px;
  flex-shrink: 0;
  background-color: #fff;
  border-left: 1px solid #ddd;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  z-index: 100;
}

.main-content::-webkit-scrollbar,
.sidebar::-webkit-scrollbar {
  width: 8px;
}

.main-content::-webkit-scrollbar-thumb,
.sidebar::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

.main-content::-webkit-scrollbar-thumb:hover,
.sidebar::-webkit-scrollbar-thumb:hover {
  background-color: #999;
}

@media (max-width: 1024px) {
  .app-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    border-left: none;
    border-top: 1px solid #ddd;
  }
}
</style>