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
        <CaseInfoForm 
          ref="caseForm" 
          :case-info="caseInfo" 
          @submit="handleSubmit" 
          @save="handleSave"
          @transfer="handleTransfer" 
        />
      </main>

      <!-- 右侧固定导航栏 -->
      <aside class="sidebar-fixed">
        <SidebarNavigation 
          :active-tab="activeTab" 
          @tab-change="handleTabChange" 
        />
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
  overflow-y: auto; /* 允许整页垂直滚动 */
}

/* 整体页面容器：垂直布局（顶部栏 + 内容） */
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: #F5F7FA;
}

/* 新增：顶部系统标题栏样式 */
.app-header {
  height: 40px;
  line-height: 40px;
  width: 100%;
  padding: 0px;
  padding-left: 2rem ;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 200;
  position: fixed;
  top: 0;
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
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

/* 双栏布局容器：占满剩余高度 */
.app-container {
  display: flex;
  flex-direction: row;
  flex: 1;
  padding: 4px 30px !important;
  gap: 24px;
  width: 100%;
  box-sizing: border-box;
}

/* 主内容区 */
.main-content {
  flex: 1;
  background-color: #F5F7FA;
  border-radius: 8px;
  box-sizing: border-box;
  max-width: calc(100% - 180px); 
  width: 100%;
  margin-left: 0; 
   padding-bottom: 160px !important;
}

/* 固定的右侧导航栏 */
.sidebar-fixed {
  width: 150px; 
  flex-shrink: 0;
  background-color: #F5F7FA;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 100;
  scrollbar-width: none;
  -ms-overflow-style: none;
  position: fixed; /* 固定定位 */
  right: 24px;
  top: 80px; /* 调整距离顶部的高度，给标题栏留出更多空间 */
  height: calc(100vh - 104px); /* 相应调整高度计算 */
  border-radius: 8px;
  padding-top: 16px; /* 减少内边距 */
  box-sizing: border-box; /* 确保盒模型正确计算 */
}

/* 隐藏滚动条 */
::v-deep .main-content-centered::-webkit-scrollbar,
::v-deep .sidebar-fixed::-webkit-scrollbar {
  display: none;
}

/* 固定在底部的按钮区域 */
.form-actions-sticky {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0; /* 替代100%宽度，避免滚动条问题 */
  z-index: 200;
  height: auto; /* 取消固定高度，由内边距自适应 */
  background-color: #ffffff;
  border-top: 1px solid #e5e5e5; /* 替换深灰色边框，匹配截图浅边框 */
  border-bottom: none;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.02); /* 阴影方向改为向上，更自然 */
  display: flex;
  justify-content: center; /* 按钮居中，匹配截图 */
  align-items: center;
  gap: 16px; /* 按钮间距 */
  padding: 12px 20px; /* 上下内边距，匹配截图按钮高度 */
  flex-wrap: wrap;
  /* 去掉圆角：截图中底部栏无圆角，圆角会导致和页面边缘衔接突兀 */
  border-radius: 0;
}

/* 按钮样式 */
.btn-submit, .btn-save, .btn-transfer {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  transition: all 0.2s ease;
}

.btn-submit {
  background-color: #3B4DAA;
  color: white;
}

.btn-submit:hover {
  background-color: #3B4DAA;
}

.btn-save {
  background-color: #F5F7FA;
  color: rgb(21, 20, 20);
}

.btn-save:hover {
  background-color: #F5F7FA;
}

.btn-transfer {
  background-color: #F5F7FA ;
  color: #212529;
}

.btn-transfer:hover {
  background-color: #4D9F8D;
}

/* 响应式适配 */
@media (max-width: 1024px) {
  .app-container {
    flex-direction: column;
    padding: 12px;
  }

  .main-content {
    max-width: 100%;
    margin-right: 0; /* 小屏幕上去掉右边距 */
    margin-bottom: 120px; /* 为固定导航留出空间 */
  }

  .sidebar-fixed {
    position: fixed;
    bottom: 0;
    top: auto;
    left: 0;
    right: 0;
    width: 100%;
    height: 120px;
    border-radius: 0;
    z-index: 1000;
    right: 0; /* 重置right值 */
    top: auto; /* 重置top值 */
  }
  
  .app-header {
    position: static; /* 在小屏幕上取消sticky定位 */
  }
  
  .form-actions-sticky {
    left: 12px;
    right: 12px;
    border-radius: 8px 8px 0 0;
  }
}
</style>