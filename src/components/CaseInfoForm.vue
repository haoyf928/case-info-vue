<!-- src/components/CaseInfoForm.vue -->
<template>
  <div class="case-info-form">
    
    <!-- ============ 保单信息区块 ============ -->
    <section class="form-section" id="section-policyInfo">
      <div class="section-header" @click="toggleSection('policyInfo')">
        <h3>📋 保单信息</h3>
        <span class="toggle-icon">
          {{ policyInfoExpanded ? '▼' : '▶' }}
        </span>
      </div>
      
      <div v-show="policyInfoExpanded" class="section-content">
        <div class="form-row">
          <div class="form-group">
            <label>保单号 <span class="required">*</span></label>
            <input 
              type="text" 
              v-model="caseInfo.policyNo" 
              ref="policyNo"
              :class="{ 'input-error': validationErrors.policyNo }"
              readonly 
              class="form-input"
            />
            <span v-if="validationErrors.policyNo" class="error-message">
              {{ validationErrors.policyNo }}
            </span>
          </div>
          
          <div class="form-group">
            <label>投保人名称</label>
            <input 
              type="text" 
              v-model="caseInfo.appliName" 
              readonly 
              class="form-input"
            />
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>被保人名称</label>
            <input 
              type="text" 
              v-model="caseInfo.insuredName" 
              readonly 
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label>保险起期</label>
            <input 
              type="text" 
              v-model="caseInfo.policyStartDateStr" 
              readonly 
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label>保险止期</label>
            <input 
              type="text" 
              v-model="caseInfo.policyEndDateStr" 
              readonly 
              class="form-input"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 报案信息区块 ============ -->
    <section class="form-section" id="section-reportInfo">
      <div class="section-header" @click="toggleSection('reportInfo')">
        <h3>📝 报案信息</h3>
        <span class="toggle-icon">
          {{ reportInfoExpanded ? '▼' : '▶' }}
        </span>
      </div>
      
      <div v-show="reportInfoExpanded" class="section-content">
        <div class="form-row">
          <div class="form-group">
            <label>出险时间 <span class="required">*</span></label>
            <input 
              type="datetime-local" 
              v-model="caseInfo.accidentTime" 
              ref="accidentTime"
              :class="{ 'input-error': validationErrors.accidentTime }"
              class="form-input"
            />
            <span v-if="validationErrors.accidentTime" class="error-message">
              {{ validationErrors.accidentTime }}
            </span>
          </div>
          
          <div class="form-group">
            <label>报案时间 <span class="required">*</span></label>
            <input 
              type="datetime-local" 
              v-model="caseInfo.reportTime" 
              ref="reportTime"
              :class="{ 'input-error': validationErrors.reportTime }"
              class="form-input"
            />
            <span v-if="validationErrors.reportTime" class="error-message">
              {{ validationErrors.reportTime }}
            </span>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>是否现场报案 <span class="required">*</span></label>
            <div class="radio-group">
              <label class="radio-label">
                <input 
                  type="radio" 
                  v-model="caseInfo.isfirstsiteFlag" 
                  value="1"
                  @change="validateField('isfirstsiteFlag')"
                /> 是
              </label>
              <label class="radio-label">
                <input 
                  type="radio" 
                  v-model="caseInfo.isfirstsiteFlag" 
                  value="0"
                  @change="validateField('isfirstsiteFlag')"
                /> 否
              </label>
            </div>
            <span v-if="validationErrors.isfirstsiteFlag" class="error-message">
              {{ validationErrors.isfirstsiteFlag }}
            </span>
          </div>
          
          <div class="form-group">
            <label>天气情况 <span class="required">*</span></label>
            <select 
              v-model="caseInfo.weatherSituation" 
              ref="weatherSituation"
              :class="{ 'input-error': validationErrors.weatherSituation }"
              class="form-input"
            >
              <option value="">请选择</option>
              <option value="0">晴</option>
              <option value="1">阴</option>
              <option value="2">雨</option>
              <option value="3">雪</option>
              <option value="4">雾</option>
              <option value="9">其他</option>
            </select>
            <span v-if="validationErrors.weatherSituation" class="error-message">
              {{ validationErrors.weatherSituation }}
            </span>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group full-width">
            <label>出险地点 <span class="required">*</span></label>
            <div class="address-inputs">
              <select 
                v-model="caseInfo.areaProvince" 
                ref="areaProvince"
                :class="{ 'input-error': validationErrors.areaProvince }"
                class="form-input select-sm"
              >
                <option value="">请选择省</option>
                <option value="11">北京市</option>
                <option value="31">上海市</option>
                <option value="33">浙江省</option>
              </select>
              
              <select 
                v-model="caseInfo.areaCity" 
                ref="areaCity"
                :class="{ 'input-error': validationErrors.areaCity }"
                class="form-input select-sm"
              >
                <option value="">请选择市</option>
              </select>
              
              <select 
                v-model="caseInfo.areaDistrict" 
                ref="areaDistrict"
                :class="{ 'input-error': validationErrors.areaDistrict }"
                class="form-input select-sm"
              >
                <option value="">请选择区</option>
              </select>
              
              <input 
                type="text" 
                v-model="caseInfo.damageAddress" 
                ref="damageAddress"
                :class="{ 'input-error': validationErrors.damageAddress }"
                placeholder="详细地址"
                class="form-input"
              />
            </div>
            <span v-if="validationErrors.damageAddress" class="error-message">
              {{ validationErrors.damageAddress }}
            </span>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>险因类型 <span class="required">*</span></label>
            <select 
              v-model="caseInfo.lsType" 
              ref="lsType"
              :class="{ 'input-error': validationErrors.lsType }"
              class="form-input"
            >
              <option value="">请选择</option>
              <option value="01">碰撞</option>
              <option value="02">倾覆</option>
              <option value="03">火灾</option>
              <option value="04">爆炸</option>
              <option value="05">盗抢</option>
            </select>
            <span v-if="validationErrors.lsType" class="error-message">
              {{ validationErrors.lsType }}
            </span>
          </div>
          
          <div class="form-group">
            <label>保险事故分类 <span class="required">*</span></label>
            <select 
              v-model="caseInfo.damageCode" 
              ref="damageCode"
              :class="{ 'input-error': validationErrors.damageCode }"
              class="form-input"
            >
              <option value="">请选择</option>
              <option value="01">单方事故</option>
              <option value="02">双方事故</option>
              <option value="03">多方事故</option>
            </select>
            <span v-if="validationErrors.damageCode" class="error-message">
              {{ validationErrors.damageCode }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 车辆信息区块 ============ -->
    <section class="form-section" id="section-vehicleInfo">
      <div class="section-header" @click="toggleSection('vehicleInfo')">
        <h3>🚗 车辆信息</h3>
        <span class="toggle-icon">
          {{ vehicleInfoExpanded ? '▼' : '▶' }}
        </span>
      </div>
      
      <div v-show="vehicleInfoExpanded" class="section-content">
        <div class="form-row">
          <div class="form-group">
            <label>标的车车牌 <span class="required">*</span></label>
            <input 
              type="text" 
              v-model="caseInfo.licenseNumber" 
              ref="licenseNumber"
              :class="{ 'input-error': validationErrors.licenseNumber }"
              class="form-input"
              placeholder="如：京 A12345"
            />
            <span v-if="validationErrors.licenseNumber" class="error-message">
              {{ validationErrors.licenseNumber }}
            </span>
          </div>
          
          <div class="form-group">
            <label>发动机号 <span class="required">*</span></label>
            <input 
              type="text" 
              v-model="caseInfo.engineNumber" 
              ref="engineNumber"
              :class="{ 'input-error': validationErrors.engineNumber }"
              class="form-input"
            />
            <span v-if="validationErrors.engineNumber" class="error-message">
              {{ validationErrors.engineNumber }}
            </span>
          </div>
          
          <div class="form-group">
            <label>车架号 <span class="required">*</span></label>
            <input 
              type="text" 
              v-model="caseInfo.frameNumber" 
              ref="frameNumber"
              :class="{ 'input-error': validationErrors.frameNumber }"
              class="form-input"
            />
            <span v-if="validationErrors.frameNumber" class="error-message">
              {{ validationErrors.frameNumber }}
            </span>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>驾驶员姓名 <span class="required">*</span></label>
            <input 
              type="text" 
              v-model="caseInfo.driverName" 
              ref="driverName"
              :class="{ 'input-error': validationErrors.driverName }"
              class="form-input"
            />
            <span v-if="validationErrors.driverName" class="error-message">
              {{ validationErrors.driverName }}
            </span>
          </div>
          
          <div class="form-group">
            <label>驾驶员证件类型</label>
            <select v-model="caseInfo.driverCertType" class="form-input">
              <option value="">请选择</option>
              <option value="124001">身份证</option>
              <option value="124002">护照</option>
              <option value="124003">驾驶证</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>驾驶员证件号码</label>
            <input 
              type="text" 
              v-model="caseInfo.driverCertNo" 
              class="form-input"
            />
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>车辆能否正常行驶 <span class="required">*</span></label>
            <div class="radio-group">
              <label class="radio-label">
                <input 
                  type="radio" 
                  v-model="caseInfo.vehicleCanRun" 
                  value="1"
                /> 能
              </label>
              <label class="radio-label">
                <input 
                  type="radio" 
                  v-model="caseInfo.vehicleCanRun" 
                  value="0"
                /> 不能
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 联系人信息区块 ============ -->
    <section class="form-section" id="section-contactInfo">
      <div class="section-header" @click="toggleSection('contactInfo')">
        <h3>👤 联系人信息</h3>
        <span class="toggle-icon">
          {{ contactInfoExpanded ? '▼' : '▶' }}
        </span>
      </div>
      
      <div v-show="contactInfoExpanded" class="section-content">
        <div class="form-row">
          <div class="form-group">
            <label>报案人姓名 <span class="required">*</span></label>
            <input 
              type="text" 
              v-model="caseInfo.reportorName" 
              ref="reportorName"
              :class="{ 'input-error': validationErrors.reportorName }"
              class="form-input"
            />
            <span v-if="validationErrors.reportorName" class="error-message">
              {{ validationErrors.reportorName }}
            </span>
          </div>
          
          <div class="form-group">
            <label>报案电话 <span class="required">*</span></label>
            <input 
              type="text" 
              v-model="caseInfo.reportorPhonenumber" 
              ref="reportorPhonenumber"
              :class="{ 'input-error': validationErrors.reportorPhonenumber }"
              class="form-input"
              placeholder="手机号或固定电话"
            />
            <span v-if="validationErrors.reportorPhonenumber" class="error-message">
              {{ validationErrors.reportorPhonenumber }}
            </span>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>现场联系人姓名 <span class="required">*</span></label>
            <input 
              type="text" 
              v-model="caseInfo.linkerName" 
              ref="linkerName"
              :class="{ 'input-error': validationErrors.linkerName }"
              class="form-input"
            />
            <span v-if="validationErrors.linkerName" class="error-message">
              {{ validationErrors.linkerName }}
            </span>
          </div>
          
          <div class="form-group">
            <label>现场联系人电话 <span class="required">*</span></label>
            <input 
              type="text" 
              v-model="caseInfo.linkerPhone" 
              ref="linkerPhone"
              :class="{ 'input-error': validationErrors.linkerPhone }"
              class="form-input"
            />
            <span v-if="validationErrors.linkerPhone" class="error-message">
              {{ validationErrors.linkerPhone }}
            </span>
          </div>
          
          <div class="form-group">
            <label>联系人手机</label>
            <input 
              type="text" 
              v-model="caseInfo.linkerMobile" 
              class="form-input"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 财产损失区块 ============ -->
    <section class="form-section" id="section-propertyLoss">
      <div class="section-header" @click="toggleSection('propertyLoss')">
        <h3>💰 财产损失</h3>
        <span class="toggle-icon">
          {{ propertyLossExpanded ? '▼' : '▶' }}
        </span>
      </div>
      
      <div v-show="propertyLossExpanded" class="section-content">
        <div class="form-row">
          <div class="form-group">
            <label>是否财产损失 <span class="required">*</span></label>
            <div class="radio-group">
              <label class="radio-label">
                <input 
                  type="radio" 
                  v-model="caseInfo.propFlag" 
                  value="0"
                /> 无
              </label>
              <label class="radio-label">
                <input 
                  type="radio" 
                  v-model="caseInfo.propFlag" 
                  value="1"
                /> 有
              </label>
            </div>
          </div>
        </div>
        
        <div v-if="caseInfo.propFlag === '1'" class="property-loss-list">
          <div v-for="(item, index) in propertyLossList" :key="index" class="loss-item">
            <div class="form-row">
              <div class="form-group">
                <label>财产名称</label>
                <input 
                  type="text" 
                  v-model="item.propertyName" 
                  class="form-input"
                />
              </div>
              
              <div class="form-group">
                <label>归属</label>
                <select v-model="item.identityRec" class="form-input">
                  <option value="">请选择</option>
                  <option value="0">第三者物损</option>
                  <option value="1">车上货物</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>损失情况</label>
                <input 
                  type="text" 
                  v-model="item.lossSituation" 
                  class="form-input"
                />
              </div>
              
              <div class="form-group">
                <label>&nbsp;</label>
                <button 
                  type="button" 
                  @click="removePropertyLoss(index)"
                  class="btn-remove"
                >
                  删除
                </button>
              </div>
            </div>
          </div>
          
          <button 
            type="button" 
            @click="addPropertyLoss"
            class="btn-add"
          >
            + 添加财产损失
          </button>
        </div>
      </div>
    </section>

    <!-- ============ 人员伤亡区块 ============ -->
    <section class="form-section" id="section-personInjury">
      <div class="section-header" @click="toggleSection('personInjury')">
        <h3>🏥 人员伤亡</h3>
        <span class="toggle-icon">
          {{ personInjuryExpanded ? '▼' : '▶' }}
        </span>
      </div>
      
      <div v-show="personInjuryExpanded" class="section-content">
        <div class="form-row">
          <div class="form-group">
            <label>是否人员伤亡 <span class="required">*</span></label>
            <div class="radio-group">
              <label class="radio-label">
                <input 
                  type="radio" 
                  v-model="caseInfo.woundFlag" 
                  value="0"
                /> 无
              </label>
              <label class="radio-label">
                <input 
                  type="radio" 
                  v-model="caseInfo.woundFlag" 
                  value="1"
                /> 有
              </label>
            </div>
          </div>
          
          <div class="form-group">
            <label>是否叫救护车</label>
            <div class="radio-group">
              <label class="radio-label">
                <input 
                  type="radio" 
                  v-model="caseInfo.isambulance" 
                  value="1"
                /> 是
              </label>
              <label class="radio-label">
                <input 
                  type="radio" 
                  v-model="caseInfo.isambulance" 
                  value="0"
                /> 否
              </label>
            </div>
          </div>
        </div>
        
        <div v-if="caseInfo.woundFlag === '1'" class="person-injury-list">
          <div v-for="(item, index) in personInjuryList" :key="index" class="injury-item">
            <div class="form-row">
              <div class="form-group">
                <label>姓名</label>
                <input 
                  type="text" 
                  v-model="item.name" 
                  class="form-input"
                />
              </div>
              
              <div class="form-group">
                <label>归属</label>
                <select v-model="item.owncar" class="form-input">
                  <option value="">请选择</option>
                  <option value="0">第三者</option>
                  <option value="1">车上人员</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>伤亡情况</label>
                <select v-model="item.persionpayType" class="form-input">
                  <option value="">请选择</option>
                  <option value="0">轻伤</option>
                  <option value="1">重伤</option>
                  <option value="2">残废</option>
                  <option value="3">死亡</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>&nbsp;</label>
                <button 
                  type="button" 
                  @click="removePersonInjury(index)"
                  class="btn-remove"
                >
                  删除
                </button>
              </div>
            </div>
          </div>
          
          <button 
            type="button" 
            @click="addPersonInjury"
            class="btn-add"
          >
            + 添加人员伤亡
          </button>
        </div>
      </div>
    </section>

    <!-- ============ 事故救援区块 ============ -->
    <section class="form-section" id="section-accidentRescue">
      <div class="section-header" @click="toggleSection('accidentRescue')">
        <h3>🚑 事故救援</h3>
        <span class="toggle-icon">
          {{ accidentRescueExpanded ? '▼' : '▶' }}
        </span>
      </div>
      
      <div v-show="accidentRescueExpanded" class="section-content">
        <div class="form-row">
          <div class="form-group">
            <label>标的车能否正常行驶</label>
            <div class="radio-group">
              <label class="radio-label">
                <input 
                  type="radio" 
                  v-model="rescueInfo[0].isNormalRun" 
                  value="1"
                /> 能
              </label>
              <label class="radio-label">
                <input 
                  type="radio" 
                  v-model="rescueInfo[0].isNormalRun" 
                  value="0"
                /> 不能
              </label>
            </div>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>三者车能否正常行驶</label>
            <div class="radio-group">
              <label class="radio-label">
                <input 
                  type="radio" 
                  v-model="rescueInfo[1].isNormalRun" 
                  value="1"
                /> 能
              </label>
              <label class="radio-label">
                <input 
                  type="radio" 
                  v-model="rescueInfo[1].isNormalRun" 
                  value="0"
                /> 不能
              </label>
            </div>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>救援选项</label>
            <div class="checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="rescueInfo[0].fiftyKm" /> 拖车 50KM 内
              </label>
              <label class="checkbox-label">
                <input type="checkbox" v-model="caseInfo.isLocalSurey" /> 需现场查勘
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 案件补充说明区块 ============ -->
    <section class="form-section" id="section-caseDesc">
      <div class="section-header" @click="toggleSection('caseDesc')">
        <h3>📄 案件补充说明</h3>
        <span class="toggle-icon">
          {{ caseDescExpanded ? '▼' : '▶' }}
        </span>
      </div>
      
      <div v-show="caseDescExpanded" class="section-content">
        <div class="form-group full-width">
          <label>补充说明内容</label>
          <textarea 
            v-model="caseInfo.caseDesc" 
            rows="4"
            class="form-input textarea"
            placeholder="请输入案件补充说明..."
          ></textarea>
        </div>
        
        <div class="case-desc-list">
          <div v-for="(item, index) in caseDescList" :key="index" class="desc-item">
            <div class="form-row">
              <div class="form-group">
                <label>时间</label>
                <input 
                  type="datetime-local" 
                  v-model="item.disposeTime" 
                  class="form-input"
                />
              </div>
              
              <div class="form-group">
                <label>操作员</label>
                <input 
                  type="text" 
                  v-model="item.usercode" 
                  class="form-input"
                  readonly
                />
              </div>
              
              <div class="form-group full-width">
                <label>内容</label>
                <textarea 
                  v-model="item.context" 
                  rows="2"
                  class="form-input textarea"
                ></textarea>
              </div>
              
              <div class="form-group">
                <label>&nbsp;</label>
                <button 
                  type="button" 
                  @click="removeCaseDesc(index)"
                  class="btn-remove"
                >
                  删除
                </button>
              </div>
            </div>
          </div>
          
          <button 
            type="button" 
            @click="addCaseDesc"
            class="btn-add"
          >
            + 添加补充说明
          </button>
        </div>
      </div>
    </section>

    <!-- ============ 表单底部按钮 ============ -->
    <div class="form-actions">
      <button type="button" @click="validateAndSubmit" class="btn-submit">
        ✓ 提交
      </button>
      <button type="button" @click="handleSave" class="btn-save">
        💾 暂存
      </button>
      <button type="button" @click="handleTransfer" class="btn-transfer">
        📋 转专岗处理
      </button>
      <!-- <button type="button" @click="expandAll" class="btn-secondary">
        ⊞ 全部展开
      </button>
      <button type="button" @click="collapseAll" class="btn-secondary">
        ⊟ 全部折叠
      </button> -->
    </div>

    <!-- ============ 全局错误提示 ============ -->
    <div v-if="globalError" class="global-error-toast">
      {{ globalError }}
    </div>

  </div>
</template>

<script>
// 引入校验工具和定位工具
import { validateForm, requiredFields } from '@/utils/validation'
import { scrollToElement, highlightError, showError } from '@/utils/domUtils'

export default {
  name: 'CaseInfoForm',
  props: {
    caseInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // ============ 折叠/展开状态 ============
      policyInfoExpanded: true,
      reportInfoExpanded: true,
      vehicleInfoExpanded: true,
      propertyLossExpanded: false,
      personInjuryExpanded: false,
      accidentRescueExpanded: false,
      contactInfoExpanded: true,
      caseDescExpanded: false,
      
      // ============ 校验错误信息 ============
      validationErrors: {},
      globalError: '',
      
      // ============ 动态列表数据 ============
      propertyLossList: [],
      personInjuryList: [],
      caseDescList: [],
      rescueInfo: [
        { isNormalRun: '', fiftyKm: false },
        { isNormalRun: '', fiftyKm: false }
      ]
    }
  },
  methods: {
    // ============ 折叠/展开切换方法 ============
    toggleSection(section) {
      const sectionKey = `${section}Expanded`
      this[sectionKey] = !this[sectionKey]
    },

    // ============ 全部展开 ============
    expandAll() {
      Object.keys(this.$data).forEach(key => {
        if (key.endsWith('Expanded')) {
          this[key] = true
        }
      })
    },

    // ============ 全部折叠 ============
    collapseAll() {
      Object.keys(this.$data).forEach(key => {
        if (key.endsWith('Expanded')) {
          this[key] = false
        }
      })
    },

    // ============ 单个字段校验 ============
    validateField(fieldName) {
      const fieldConfig = requiredFields[fieldName]
      if (!fieldConfig) return

      const value = this.caseInfo[fieldName]
      const errors = validateForm({ [fieldName]: value }, { [fieldName]: fieldConfig })
      
      if (errors[fieldName]) {
        this.validationErrors[fieldName] = errors[fieldName]
      } else {
        delete this.validationErrors[fieldName]
      }
    },

    // ============ 校验并提交（核心方法） ============
    async validateAndSubmit() {
      // 1. 清除之前的错误
      this.validationErrors = {}
      this.globalError = ''
      this.clearErrorHighlights()

      // 2. 执行表单校验
      const errors = validateForm(this.caseInfo, requiredFields)

      // 3. 如果有错误，定位到第一个错误字段
      if (Object.keys(errors).length > 0) {
        this.validationErrors = errors
        
        // 展开包含错误字段的区块
        this.expandSectionsWithErrors(errors)
        
        // 等待 DOM 更新后滚动定位
        await this.$nextTick()
        
        // 滚动到第一个错误字段
        this.scrollToFirstError(errors)
        
        // 显示错误提示
        this.globalError = '请完善以下必填信息，共 ' + Object.keys(errors).length + ' 项'
        setTimeout(() => {
          this.globalError = ''
        }, 5000)
        
        return false
      }

      // 4. 校验通过，提交表单
      this.$emit('submit', this.caseInfo)
      return true
    },

    // ============ 展开包含错误的区块 ============
    expandSectionsWithErrors(errors) {
      const fieldSectionMap = {
        policyNo: 'policyInfo',
        accidentTime: 'reportInfo',
        reportTime: 'reportInfo',
        isfirstsiteFlag: 'reportInfo',
        weatherSituation: 'reportInfo',
        damageAddress: 'reportInfo',
        areaProvince: 'reportInfo',
        areaCity: 'reportInfo',
        areaDistrict: 'reportInfo',
        lsType: 'reportInfo',
        damageCode: 'reportInfo',
        licenseNumber: 'vehicleInfo',
        engineNumber: 'vehicleInfo',
        frameNumber: 'vehicleInfo',
        driverName: 'vehicleInfo',
        vehicleCanRun: 'vehicleInfo',
        reportorName: 'contactInfo',
        reportorPhonenumber: 'contactInfo',
        linkerName: 'contactInfo',
        linkerPhone: 'contactInfo',
        propFlag: 'propertyLoss',
        woundFlag: 'personInjury'
      }
      
      const sectionsToExpand = new Set()
      Object.keys(errors).forEach(field => {
        const section = fieldSectionMap[field]
        if (section) {
          sectionsToExpand.add(section)
        }
      })
      
      sectionsToExpand.forEach(section => {
        const sectionKey = `${section}Expanded`
        this[sectionKey] = true
      })
    },

    // ============ 滚动到第一个错误字段 ============
    async scrollToFirstError(errors) {
      const firstErrorField = Object.keys(errors)[0]
      if (!firstErrorField) return

      // 等待 DOM 更新
      await this.$nextTick()

      // 获取字段引用
      const element = this.$refs[firstErrorField]
      if (element) {
        // 滚动到错误位置
        scrollToElement(element, 100)
        // 高亮错误字段
        highlightError(element)
      }
    },

    // ============ 清除错误高亮 ============
    clearErrorHighlights() {
      Object.keys(this.$refs).forEach(ref => {
        const element = this.$refs[ref]
        if (element && element.classList) {
          element.classList.remove('input-error')
        }
      })
    },

    // ============ 暂存 ============
    handleSave() {
      this.$emit('save', this.caseInfo)
    },

    // ============ 转专岗 ============
    handleTransfer() {
      this.$emit('transfer', this.caseInfo)
    },

    // ============ 添加/删除财产损失 ============
    addPropertyLoss() {
      this.propertyLossList.push({
        propertyName: '',
        identityRec: '',
        lossSituation: ''
      })
    },
    removePropertyLoss(index) {
      this.propertyLossList.splice(index, 1)
    },

    // ============ 添加/删除人员伤亡 ============
    addPersonInjury() {
      this.personInjuryList.push({
        name: '',
        owncar: '',
        persionpayType: '',
        sex: '',
        doctorNo: '0',
        hospital: ''
      })
    },
    removePersonInjury(index) {
      this.personInjuryList.splice(index, 1)
    },

    // ============ 添加/删除案件补充说明 ============
    addCaseDesc() {
      this.caseDescList.push({
        disposeTime: new Date().toISOString().slice(0, 16),
        usercode: '当前用户',
        context: ''
      })
    },
    removeCaseDesc(index) {
      this.caseDescList.splice(index, 1)
    },
// ============ 导航到指定区块 ============
navigateToSection(section) {
  console.log('导航到区块:', section)
  
  const sectionKey = `${section}Expanded`
  
  // 修复：使用 Object.prototype.hasOwnProperty.call 替代 this.hasOwnProperty
  if (Object.prototype.hasOwnProperty.call(this, sectionKey)) {
    // 展开目标区块
    this[sectionKey] = true
    
    // 等待 DOM 更新后滚动
    this.$nextTick(() => {
      const sectionElement = document.getElementById(`section-${section}`)
      if (sectionElement) {
        console.log('找到区块元素:', sectionElement)
        
        // 获取滚动容器（.main-content）
        const container = document.querySelector('.main-content')
        
        if (container) {
          // 计算滚动位置
          const offsetPosition = sectionElement.offsetTop - 50
          container.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        } else {
          // 降级方案：使用 window 滚动
          window.scrollTo({
            top: sectionElement.offsetTop - 50,
            behavior: 'smooth'
          })
        }
      } else {
        console.error('未找到区块元素:', `section-${section}`)
      }
    })
  } else {
    console.error('无效的区块:', section, sectionKey)
  }
}
  }
}
</script>

