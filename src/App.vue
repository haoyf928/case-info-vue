<!-- src/App.vue -->
<template>
  <div class="app-container">
    <!-- 左侧主内容区 -->
    <main class="main-content">
      <!-- 添加 ref="caseForm" -->
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
        policyNo: '2024110001',
        appliName: '张三',
        insuredName: '张三',
        policyStartDateStr: '2024-01-01',
        policyEndDateStr: '2024-12-31',
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
        woundFlag: ''
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

html, body {
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