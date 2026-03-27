<!-- src/components/SidebarNavigation.vue -->
<template>
  <div class="sidebar-navigation">
    <ul class="nav-list">
      <li
  v-for="item in navItems"
  :key="item.id"
  class="nav-item"
  :class="{ active: activeTab === item.id }"
  @click="onTabClick(item)"
>
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
      required: true ,
      default: ''  
    }
  },
  data() {
    return {
      navItems: [
        { id: 'policyInfo', text: '保单信息' },
        { id: 'historyReport', text: '历史报案记录' },
        { id: 'reportInfo', text: '报案信息' },
        { id: 'accidentRescue', text: '事故救援' },
        { id: 'vehicleInfo', text: '涉案车辆信息' },
        { id: 'propertyLoss', text: '财产损失信息' },
        { id: 'personInjury', text: '人员伤亡信息' },
        { id: 'lossType', text: '损失类型' },
        { id: 'caseDesc', text: '案件补充说明' }
      ]
    }
  },
  methods: {
    onTabClick(item) {
    // 🔥 关键：直接传 item.id，绝对不延迟
    this.$emit('tab-change', item.id)
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
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid #f5f5f5;
}
.nav-icon {
  font-size: 16px;
  width: 20px;
  text-align: center;
}

.nav-text {
  font-size: 12px;
  font-weight: 300;
}


.nav-item:hover {
  background-color: #e8f4fc;
}

.nav-item.active {
  background-color: #e3eaed;
  color: #3B4DAA;
  border-left: 3px solid #3B4DAA;
}

/* 选中状态 → 强制加粗 */
.nav-item.active .nav-text {
  font-weight: 700 !important;
  color: #3B4DAA !important;
}

</style>