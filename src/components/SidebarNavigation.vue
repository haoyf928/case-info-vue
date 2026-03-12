<!-- src/components/SidebarNavigation.vue -->
<template>
  <div class="sidebar-navigation">
    <ul class="nav-list">
      <li 
        v-for="item in navItems" 
        :key="item.id"
        :class="{ active: activeTab === item.id }"
        @click="onTabClick(item.id)"
        class="nav-item"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-text">{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SidebarNavigation',
  props: {
    activeTab: {
      type: String,
      default: 'reportInfo'
    }
  },
  data() {
    return {
      navItems: [
        { id: 'policyInfo', text: '保单信息'},
        { id: 'reportInfo', text: '报案信息' },
        { id: 'vehicleInfo', text: '车辆信息' },
        { id: 'contactInfo', text: '联系人信息' },
        { id: 'propertyLoss', text: '财产损失' },
        { id: 'personInjury', text: '人员伤亡' },
        { id: 'accidentRescue', text: '事故救援' },
        { id: 'caseDesc', text: '案件补充说明' }
      ]
    }
  },
  methods: {
    onTabClick(tabId) {
      // 发送事件给父组件
      this.$emit('tab-change', tabId)
    }
  }
}
</script>

<style scoped>
.sidebar-navigation {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.nav-header {
  padding: 16px;
  border-bottom: 1px solid #eee;
  background-color: #f8f9fa;
}

.nav-header h4 {
  margin: 0;
  font-size: 15px;
  color: #333;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid #f5f5f5;
}

.nav-item:hover {
  background-color: #e8f4fc;
}

.nav-item.active {
  background-color: #e6f7ff;
  color: #007bff;
  border-left: 3px solid #007bff;
}

.nav-icon {
  font-size: 16px;
  width: 20px;
  text-align: center;
}

.nav-text {
  font-size: 14px;
  font-weight: 500;
}
</style>