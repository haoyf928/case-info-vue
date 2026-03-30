<!-- src/components/PolicySearch.vue -->
<template>
  <div class="policy-search-container">
    <!-- ============ 检索条件区块 ============ -->
    <section class="form-section-policy" id="section-searchCondition">
      <div class="section-header">
        <div class="section-header-left">
          <!-- 主题色竖条装饰 -->
          <div class="section-decorator"></div>
          <h3>检索条件</h3>
        </div>
        <div class="section-header-right">
          <span class="toggle-icon" @click="toggleSearchCondition()">
            <i :class="searchConditionExpanded ? 'iconfont icon-arrow-down' : 'iconfont icon-shouqi'"></i>
          </span>
        </div>
      </div>

      <!-- 检索条件主体内容 -->
      <div class="section-content" v-show="searchConditionExpanded">
        <!-- 查询类型切换 -->
        <div class="query-type-tabs">
          <button 
            :class="['query-tab', { active: queryType === 'auto' }]" 
            @click="queryType = 'auto'"
          >
            车险查询
          </button>
          <button 
            :class="['query-tab', { active: queryType === 'non-auto' }]" 
            @click="queryType = 'non-auto'"
          >
            非车险查询
          </button>
        </div>

        <!-- 检索条件网格 -->
        <div class="search-condition-grid">
          <!-- 第1行：事故号/赔案号、保单号、报案号 -->
          <div class="info-item">
            <label>事故号 / 赔案号</label>
            <div class="value">
              <input 
                type="text" 
                v-model="searchForm.accidentNo" 
                placeholder="请输入事故号或赔案号"
                class="form-input"
              />
            </div>
          </div>
          <div class="info-item">
            <label>保单号</label>
            <div class="value">
              <input 
                type="text" 
                v-model="searchForm.policyNo" 
                placeholder="请输入保单号"
                class="form-input"
              />
            </div>
          </div>
          <div class="info-item">
            <label>报案号</label>
            <div class="value">
              <input 
                type="text" 
                v-model="searchForm.reportNo" 
                placeholder="请输入报案号"
                class="form-input"
              />
            </div>
          </div>

          <!-- 第2行：案件状态、车牌号、发动机号 -->
          <div class="info-item">
            <label>案件状态</label>
            <div class="value">
              <select v-model="searchForm.caseStatus" class="form-input">
                <option value="">全部</option>
                <option value="pending">待处理</option>
                <option value="in-progress">处理中</option>
                <option value="completed">已完成</option>
                <option value="closed">已关闭</option>
              </select>
            </div>
          </div>
          <div class="info-item">
            <label>车牌号</label>
            <div class="value">
              <input 
                type="text" 
                v-model="searchForm.licensePlate" 
                placeholder="请输入车牌号"
                class="form-input"
              />
            </div>
          </div>
          <div class="info-item">
            <label>发动机号</label>
            <div class="value">
              <input 
                type="text" 
                v-model="searchForm.engineNo" 
                placeholder="请输入发动机号"
                class="form-input"
              />
            </div>
          </div>

          <!-- 第3行：被保险人姓名、报案电话、联系人电话 -->
          <div class="info-item">
            <label>被保险人姓名</label>
            <div class="value">
              <input 
                type="text" 
                v-model="searchForm.insuredName" 
                placeholder="请输入被保险人姓名"
                class="form-input"
              />
            </div>
          </div>
          <div class="info-item">
            <label>报案电话</label>
            <div class="value">
              <input 
                type="text" 
                v-model="searchForm.reportPhone" 
                placeholder="请输入报案电话"
                class="form-input"
              />
            </div>
          </div>
          <div class="info-item">
            <label>联系人电话</label>
            <div class="value">
              <input 
                type="text" 
                v-model="searchForm.contactPhone" 
                placeholder="请输入联系人电话"
                class="form-input"
              />
            </div>
          </div>

          <!-- 第4行：报案时间起止 -->
          <div class="info-item">
            <label>报案时间起</label>
            <div class="value">
              <el-date-picker
                v-model="searchForm.reportStartDate"
                type="datetime"
                placeholder="请选择开始时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy/MM/dd HH:mm:ss"
                class="form-input"
              />
            </div>
          </div>
          <div class="info-item">
            <label>报案时间止</label>
            <div class="value">
              <el-date-picker
                v-model="searchForm.reportEndDate"
                type="datetime"
                placeholder="请选择结束时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy/MM/dd HH:mm:ss"
                class="form-input"
              />
            </div>
          </div>
          <div class="info-item">
            <label>&nbsp;</label>
            <div class="value">
              <div class="action-buttons">
                <button @click="resetConditions" class="btn-reset">重置条件</button>
                <button @click="searchCases" class="btn-search">查询</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 检索结果区块 ============ -->
    <section class="form-section-policy" id="section-searchResult">
      <div class="section-header">
        <div class="section-header-left">
          <!-- 主题色竖条装饰 -->
          <div class="section-decorator"></div>
          <h3>检索结果</h3>
          <el-tag type="primary" size="small" class="selected-count-tag">
            共 {{ searchResults.length }} 条
          </el-tag>
        </div>
        <div class="section-header-right">
          <span class="toggle-icon" @click="toggleSearchResult()">
            <i :class="searchResultExpanded ? 'iconfont icon-arrow-down' : 'iconfont icon-shouqi'"></i>
          </span>
        </div>
      </div>

      <!-- 检索结果主体内容 -->
      <div class="section-content" v-show="searchResultExpanded">
        <div class="results-table-wrapper" v-if="searchResults.length > 0">
          <table class="results-table">
            <thead>
              <tr>
                <th class="col-source">来源</th>
                <th class="col-insurance">险种标识</th>
                <th class="col-customer">客户标识</th>
                <th class="col-status">案件状态</th>
                <th class="col-report">报案号</th>
                <th class="col-insured">被保险人姓名</th>
                <th class="col-time">报案时间</th>
                <th class="col-accident">事故号</th>
                <th class="col-policy">保单号</th>
                <th class="col-insurer">承保机构代码</th>
                <th class="col-handler">受理人</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in searchResults" :key="index">
                <td class="col-source">{{ item.source }}</td>
                <td class="col-insurance">{{ item.insuranceType }}</td>
                <td class="col-customer">{{ item.customerTag }}</td>
                <td class="col-status"><span class="status-badge">{{ item.caseStatus }}</span></td>
                <td class="col-report">{{ item.reportNo }}</td>
                <td class="col-insured">{{ item.insuredName }}</td>
                <td class="col-time">{{ item.reportTime }}</td>
                <td class="col-accident">{{ item.accidentNo }}</td>
                <td class="col-policy">{{ item.policyNo }}</td>
                <td class="col-insurer">{{ item.insurerCode }}</td>
                <td class="col-handler">{{ item.handler }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 空结果提示 -->
        <div v-else-if="hasSearched" class="no-results-container">
          <div class="no-results-icon">
            <i class="iconfont icon-search"></i>
          </div>
          <p class="no-results-text">暂无符合条件的记录</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'PolicySearch',
  data() {
    return {
      queryType: 'auto', // 默认车险查询
      searchForm: {
        accidentNo: '',
        policyNo: '',
        reportNo: '',
        caseStatus: '',
        licensePlate: '',
        engineNo: '',
        insuredName: '',
        reportPhone: '',
        contactPhone: '',
        reportStartDate: '',
        reportEndDate: ''
      },
      searchResults: [
        {
          source: '客服',
          insuranceType: '车险',
          customerTag: '一般客户',
          caseStatus: '已提交',
          reportNo: 'RDDH20260000000361273',
          insuredName: '刘*',
          reportTime: '2026-03-15 13:35:00',
          accidentNo: 'ACC2026100005',
          policyNo: '29932070330202500000008',
          insurerCode: '32070101',
          handler: '系统受理'
        },
        {
          source: '客服',
          insuranceType: '车险',
          customerTag: '一般客户',
          caseStatus: '已提交',
          reportNo: 'RDDH20260000000361274',
          insuredName: '胡*余',
          reportTime: '2026-03-16 14:42:00',
          accidentNo: 'ACC2026100006',
          policyNo: '29932070365202500000008',
          insurerCode: '32070101',
          handler: '系统受理'
        },
        {
          source: '客服',
          insuranceType: '车险',
          customerTag: '一般客户',
          caseStatus: '已提交',
          reportNo: 'RDDH20260000000361275',
          insuredName: '张*',
          reportTime: '2026-03-17 15:49:00',
          accidentNo: 'ACC2026100007',
          policyNo: '29932070330202500000008',
          insurerCode: '32070101',
          handler: '系统受理'
        },
        {
          source: '客服',
          insuranceType: '车险',
          customerTag: '一般客户',
          caseStatus: '已提交',
          reportNo: 'RDDH20260000000361276',
          insuredName: '李*',
          reportTime: '2026-03-18 16:56:00',
          accidentNo: 'ACC2026100008',
          policyNo: '29932070365202500000008',
          insurerCode: '32070101',
          handler: '系统受理'
        },
        {
          source: '客服',
          insuranceType: '车险',
          customerTag: '一般客户',
          caseStatus: '已提交',
          reportNo: 'RDDH20260000000361277',
          insuredName: '王*',
          reportTime: '2026-03-19 17:03:00',
          accidentNo: 'ACC2026100009',
          policyNo: '29932070330202500000008',
          insurerCode: '32070101',
          handler: '系统受理'
        }
      ],
      hasSearched: true,
      searchConditionExpanded: true, // 默认展开检索条件
      searchResultExpanded: true      // 默认展开检索结果
    }
  },
  methods: {
    searchCases() {
      this.hasSearched = true;
      this.searchResults = [
        {
          source: '客服',
          insuranceType: '车险',
          customerTag: '一般客户',
          caseStatus: '已提交',
          reportNo: 'RDDH20260000000361268',
          insuredName: '胡*余',
          reportTime: '2026-03-10 08:00:00',
          accidentNo: 'ACC2026100000',
          policyNo: '29932070365202500000008',
          insurerCode: '32070101',
          handler: '系统受理'
        },
        {
          source: '客服',
          insuranceType: '车险',
          customerTag: '一般客户',
          caseStatus: '已提交',
          reportNo: 'RDDH20260000000361269',
          insuredName: '张*',
          reportTime: '2026-03-11 09:07:00',
          accidentNo: 'ACC2026100001',
          policyNo: '29932070330202500000008',
          insurerCode: '32070101',
          handler: '系统受理'
        },
        {
          source: '客服',
          insuranceType: '车险',
          customerTag: '一般客户',
          caseStatus: '已提交',
          reportNo: 'RDDH20260000000361270',
          insuredName: '李*',
          reportTime: '2026-03-12 10:14:00',
          accidentNo: 'ACC2026100002',
          policyNo: '29932070365202500000008',
          insurerCode: '32070101',
          handler: '系统受理'
        },
        {
          source: '客服',
          insuranceType: '车险',
          customerTag: '一般客户',
          caseStatus: '已提交',
          reportNo: 'RDDH20260000000361271',
          insuredName: '王*',
          reportTime: '2026-03-13 11:21:00',
          accidentNo: 'ACC2026100003',
          policyNo: '29932070330202500000008',
          insurerCode: '32070101',
          handler: '系统受理'
        },
        {
          source: '客服',
          insuranceType: '车险',
          customerTag: '一般客户',
          caseStatus: '已提交',
          reportNo: 'RDDH20260000000361272',
          insuredName: '赵*',
          reportTime: '2026-03-14 12:28:00',
          accidentNo: 'ACC2026100004',
          policyNo: '29932070365202500000008',
          insurerCode: '32070101',
          handler: '系统受理'
        },
        {
          source: '客服',
          insuranceType: '车险',
          customerTag: '一般客户',
          caseStatus: '已提交',
          reportNo: 'RDDH20260000000361273',
          insuredName: '刘*',
          reportTime: '2026-03-15 13:35:00',
          accidentNo: 'ACC2026100005',
          policyNo: '29932070330202500000008',
          insurerCode: '32070101',
          handler: '系统受理'
        },
        {
          source: '客服',
          insuranceType: '车险',
          customerTag: '一般客户',
          caseStatus: '已提交',
          reportNo: 'RDDH20260000000361274',
          insuredName: '胡*余',
          reportTime: '2026-03-16 14:42:00',
          accidentNo: 'ACC2026100006',
          policyNo: '29932070365202500000008',
          insurerCode: '32070101',
          handler: '系统受理'
        },
        {
          source: '客服',
          insuranceType: '车险',
          customerTag: '一般客户',
          caseStatus: '已提交',
          reportNo: 'RDDH20260000000361275',
          insuredName: '张*',
          reportTime: '2026-03-17 15:49:00',
          accidentNo: 'ACC2026100007',
          policyNo: '29932070330202500000008',
          insurerCode: '32070101',
          handler: '系统受理'
        },
        {
          source: '客服',
          insuranceType: '车险',
          customerTag: '一般客户',
          caseStatus: '已提交',
          reportNo: 'RDDH20260000000361276',
          insuredName: '李*',
          reportTime: '2026-03-18 16:56:00',
          accidentNo: 'ACC2026100008',
          policyNo: '29932070365202500000008',
          insurerCode: '32070101',
          handler: '系统受理'
        },
        {
          source: '客服',
          insuranceType: '车险',
          customerTag: '一般客户',
          caseStatus: '已提交',
          reportNo: 'RDDH20260000000361277',
          insuredName: '王*',
          reportTime: '2026-03-19 17:03:00',
          accidentNo: 'ACC2026100009',
          policyNo: '29932070330202500000008',
          insurerCode: '32070101',
          handler: '系统受理'
        }
      ];
    },
    resetConditions() {
      this.searchForm = {
        accidentNo: '',
        policyNo: '',
        reportNo: '',
        caseStatus: '',
        licensePlate: '',
        engineNo: '',
        insuredName: '',
        reportPhone: '',
        contactPhone: '',
        reportStartDate: '',
        reportEndDate: ''
      };
      this.searchResults = [];
      this.hasSearched = false;
    },
    toggleSearchCondition() {
      this.searchConditionExpanded = !this.searchConditionExpanded;
    },
    toggleSearchResult() {
      this.searchResultExpanded = !this.searchResultExpanded;
    }
  }
}
</script>