<style scoped>
/* ============ 必填标识样式 ============ */
.required {
  color: #ff4d4f;
  margin-left: 4px;
}

/* ============ 错误输入框样式 ============ */
.input-error {
  border: 2px solid #ff4d4f !important;
  background-color: #fff1f0;
}

.input-error:focus {
  border-color: #ff4d4f !important;
  box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2) !important;
}

/* ============ 错误提示文字样式 ============ */
.error-message {
  display: block;
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 4px;
}

/* ============ 全局错误提示 ============ */
.global-error-toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff4d4f;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  z-index: 9999;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* ============ 表单组样式 ============ */
.form-group {
  margin-bottom: 16px;
  flex: 1;
}

.form-group.full-width {
  flex: 100%;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
}

.form-input[readonly] {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.textarea {
  resize: vertical;
  min-height: 80px;
}

.select-sm {
  width: auto;
  min-width: 120px;
}

/* ============ 表单行样式 ============ */
.form-row {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.address-inputs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.address-inputs .form-input {
  flex: 1;
  min-width: 100px;
}

/* ============ 单选/复选框样式 ============ */
.radio-group,
.checkbox-group {
  display: flex;
  gap: 16px;
  align-items: center;
}

.radio-label,
.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #333;
}

.radio-label input,
.checkbox-label input {
  margin-right: 6px;
}

/* ============ 区块样式 ============ */
.form-section {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #f8f9fa;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.2s;
}

.section-header:hover {
  background-color: #e8f4fc;
}

.section-header h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.toggle-icon {
  font-size: 14px;
  font-weight: bold;
  color: #666;
  transition: transform 0.3s ease;
  user-select: none;
}

.section-content {
  padding: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* ============ 按钮样式 ============ */
.form-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
  flex-wrap: wrap;
}

.btn-submit {
  padding: 10px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-submit:hover {
  background-color: #0056b3;
}

.btn-save {
  padding: 10px 24px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-save:hover {
  background-color: #545b62;
}

.btn-transfer {
  padding: 10px 24px;
  background-color: #fd7e14;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-transfer:hover {
  background-color: #e06a00;
}

.btn-secondary {
  padding: 10px 24px;
  background-color: #e9ecef;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-secondary:hover {
  background-color: #dee2e6;
}

.btn-add {
  padding: 8px 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  margin-top: 10px;
}

.btn-add:hover {
  background-color: #218838;
}

.btn-remove {
  padding: 6px 12px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.btn-remove:hover {
  background-color: #c82333;
}

/* ============ 动态列表样式 ============ */
.property-loss-list,
.person-injury-list,
.case-desc-list {
  margin-top: 16px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.loss-item,
.injury-item,
.desc-item {
  padding: 12px;
  margin-bottom: 12px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.loss-item:last-child,
.injury-item:last-child,
.desc-item:last-child {
  margin-bottom: 0;
}

/* ============ 响应式适配 ============ */
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }
  
  .address-inputs {
    flex-direction: column;
  }
  
  .address-inputs .form-input {
    width: 100%;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .form-actions button {
    width: 100%;
  }
}
</style>