<style scoped>
.policy-search-container {
  padding: 20px 0px;
  background-color: white;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.form-section-policy {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 16px;
  background-color: #fafafa;
  position: relative;
  width: 100%; 
  box-sizing: border-box;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e5e5;
  width: 100%;
}

.section-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-header-right {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.section-header h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
  font-weight: 600;
}

/* 主题色竖条装饰 */
.section-decorator {
  width: 4px;
  height: 24px;
  background-color: #3B4DAA;
  border-radius: 2px;
}

/* 已选择保单标签 */
.selected-count-tag {
  margin-left: 8px;
  background-color: #faf7f7;
  color: black;
  height: 24px;
  line-height: 22px;
  font-size: 12px;
  border-radius: 12px;
}

/* 展开/收起图标 */
.toggle-icon {
  cursor: pointer;
  color: #3B4DAA;
  font-size: 16px;
}

/* 检索条件网格 */
.search-condition-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
  width: 100%;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.info-item label {
  font-size: 12px;
  font-weight: 500;
  color: #333;
  display: flex;
  align-items: center;
  gap: 4px;
}

.info-item .value {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  box-sizing: border-box; /* 确保padding不影响宽度计算 */
}

.form-input:focus {
  outline: none;
  border-color: #3B4DAA;
}

/* 查询类型切换 */
.query-type-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  width: 100%;
}

.query-tab {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f5f7fa;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
  flex: 1; /* 让按钮平均分配空间 */
  text-align: center;
}

.query-tab.active {
  background-color: #3B4DAA;
  color: white;
  border-color: #3B4DAA;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 8px;
  width: 100%;
}

.btn-reset {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
  flex: 1; /* 平均分配空间 */
}

.btn-reset:hover {
  background-color: #f5f7fa;
}

.btn-search {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: #3B4DAA;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
  flex: 1; /* 平均分配空间 */
}

.btn-search:hover {
  background-color: #2c3b8d;
}

/* 结果表格 */
.results-table-wrapper {
  overflow-x: auto;
  max-height: 600px;
  width: 100%;
}

.results-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
}

.results-table th {
  background-color: #f8f9fa;
  padding: 10px 8px;
  text-align: left;
  font-weight: 500;
  font-size: 12px;
  color: #333;
  border-bottom: 1px solid #e5e7eb;
  min-width: 80px; /* 设置最小列宽 */
}

.results-table td {
  padding: 10px 8px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 12px;
  color: #333;
  min-width: 80px; /* 设置最小列宽 */
}

/* 表格列宽 */
.col-source { min-width: 60px; width: 80px; }
.col-insurance { min-width: 70px; width: 90px; }
.col-customer { min-width: 70px; width: 90px; }
.col-status { min-width: 80px; width: 100px; }
.col-report { min-width: 120px; width: 140px; }
.col-insured { min-width: 90px; width: 110px; }
.col-time { min-width: 120px; width: 140px; }
.col-accident { min-width: 100px; width: 120px; }
.col-policy { min-width: 150px; width: 180px; }
.col-insurer { min-width: 100px; width: 120px; }
.col-handler { min-width: 70px; width: 90px; }

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  color: #fff;
  background-color: #3B4DAA;
}

/* 空结果提示 */
.no-results-container {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  width: 100%;
}

.no-results-icon {
  font-size: 48px;
  margin-bottom: 16px;
  color: #e5e7eb;
}

.no-results-text {
  font-size: 14px;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .search-condition-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .query-tab {
    flex: initial; /* 在较小屏幕上不强制平均分配 */
  }
}

@media (max-width: 768px) {
  .search-condition-grid {
    grid-template-columns: 1fr;
  }
  
  .results-table {
    font-size: 11px;
  }
  
  .results-table th,
  .results-table td {
    padding: 8px 4px;
    min-width: 60px;
  }
  
  .col-source { width: 70px; }
  .col-insurance { width: 80px; }
  .col-customer { width: 80px; }
  .col-status { width: 90px; }
  .col-report { width: 120px; }
  .col-insured { width: 100px; }
  .col-time { width: 120px; }
  .col-accident { width: 100px; }
  .col-policy { width: 140px; }
  .col-insurer { width: 100px; }
  .col-handler { width: 80px; }
}
</style>