  <!-- src/components/CaseInfoForm.vue -->
<template>
  <div class="case-info-form">
    <!-- ============ 保单信息区块 ============ -->
    <section class="form-section-policy" id="section-policyInfo">
      <div class="section-header no-border">
        <div class="section-header-left">
          <!-- 主题色竖条装饰 -->
          <div class="section-decorator"></div>
          <h3>保单信息</h3>
          <!-- 已选择保单标签 -->
          <el-tag type="primary" size="small" class="selected-count-tag">
            已选择 {{ selectedPoliciesCount }} 份保单
          </el-tag>
        </div>
        <div class="section-header-right">
          <!-- 信息展示按钮 -->
          <button type="button" class="btn-info-display" @click="toggleInfoDisplay">
            <i class="iconfont icon-yanjing"></i>
            {{ infoDisplayExpanded ? '收起详情' : '信息展示' }}
          </button>
          <span class="toggle-icon" @click="toggleInfoDisplay">
            <i :class="infoDisplayExpanded ? 'iconfont icon-arrow-down' : 'iconfont icon-shouqi'"></i>
          </span>
        </div>
      </div>

      <div v-show="policyInfoExpanded" class="section-content">
        <!-- 保单卡片列表 -->
        <div class="policy-cards-container">
          <div v-for="(policy, index) in policies" :key="policy.policyNo"
            :class="['policy-card', { 'selected': policy.selected, 'hovered': policy.hovered }]"
            @click="selectPolicy(policy, $event)" @mouseenter="policy.hovered = true"
            @mouseleave="policy.hovered = false">
            <!-- 顶部信息行 -->
            <div class="policy-header">
              <div class="policy-number-wrapper">
                <!-- 复选框 -->
                <input type="checkbox" :checked="policy.selected" class="checkbox-input"
                  @click.stop="togglePolicySelection(policy)" />
                <div class="policy-info">
                  <!-- 保单号链接 -->
                  <a href="#" class="policy-no-link" @click.prevent="handlePolicyClick(policy.policyNo)">
                    {{ policy.policyNo }}
                  </a>

                  <!-- 客户信息标签 - 在保单号下方 -->
                  <div class="policy-tags-row">
                    <el-tag type="info" size="small" class="policy-tag">
                      {{ policy.customerTag }}
                    </el-tag>
                    <el-tag type="warning" size="small" class="policy-tag">
                      {{ policy.customerLevel }}
                    </el-tag>
                  </div>
                </div>
              </div>

              <!-- 险种名称标签 - 右上角 -->
              <div class="policy-title">
                <el-tag type="success" size="medium" class="insurance-name-tag">
                  {{ truncateText(policy.insuranceName, 15) }}
                </el-tag>
                <span class="toggle-icon" @click.stop="togglePolicyBodyByIndex(index)">
                  <i :class="policy.bodyExpanded ? 'iconfont icon-arrow-down' : 'iconfont icon-shouqi'"></i>
                </span>
              </div>
            </div>

            <!-- 主体信息网格 -->
            <div class="policy-body" v-show="policy.bodyExpanded" :id="'policyBody-' + index">
              <!-- 第 1 行：3 个字段 -->
              <div class="info-item">
                <label><i class="iconfont icon-yonghu"></i> 投保人名称</label>
                <div class="value">{{ policy.appliName }}</div>
              </div>
              <div class="info-item">
                <label><i class="iconfont icon-yonghu"></i> 被保人名称</label>
                <div class="value">{{ policy.insuredName }}</div>
              </div>
              <div class="info-item">
                <label><i class="iconfont icon-shield"></i> 代理人名称</label>
                <div class="value">{{ policy.agentName }}</div>
              </div>

              <!-- 第 2 行：3 个字段 -->
              <div class="info-item">
                <label><i class="iconfont icon-wendang"></i> 险种名称</label>
                <div class="value">{{ policy.insuranceName }}</div>
              </div>
              <div class="info-item">
                <label><i class="iconfont icon-shijiankaishishijian"></i> 保险起期</label>
                <div class="value">{{ policy.policyStartDateStr }}</div>
              </div>
              <div class="info-item">
                <label><i class="iconfont icon-shijiankaishishijian"></i> 保险止期</label>
                <div class="value">{{ policy.policyEndDateStr }}</div>
              </div>

              <!-- 第 3 行：3 个字段 -->
              <div class="info-item">
                <label><i class="iconfont icon-shijiankaishishijian"></i> 保险日期止期</label>
                <div class="value">{{ policy.policyEndDateStr }}</div>
              </div>
              <div class="info-item">
                <label><i class="iconfont icon-jigou"></i> 承保机构</label>
                <div class="value">{{ policy.insurerName }}</div>
              </div>
              <div class="info-item">
                <label><i class="iconfont icon-commpany"></i> 工作单位</label>
                <div class="value">{{ policy.workUnit || '-' }}</div>
              </div>

              <!-- 第 4 行：3 个字段 -->
              <div class="info-item">
                <label><i class="iconfont icon-dingwei"></i> 客户来源</label>
                <div class="value">{{ policy.customerSource || '-' }}</div>
              </div>
              <div class="info-item">
                <label><i class="iconfont icon-yonghu"></i> 客户标识</label>
                <div class="value">{{ policy.customerTag || '-' }}</div>
              </div>
              <div class="info-item">
                <label><i class="iconfont icon-shoucang"></i> 客户等级</label>
                <div class="value">{{ policy.customerLevel || '-' }}</div>
              </div>

              <!-- 第 5 行：3 个字段 -->
              <div class="info-item">
                <label><i class="iconfont icon-yonghu"></i> 专员名称</label>
                <div class="value">{{ policy.specialistName || '-' }}</div>
              </div>
              <div class="info-item">
                <label><i class="iconfont icon-Telephone"></i> 专员电话</label>
                <div class="value">{{ policy.specialistPhone || '-' }}</div>
              </div>
              <div class="info-item">
                <label><i class="iconfont icon-shoucang"></i> 服务等级</label>
                <div class="value">{{ policy.serviceLevel || '-' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 历史报案记录区块 ============ -->
    <section class="policy-card" id="section-historyReport">
      <div class="section-header-other no-border">
        <h3><i class="icon-history"></i> 历史报案记录</h3>
        <span class="record-count">{{ historyReports.length }} 条记录</span>
        <span class="toggle-icon" @click="toggleSection('historyReport')">
          <i :class="historyReportExpanded ? 'iconfont icon-arrow-down' : 'iconfont icon-shouqi'"></i>
        </span>
      </div>

      <div v-show="historyReportExpanded" class="section-content">
        <div class="report-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th class="col-seq">序号</th>
                <th class="col-report-no">报案号</th>
                <th class="col-policy-no">保单号</th>
                <th class="col-accident-time">出险时间</th>
                <th class="col-report-time">报案时间</th>
                <th class="col-reporter">报案人</th>
                <th class="col-fast-claim">快赔案件编号</th>
                <th class="col-status">状态</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in historyReports" :key="index" class="table-row">
                <td class="seq-center"> {{ index + 1 }}</td>
                <td>
                  <a href="#" class="report-link" @click.prevent="handleReportClick(item.reportNo)">
                    {{ item.reportNo }}
                    <svg t="1773716425571" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="45920" width="10" height="10">
                      <path
                        d="M783.530667 861.013333H162.901333V240.554667h310.272V162.986667H85.333333V938.666667h775.68V550.826667h-77.482666z"
                        fill="#3B4DAA" p-id="45921"></path>
                      <path
                        d="M550.826667 85.333333v77.653334h255.146666L407.296 562.346667l54.272 54.357333 399.530667-398.677333v255.146666H938.666667V85.333333z"
                        fill="#3B4DAA" p-id="45922"></path>
                    </svg>
                  </a>
                </td>
                <td>{{ item.policyNo }}</td>
                <td>{{ item.accidentTime }}</td>
                <td>{{ item.reportTime }}</td>
                <td>{{ item.reporter }}</td>
                <td><span class="empty-cell">-</span></td>
                <td>
                  <el-tag type="success" size="small" class="status-tag">已提交</el-tag>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ============ 报案信息区块 ============ -->
    <section class="policy-card" id="section-reportInfo">
      <div class="section-header-other no-border">
        <h3><i class=" iconfont icon-bianji-wenjian-bianji" style="color: #3B4DAA ;"></i> 报案信息</h3>
      </div>

      <div v-show="reportInfoExpanded" class="section-content">
        <!-- 第一行：出险时间 & 报案时间 -->
        <div class="contact-form-row">
          <!-- 出险时间 - 使用 ElDatePicker -->
          <div class="form-group">
            <label><i class="iconfont icon-shijiankaishishijian"></i> 出险时间 </label>
            <el-date-picker v-model="caseInfo.accidentTime" type="datetime" format="YYYY/MM/DD HH:mm:ss"
              value-format="YYYY/MM/DD HH:mm:ss" :disabled-date="disabledFutureDate" :disabled-hours="disabledHours"
              :disabled-minutes="disabledMinutes" :disabled-seconds="disabledSeconds"
              @focus="setOperatingField('accidentTime')" @blur="resetOperatingField" placeholder="选择出险时间"
              prefix-icon="_" clear-icon="_" @change="onFieldInput('accidentTime')"
              :class="{ 'input-error': validationErrors.accidentTime }" style="width: 100%;">
            </el-date-picker>
            <span v-if="validationErrors.accidentTime" class="error-message">
              {{ validationErrors.accidentTime }}
            </span>
          </div>

          <!-- 报案时间 - 同样可以使用 ElDatePicker -->
          <div class="form-group">
            <label><i class="iconfont icon-shijiankaishishijian"></i> 报案时间</label>
            <el-date-picker v-model="caseInfo.reportTime" type="datetime" format="YYYY/MM/DD HH:mm:ss"
              value-format="YYYY/MM/DD HH:mm:ss" :disabled-date="disabledFutureDate" :disabled-hours="disabledHours"
              :disabled-minutes="disabledMinutes" :disabled-seconds="disabledSeconds"
              @focus="setOperatingField('reportTime')" @blur="resetOperatingField" placeholder="选择报案时间" prefix-icon="_"
              clear-icon="_" @change="onFieldInput('reportTime')"
              :class="{ 'input-error': validationErrors.reportTime }" style="width: 100%;">
            </el-date-picker>
            <span v-if="validationErrors.reportTime" class="error-message">
              {{ validationErrors.reportTime }}
            </span>
          </div>
        </div>

        <!-- 第二行：是否现场报案、天气情况、出险地点分类 -->
        <div class="contact-form-row">
          <div class="form-group">
            <label>是否现场报案 <span class="required">*</span></label>
            <div class="radio-group">
              <label class="radio-label">
                <input type="radio" v-model="caseInfo.isfirstsiteFlag" value="1"
                  @change="onFieldInput('isfirstsiteFlag')" /> 是
              </label>
              <label class="radio-label">
                <input type="radio" v-model="caseInfo.isfirstsiteFlag" value="0"
                  @change="onFieldInput('isfirstsiteFlag')" /> 否
              </label>
            </div>
          </div>

          <div class="contact-form-group">
            <label><i class="iconfont icon-yun"></i> 天气情况</label>
            <select v-model="caseInfo.weatherSituation" ref="weatherSituation"
              @change="onFieldInput('weatherSituation')" :class="{ 'input-error': validationErrors.weatherSituation }"
              class="form-input select-sm">
              <option value="">请选择</option>
              <option value="0">晴</option>
              <option value="1">阴</option>
              <option value="2">雨</option>
              <option value="3">雪</option>
              <option value="4">雾</option>
              <option value="9">其他</option>
            </select>
          </div>

          <div class="contact-form-group">
            <label><i class="iconfont icon-tishi"></i> 出险地点分类 </label>
            <select v-model="caseInfo.damageLocationType" ref="damageLocationType"
              @change="onFieldInput('damageLocationType')"
              :class="{ 'input-error': validationErrors.damageLocationType }" class="form-input select-sm">
              <option value="">请选择</option>
              <option value="0">道路</option>
              <option value="1">停车场</option>
              <option value="2">小区</option>
              <option value="3">其他</option>
            </select>
          </div>
        </div>

        <!-- 第三行：出险地点（省市区街道门牌号）+ 路名索检 -->
        <!-- 出险地点 -->
        <div class="form-row">
          <div class="form-group">
            <label><i class="iconfont icon-dingwei"></i> 出险地点 <span class="required">*</span></label>
            <div class="address-inputs">
              <!-- 省份选择 -->
              <select v-model="caseInfo.areaProvince" @change="onProvinceChange"
                :class="{ 'input-error': validationErrors.areaProvince }" class="form-input select-sm">
                <option value="">请选择省</option>
                <option v-for="province in provinces" :key="province.code" :value="province.code">
                  {{ province.name }}
                </option>
              </select>

              <!-- 城市选择 -->
              <select v-model="caseInfo.areaCity" @change="onCityChange" :disabled="!caseInfo.areaProvince"
                :class="{ 'input-error': validationErrors.areaCity }" class="form-input select-sm">
                <option value="">请选择市</option>
                <option v-for="city in cities[caseInfo.areaProvince] || []" :key="city.code" :value="city.code">
                  {{ city.name }}
                </option>
              </select>

              <!-- 区县选择 -->
              <select v-model="caseInfo.areaDistrict" @change="onFieldInput('damageAddress')"
                :disabled="!caseInfo.areaCity" :class="{ 'input-error': validationErrors.areaDistrict }"
                class="form-input select-sm">
                <option value="">请选择区</option>
                <option v-for="district in districts[caseInfo.areaCity] || []" :key="district.code"
                  :value="district.code">
                  {{ district.name }}
                </option>
              </select>

              <input type="text" v-model="caseInfo.street" ref="street" @input="onFieldInput('damageAddress')"
                :class="{ 'input-error': validationErrors.street }" placeholder="街道" class="form-input" />

              <input type="text" v-model="caseInfo.doorNumber" ref="doorNumber" @input="onFieldInput('damageAddress')"
                :class="{ 'input-error': validationErrors.doorNumber }" placeholder="门牌号" class="form-input" />

              <button type="button" class="btn-search" @click="searchAddress">
                <i class="iconfont icon-dingwei"></i> 路名索检
              </button>
            </div>
          </div>
          <div class="form-group">
            <label>客户提供位置信息不准</label>
            <div class="radio-group">
              <label class="radio-label">
                <input type="radio" v-model="caseInfo.upadress" value="1" @change="onFieldInput('upadress')" /> 是
              </label>
              <label class="radio-label">
                <input type="radio" v-model="caseInfo.upadress" value="0" @change="onFieldInput('upadress')" /> 否
              </label>
            </div>
          </div>
        </div>

        <!-- 第四行：经纬度 -->
        <div class="form-row">
          <div class="form-group">
            <label>经度 <span class="required">*</span></label>
            <input type="number" step="0.000001" v-model="caseInfo.longitude" ref="longitude"
              @input="onFieldInput('longitude')" :class="{ 'input-error': validationErrors.longitude }"
              class="form-input" />
          </div>

          <div class="form-group">
            <label>纬度 <span class="required">*</span></label>
            <input type="number" step="0.000001" v-model="caseInfo.latitude" ref="latitude"
              @input="onFieldInput('latitude')" :class="{ 'input-error': validationErrors.latitude }"
              class="form-input" />
          </div>
        </div>

        <!-- 第五行：车辆目前所在地 -->
        <div class="form-row" v-if="caseInfo.isfirstsiteFlag === '1' || caseInfo.isfirstsiteFlag === 1">
          <div class="form-group full-width">
            <label><i class="iconfont icon-dingwei"></i> 车辆目前所在地 <span class="required">*</span></label>
            <div class="address-inputs">
              <!-- 省份选择 -->
              <select v-model="caseInfo.currentAreaProvince" @change="onCurrentProvinceChange"
                :class="{ 'input-error': validationErrors.currentAreaProvince }" class="form-input select-sm">
                <option value="">请选择省</option>
                <option v-for="province in provinces" :key="province.code" :value="province.code">
                  {{ province.name }}
                </option>
              </select>

              <!-- 城市选择 -->
              <select v-model="caseInfo.currentAreaCity" @change="onCurrentCityChange"
                :disabled="!caseInfo.currentAreaProvince" :class="{ 'input-error': validationErrors.currentAreaCity }"
                class="form-input select-sm">
                <option value="">请选择市</option>
                <option v-for="city in cities[caseInfo.currentAreaProvince] || []" :key="city.code" :value="city.code">
                  {{ city.name }}
                </option>
              </select>

              <!-- 区县选择 -->
              <select v-model="caseInfo.currentAreaDistrict" @change="onFieldInput('currentAreaDistrict')"
                :disabled="!caseInfo.currentAreaCity" :class="{ 'input-error': validationErrors.currentAreaDistrict }"
                class="form-input select-sm">
                <option value="">请选择区</option>
                <option v-for="district in districts[caseInfo.currentAreaCity] || []" :key="district.code"
                  :value="district.code">
                  {{ district.name }}
                </option>
              </select>

              <input type="text" v-model="caseInfo.currentStreet" ref="currentStreet"
                @input="onFieldInput('currentStreet')" :class="{ 'input-error': validationErrors.currentStreet }"
                placeholder="街道" class="form-input" />

              <input type="text" v-model="caseInfo.currentDoorNumber" ref="currentDoorNumber"
                @input="onFieldInput('currentDoorNumber')"
                :class="{ 'input-error': validationErrors.currentDoorNumber }" placeholder="门牌号" class="form-input" />

              <button type="button" class="btn-search" @click="searchCurrentAddress">
                <i class="iconfont icon-dingwei"></i> 路名索检
              </button>
            </div>
          </div>
        </div>

        <!-- 第六行：车辆目前所在地经纬度 -->
        <div class="form-row" v-if="caseInfo.isfirstsiteFlag === '1' || caseInfo.isfirstsiteFlag === 1">
          <div class="form-group">
            <label>车辆目前所在地经度 <span class="required">*</span></label>
            <input type="number" step="0.000001" v-model="caseInfo.currentLongitude" ref="currentLongitude"
              @input="onFieldInput('currentLongitude')" :class="{ 'input-error': validationErrors.currentLongitude }"
              class="form-input" />
          </div>

          <div class="form-group">
            <label>车辆目前所在地纬度 <span class="required">*</span></label>
            <input type="number" step="0.000001" v-model="caseInfo.currentLatitude" ref="currentLatitude"
              @input="onFieldInput('currentLatitude')" :class="{ 'input-error': validationErrors.currentLatitude }"
              class="form-input" />
          </div>
        </div>

        <!-- 第七行：出险经过 -->
        <div class="form-row">
          <div class="form-group full-width">
            <label>出险经过 <span class="required">*</span></label>
            <textarea v-model="caseInfo.accidentDescription" @input="onFieldInput('accidentDescription')" rows="5"
              class="form-input" placeholder="请详细描述出险经过..."></textarea>
          </div>
        </div>

        <!-- 第八行：多列下拉选择 -->
        <div class="contact-form-row">
          <div class="contact-form-group">
            <label>险因类型 <span class="required">*</span></label>
            <select v-model="caseInfo.lsType" ref="lsType" @change="onFieldInput('lsType')"
              :class="{ 'input-error': validationErrors.lsType }" class="form-input select-sm">
              <option value="">请选择</option>
              <option value="01">碰撞</option>
              <option value="02">倾覆</option>
              <option value="03">火灾</option>
              <option value="04">爆炸</option>
              <option value="05">盗抢</option>
            </select>
          </div>

          <div class="contact-form-group">
            <label>保险事故分类 <span class="required">*</span></label>
            <select v-model="caseInfo.damageCode" ref="damageCode" @change="onFieldInput('damageCode')"
              :class="{ 'input-error': validationErrors.damageCode }" class="form-input select-sm">
              <option value="">请选择</option>
              <option value="01">单方事故</option>
              <option value="02">双方事故</option>
              <option value="03">多方事故</option>
            </select>
          </div>

          <div class="contact-form-group">
            <label>出险原因 <span class="required">*</span></label>
            <select v-model="caseInfo.accidentCause" ref="accidentCause" @change="onFieldInput('accidentCause')"
              :class="{ 'input-error': validationErrors.accidentCause }" class="form-input select-sm">
              <option value="">请选择</option>
              <option value="0">未按规定让行</option>
              <option value="1">违反交通信号灯</option>
              <option value="2">超速行驶</option>
              <option value="3">酒后驾驶</option>
              <option value="4">其他</option>
            </select>
          </div>

          <div class="contact-form-group">
            <label>事故处理部门 <span class="required">*</span></label>
            <select v-model="caseInfo.handleDepartment" ref="handleDepartment"
              @change="onFieldInput('handleDepartment')" :class="{ 'input-error': validationErrors.handleDepartment }"
              class="form-input select-sm">
              <option value="">请选择</option>
              <option value="0">交警</option>
              <option value="1">保险公司</option>
              <option value="2">第三方调解</option>
            </select>
          </div>
        </div>

        <!-- 第九行 -->
        <div class="contact-form-row">
          <div class="contact-form-group">
            <label>事故处理类型 <span class="required">*</span></label>
            <select v-model="caseInfo.handleType" ref="handleType" @change="onFieldInput('handleType')"
              :class="{ 'input-error': validationErrors.handleType }" class="form-input select-sm">
              <option value="">请选择</option>
              <option value="0">快赔</option>
              <option value="1">定损</option>
              <option value="2">诉讼</option>
            </select>
          </div>

          <div class="contact-form-group">
            <label>事故责任 <span class="required">*</span></label>
            <select v-model="caseInfo.responsibility" ref="responsibility" @change="onFieldInput('responsibility')"
              :class="{ 'input-error': validationErrors.responsibility }" class="form-input select-sm">
              <option value="">请选择</option>
              <option value="0">全责</option>
              <option value="1">主责</option>
              <option value="2">同责</option>
              <option value="3">次责</option>
              <option value="4">无责</option>
            </select>
          </div>

          <div class="contact-form-group">
            <label>驾驶员是否被保险人 <span class="required">*</span></label>
            <select v-model="caseInfo.driverIsInsured" ref="driverIsInsured" @change="onFieldInput('driverIsInsured')"
              :class="{ 'input-error': validationErrors.driverIsInsured }" class="form-input select-sm">
              <option value="">请选择</option>
              <option value="0">否</option>
              <option value="1">是</option>
            </select>
          </div>

          <div class="contact-form-group">
            <label>被保险人证件类型 <span class="required">*</span></label>
            <select v-model="caseInfo.insuredCertType" ref="insuredCertType" @change="onFieldInput('insuredCertType')"
              :class="{ 'input-error': validationErrors.insuredCertType }" class="form-input select-sm">
              <option value="">请选择</option>
              <option value="124001">居民身份证或驾驶证</option>
              <option value="124002">护照</option>
            </select>
          </div>
        </div>

        <!-- 第十行 -->
        <div class="contact-form-row">
          <div class="contact-form-group">
            <label>紧急程度 <span class="required">*</span></label>
            <select v-model="caseInfo.emergencyLevel" ref="emergencyLevel" @change="onFieldInput('emergencyLevel')"
              :class="{ 'input-error': validationErrors.emergencyLevel }" class="form-input select-sm">
              <option value="">请选择</option>
              <option value="0">普通</option>
              <option value="1">紧急</option>
              <option value="2">重大</option>
            </select>
          </div>

          <div class="contact-form-group">
            <label>是否异地 <span class="required">*</span></label>
            <select v-model="caseInfo.isOutProvince" ref="isOutProvince" @change="onFieldInput('isOutProvince')"
              :class="{ 'input-error': validationErrors.isOutProvince }" class="form-input select-sm">
              <option value="">请选择</option>
              <option value="0">否</option>
              <option value="1">是</option>
            </select>
          </div>

          <div class="contact-form-group">
            <label>是否微信理赔 <span class="required">*</span></label>
            <select v-model="caseInfo.isWeChatClaim" ref="isWeChatClaim" @change="onFieldInput('isWeChatClaim')"
              :class="{ 'input-error': validationErrors.isWeChatClaim }" class="form-input select-sm">
              <option value="">请选择</option>
              <option value="0">否</option>
              <option value="1">是</option>
            </select>
          </div>

          <div class="contact-form-group">
            <label>事故原因 <span class="required">*</span></label>
            <select v-model="caseInfo.accidentReason" ref="accidentReason" @change="onFieldInput('accidentReason')"
              :class="{ 'input-error': validationErrors.accidentReason }" class="form-input select-sm">
              <option value="">请选择</option>
              <option value="0">未按规定让行</option>
              <option value="1">违反交通信号灯</option>
              <option value="2">超速行驶</option>
              <option value="3">酒后驾驶</option>
              <option value="4">其他</option>
            </select>
          </div>
        </div>

        <!-- 第十一行：是否报警、报警时间 -->
        <div class="contact-form-row">
          <div class="form-group">
            <label>是否报警 <span class="required">*</span></label>
            <div class="radio-group height">
              <label class="radio-label">
                <input type="radio" v-model="caseInfo.isAlarm" value="1" @change="onFieldInput('isAlarm')" /> 是
              </label>
              <label class="radio-label">
                <input type="radio" v-model="caseInfo.isAlarm" value="0" @change="onFieldInput('isAlarm')" /> 否
              </label>
            </div>
          </div>
          <div class="form-group" v-if="caseInfo.isAlarm === '1' || caseInfo.isAlarm === 1">
            <label><i class="iconfont icon-shijiankaishishijian"></i> 报警时间 </label>
            <el-date-picker v-model="caseInfo.alarmTime" type="datetime" format="YYYY/MM/DD HH:mm:ss"
              value-format="YYYY/MM/DD HH:mm:ss" :disabled-date="disabledFutureDate" :disabled-hours="disabledHours"
              :disabled-minutes="disabledMinutes" :disabled-seconds="disabledSeconds"
              @focus="setOperatingField('alarmTime')" @blur="resetOperatingField" placeholder="选择报警时间" prefix-icon="_"
              clear-icon="_" @change="onFieldInput('alarmTime')" :class="{ 'input-error': validationErrors.alarmTime }"
              style="width: 100%;">
            </el-date-picker>
            <span v-if="validationErrors.alarmTime" class="error-message">
              {{ validationErrors.alarmTime }}
            </span>
          </div>
        </div>

        <!-- 第十二行：是否巨灾、巨灾类型、巨灾名称 -->
        <div class="contact-form-row">
          <div class="form-group">
            <label>是否巨灾 <span class="required">*</span></label>
            <div class="radio-group height">
              <label class="radio-label">
                <input type="radio" v-model="caseInfo.isDisaster" value="1" @change="onFieldInput('isDisaster')" /> 是
              </label>
              <label class="radio-label">
                <input type="radio" v-model="caseInfo.isDisaster" value="0" @change="onFieldInput('isDisaster')" /> 否
              </label>
            </div>
          </div>

          <div class="contact-form-group" v-if="caseInfo.isDisaster === '1' || caseInfo.isDisaster === 1">
            <label>巨灾类型 <span class="required">*</span></label>
            <select v-model="caseInfo.disasterType" ref="disasterType" @change="onFieldInput('disasterType')"
              :class="{ 'input-error': validationErrors.disasterType }" class="form-input select-sm">
              <option value="">请选择</option>
              <option value="0">地震</option>
              <option value="1">洪水</option>
              <option value="2">台风</option>
              <option value="3">火灾</option>
            </select>
          </div>

          <div class="form-group" v-if="caseInfo.isDisaster === '1' || caseInfo.isDisaster === 1">
            <label>巨灾名称 <span class="required">*</span></label>
            <input type="text" v-model="caseInfo.disasterName" ref="disasterName" @input="onFieldInput('disasterName')"
              :class="{ 'input-error': validationErrors.disasterName }" class="form-input" />
          </div>
        </div>

        <!-- 第十三行：是否需现场查勘 -->
        <div class="contact-form-row">
          <div class="form-group">
            <label>是否需现场查勘 <span class="required">*</span></label>
            <div class="radio-group">
              <label class="radio-label">
                <input type="radio" v-model="caseInfo.isOnSiteSurvey" value="1"
                  @change="onFieldInput('isOnSiteSurvey')" /> 是
              </label>
              <label class="radio-label">
                <input type="radio" v-model="caseInfo.isOnSiteSurvey" value="0"
                  @change="onFieldInput('isOnSiteSurvey')" /> 否
              </label>
            </div>
          </div>
        </div>

        <!-- 第十四行：底部标签 -->
        <div class="form-row">
          <div class="form-group full-width">
            <div class="tag-container">
              <label class="checkbox-label">
                <input type="checkbox" v-model="caseInfo.tags" value="转调度" /> 转调度
              </label>
              <label class="checkbox-label">
                <input type="checkbox" v-model="caseInfo.tags" value="待调度" /> 待调度
              </label>
              <label class="checkbox-label">
                <input type="checkbox" v-model="caseInfo.tags" value="重大案件" /> 重大案件
              </label>
              <label class="checkbox-label">
                <input type="checkbox" v-model="caseInfo.tags" value="有目击证人" /> 有目击证人
              </label>
              <label class="checkbox-label">
                <input type="checkbox" v-model="caseInfo.tags" value="客户指定修理厂" /> 客户指定修理厂
              </label>
              <label class="checkbox-label">
                <input type="checkbox" v-model="caseInfo.tags" value="线上查勘" /> 线上查勘
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ============ 事故救援 ============ -->
    <section class="policy-card" id="section-accidentRescue">
      <div class="section-header-other no-border">
        <h3><i class="iconfont icon-wuliuqiache" style="color: #3B4DAA ;"></i> 事故救援</h3>
      </div>
      <div v-show="accidentRescueExpanded" class="section-content">
        <div class="rescue-container">
          <!-- 标的车区域 -->
          <div class="rescue-vehicle-section">
            <div class="rescue-vehicle-header">
              <h4>标的车</h4>
            </div>

            <!-- 标的车能否正常行驶 -->
            <div class="form-group">
              <label>标的车能否正常行驶</label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="rescueInfo[0].isNormalRun" value="1"
                    @change="onFieldInput('rescueInfo0')" /> 能
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="rescueInfo[0].isNormalRun" value="0"
                    @change="onFieldInput('rescueInfo0')" /> 不能
                </label>
              </div>
            </div>

            <!-- 标的车事故救援选项 -->
            <div class="form-group">
              <label>标的车事故救援</label>
              <div class="rescue-checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="rescueInfo[0].hasCarDamageInsurance"
                    @change="onFieldInput('rescueInfo0')" /> 标的车保有车损险
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="rescueInfo[0].isFullLiability"
                    @change="onFieldInput('rescueInfo0')" /> 标的车全责
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="rescueInfo[0].confirmedCompensation"
                    @change="onFieldInput('rescueInfo0')" /> 车损险确认理赔
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="rescueInfo[0].fiftyKm" @change="onFieldInput('rescueInfo0')" />
                  拖车50KM内
                </label>
              </div>
            </div>
          </div>

          <!-- 三者车区域 -->
          <div class="rescue-vehicle-section">
            <div class="rescue-vehicle-header">
              <h4>三者车</h4>
            </div>

            <!-- 三者车能否正常行驶 -->
            <div class="form-group">
              <label>三者车能否正常行驶</label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="rescueInfo[1].isNormalRun" value="1"
                    @change="onFieldInput('rescueInfo1')" /> 能
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="rescueInfo[1].isNormalRun" value="0"
                    @change="onFieldInput('rescueInfo1')" /> 不能
                </label>
              </div>
            </div>

            <!-- 三者车事故救援选项 -->
            <div class="form-group">
              <label>三者车事故救援</label>
              <div class="rescue-checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="rescueInfo[1].hasThirdPartyInsurance"
                    @change="onFieldInput('rescueInfo1')" /> 保有交强险及商业三者险
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="rescueInfo[1].isNoFault" @change="onFieldInput('rescueInfo1')" />
                  三者车无责
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="rescueInfo[1].confirmedThirdPartyCompensation"
                    @change="onFieldInput('rescueInfo1')" /> 商业三者险确认理赔
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="rescueInfo[1].fiftyKm" @change="onFieldInput('rescueInfo1')" />
                  拖车50KM内
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 报案人姓名 ============ -->
    <section class="policy-card" id="section-contactInfo">
      <div class="section-header-other no-border">
        <h3><i class="iconfont icon-yonghu" style="color: #3B4DAA ;"></i> 报案人姓名、联系人姓名</h3>
      </div>

      <div v-show="contactInfoExpanded" class="section-content">
        <!-- 第一行：4个字段 -->
        <div class="contact-form-row">
          <div class="form-group">
            <label>报案人姓名 <span class="required">*</span></label>
            <input type="text" v-model="caseInfo.reportorName" ref="reportorName" @input="onFieldInput('reportorName')"
              :class="{ 'input-error': validationErrors.reportorName }" class="form-input" />
            <span v-if="validationErrors.reportorName" class="error-message">
              {{ validationErrors.reportorName }}
            </span>
          </div>

          <div class="form-group">
            <label>报案电话 <span class="required">*</span></label>
            <input type="text" v-model="caseInfo.reportorPhonenumber" ref="reportorPhonenumber"
              @input="onFieldInput('reportorPhonenumber')"
              :class="{ 'input-error': validationErrors.reportorPhonenumber }" class="form-input"
              placeholder="手机号或固定电话" />
            <span v-if="validationErrors.reportorPhonenumber" class="error-message">
              {{ validationErrors.reportorPhonenumber }}
            </span>
          </div>

          <div class="form-group">
            <label>报案人跟被保险人关系 <span class="required">*</span></label>
            <select v-model="caseInfo.reporterRelation" ref="reporterRelation"
              @change="onFieldInput('reporterRelation')" :class="{ 'input-error': validationErrors.reporterRelation }"
              class="form-input">
              <option value="">请选择</option>
              <option value="0">本人</option>
              <option value="1">配偶</option>
              <option value="2">子女</option>
              <option value="3">父母</option>
              <option value="4">其他</option>
            </select>
            <span v-if="validationErrors.reporterRelation" class="error-message">
              {{ validationErrors.reporterRelation }}
            </span>
          </div>

          <div class="form-group">
            <label>报案人证件类型</label>
            <select v-model="caseInfo.reporterCertType" @change="onFieldInput('reporterCertType')" class="form-input">
              <option value="">请选择</option>
              <option value="124001">身份证</option>
              <option value="124002">护照</option>
              <option value="124003">驾驶证</option>
            </select>
          </div>
        </div>

        <!-- 第二行：1个字段 -->
        <div class="contact-form-row">
          <!-- 报案人证件号码 -->
          <div class="form-group">
            <label>报案人证件号码</label>
            <input type="text" v-model="caseInfo.reporterCertNo" @input="onFieldInput('reporterCertNo')"
              :class="{ 'input-error': validationErrors.reporterCertNo }" class="form-input" />
            <span v-if="validationErrors.reporterCertNo" class="error-message">
              {{ validationErrors.reporterCertNo }}
            </span>
          </div>
        </div>
        <!-- 分割线 -->
        <div class="divider-line"></div>
        <!-- 第三行：4个字段 -->
        <div class="contact-form-row">
          <div class="form-group">
            <label>现场联系人姓名 <span class="required">*</span></label>
            <input type="text" v-model="caseInfo.linkerName" ref="linkerName" @input="onFieldInput('linkerName')"
              :class="{ 'input-error': validationErrors.linkerName }" class="form-input" />
            <span v-if="validationErrors.linkerName" class="error-message">
              {{ validationErrors.linkerName }}
            </span>
          </div>

          <div class="form-group">
            <label>现场联系人电话 <span class="required">*</span></label>
            <input type="text" v-model="caseInfo.linkerPhone" ref="linkerPhone" @input="onFieldInput('linkerPhone')"
              :class="{ 'input-error': validationErrors.linkerPhone }" class="form-input" />
            <span v-if="validationErrors.linkerPhone" class="error-message">
              {{ validationErrors.linkerPhone }}
            </span>
          </div>

          <!-- 联系人手机 -->
          <div class="form-group">
            <label>联系人手机</label>
            <input type="text" v-model="caseInfo.linkerMobile" @input="onFieldInput('linkerMobile')"
              :class="{ 'input-error': validationErrors.linkerMobile }" class="form-input" />
            <span v-if="validationErrors.linkerMobile" class="error-message">
              {{ validationErrors.linkerMobile }}
            </span>
          </div>
          <div class="form-group">
            <label>受理人编码 <span class="required">*</span></label>
            <input type="text" v-model="caseInfo.handlerCode" @input="onFieldInput('handlerCode')" class="form-input" />
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 车辆信息 ============ -->
    <section class="policy-card" id="section-vehicleInfo">
      <div class="section-header-other no-border">
        <h3><i class="iconfont icon-qicheSUV" style="color: #3B4DAA ;"></i> 涉案车辆信息</h3>
        <button type="button" class="btn-add-icon float-right" @click="addVehicleInfo">
          <span>+</span>
        </button>
      </div>

      <div v-show="vehicleInfoExpanded" class="section-content">
        <!-- 当前标的车信息（始终存在） -->
        <div class="vehicle-info-section" id="vehicle-info-0">
          <!-- 第一行：是否要求代位 -->
          <div class="contact-form-row">
            <div class="form-group">
              <label>是否要求代位</label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="vehicleList[0].isSubrogation" value="1"
                    @change="onFieldInput('vehicleList0_subrogation')" /> 是
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="vehicleList[0].isSubrogation" value="0"
                    @change="onFieldInput('vehicleList0_subrogation')" /> 否
                </label>
              </div>
            </div>
          </div>

          <!-- 第二行：标的车车牌、现有车牌号、损失情况 -->
          <div class="contact-form-row">
            <div class="form-group">
              <label>标的车车牌 <span class="required">*</span></label>
              <input type="text" v-model="vehicleList[0].licenseNumber"
                @input="onFieldInput('vehicleList0_licenseNumber')"
                :class="{ 'input-error': validationErrors.vehicleList0_licenseNumber }" class="form-input"
                placeholder="如：京 A12345" />
              <span v-if="validationErrors.vehicleList0_licenseNumber" class="error-message">
                {{ validationErrors.vehicleList0_licenseNumber }}
              </span>
            </div>

            <div class="form-group">
              <label>现有车牌号</label>
              <input type="text" v-model="vehicleList[0].currentLicenseNumber"
                @input="onFieldInput('vehicleList0_currentLicenseNumber')" class="form-input" />
            </div>

            <div class="form-group">
              <label>损失情况 <span class="required">*</span></label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="vehicleList[0].damageStatus" value="1"
                    @change="onFieldInput('vehicleList0_damageStatus')" /> 损
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="vehicleList[0].damageStatus" value="0"
                    @change="onFieldInput('vehicleList0_damageStatus')" /> 无损
                </label>
              </div>
            </div>
          </div>

          <!-- 第三行：驾驶员姓名、证件类型、证件号码、损坏程度 -->
          <div class="contact-form-row">
            <div class="form-group">
              <label>驾驶员姓名 <span class="required">*</span></label>
              <input type="text" v-model="vehicleList[0].driverName" @input="onFieldInput('vehicleList0_driverName')"
                :class="{ 'input-error': validationErrors.vehicleList0_driverName }" class="form-input" />
              <span v-if="validationErrors.vehicleList0_driverName" class="error-message">
                {{ validationErrors.vehicleList0_driverName }}
              </span>
            </div>

            <div class="contact-form-group">
              <label>驾驶员证件类型</label>
              <select v-model="vehicleList[0].driverCertType" @change="onFieldInput('vehicleList0_driverCertType')"
                class="form-input select-sm">
                <option value="">请选择</option>
                <option value="124001">身份证</option>
                <option value="124002">护照</option>
                <option value="124003">驾驶证</option>
              </select>
            </div>

            <div class="form-group">
              <label>驾驶员证件号码</label>
              <input type="text" v-model="vehicleList[0].driverCertNo"
                @input="onFieldInput('vehicleList0_driverCertNo')" class="form-input" />
            </div>

            <div class="form-group">
              <label>损坏程度</label>
              <input type="text" v-model="vehicleList[0].damageDegree"
                @input="onFieldInput('vehicleList0_damageDegree')" class="form-input" />
            </div>
          </div>

          <!-- 第四行：车辆能否正常行驶、车辆状态、发动机号、车架号 -->
          <div class="contact-form-row">
            <div class="form-group">
              <label>车辆能否正常行驶 </label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="vehicleList[0].vehicleCanRun" value="1"
                    @change="onFieldInput('vehicleList0_vehicleCanRun')" /> 能
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="vehicleList[0].vehicleCanRun" value="0"
                    @change="onFieldInput('vehicleList0_vehicleCanRun')" /> 不能
                </label>
              </div>
            </div>

            <div class="form-group">
              <label>车辆状态 </label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="vehicleList[0].vehicleStatus" value="1"
                    @change="onFieldInput('vehicleList0_vehicleStatus')" /> 需要拖车
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="vehicleList[0].vehicleStatus" value="2"
                    @change="onFieldInput('vehicleList0_vehicleStatus')" /> 气囊弹出
                </label>
              </div>
            </div>

            <div class="form-group">
              <label>发动机号 <span class="required">*</span></label>
              <input type="text" v-model="vehicleList[0].engineNumber"
                @input="onFieldInput('vehicleList0_engineNumber')"
                :class="{ 'input-error': validationErrors.vehicleList0_engineNumber }" class="form-input" />
              <span v-if="validationErrors.vehicleList0_engineNumber" class="error-message">
                {{ validationErrors.vehicleList0_engineNumber }}
              </span>
            </div>

            <div class="form-group">
              <label>车架号 <span class="required">*</span></label>
              <input type="text" v-model="vehicleList[0].frameNumber" @input="onFieldInput('vehicleList0_frameNumber')"
                :class="{ 'input-error': validationErrors.vehicleList0_frameNumber }" class="form-input" />
              <span v-if="validationErrors.vehicleList0_frameNumber" class="error-message">
                {{ validationErrors.vehicleList0_frameNumber }}
              </span>
            </div>
          </div>
        </div>

        <!-- 动态三者车信息 -->
        <div v-for="(vehicle, index) in vehicleList.slice(1)" :key="index + 1" class="vehicle-info-section"
          :id="'vehicle-info-' + (index + 1)">
          <div class="vehicle-header">
            <button type="button" @click="removeVehicleInfo(index + 1)" class="btn-remove-icon">
              -
            </button>
          </div>
          <div class="contact-form-row">
            <div class="form-group">
              <label>是否要求代位</label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="vehicleList[0].isSubrogation" value="1"
                    @change="onFieldInput('vehicleList0_subrogation')" /> 是
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="vehicleList[0].isSubrogation" value="0"
                    @change="onFieldInput('vehicleList0_subrogation')" /> 否
                </label>
              </div>
            </div>
          </div>
          <!-- 第一行：三者车车牌、现有车牌号、损失情况 -->
          <div class="contact-form-row">
            <div class="form-group">
              <label>三者车车牌 <span class="required">*</span></label>
              <input type="text" v-model="vehicle.licenseNumber"
                @input="onFieldInput('vehicleList' + (index + 1) + '_licenseNumber')"
                :class="{ 'input-error': validationErrors['vehicleList' + (index + 1) + '_licenseNumber'] }"
                class="form-input" placeholder="如：京 B12345" />
              <span v-if="validationErrors['vehicleList' + (index + 1) + '_licenseNumber']" class="error-message">
                {{ validationErrors['vehicleList' + (index + 1) + '_licenseNumber'] }}
              </span>
            </div>

            <div class="form-group">
              <label>现有车牌号</label>
              <input type="text" v-model="vehicle.currentLicenseNumber"
                @input="onFieldInput('vehicleList' + (index + 1) + '_currentLicenseNumber')" class="form-input" />
            </div>

            <div class="form-group">
              <label>损失情况 <span class="required">*</span></label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="vehicle.damageStatus" value="1"
                    @change="onFieldInput('vehicleList' + (index + 1) + '_damageStatus')" /> 损
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="vehicle.damageStatus" value="0"
                    @change="onFieldInput('vehicleList' + (index + 1) + '_damageStatus')" /> 无损
                </label>
              </div>
            </div>
          </div>

          <!-- 第二行：驾驶员姓名、证件类型、证件号码、损坏程度 -->
          <div class="contact-form-row">
            <div class="form-group">
              <label>驾驶员姓名 <span class="required">*</span></label>
              <input type="text" v-model="vehicle.driverName"
                @input="onFieldInput('vehicleList' + (index + 1) + '_driverName')"
                :class="{ 'input-error': validationErrors['vehicleList' + (index + 1) + '_driverName'] }"
                class="form-input" />
              <span v-if="validationErrors['vehicleList' + (index + 1) + '_driverName']" class="error-message">
                {{ validationErrors['vehicleList' + (index + 1) + '_driverName'] }}
              </span>
            </div>

            <div class="contact-form-group">
              <label>驾驶员证件类型</label>
              <select v-model="vehicle.driverCertType"
                @change="onFieldInput('vehicleList' + (index + 1) + '_driverCertType')" class="form-input select-sm">
                <option value="">请选择</option>
                <option value="124001">身份证</option>
                <option value="124002">护照</option>
                <option value="124003">驾驶证</option>
              </select>
            </div>

            <div class="form-group">
              <label>驾驶员证件号码</label>
              <input type="text" v-model="vehicle.driverCertNo"
                @input="onFieldInput('vehicleList' + (index + 1) + '_driverCertNo')" class="form-input" />
            </div>

            <div class="form-group">
              <label>损坏程度</label>
              <input type="text" v-model="vehicle.damageDegree"
                @input="onFieldInput('vehicleList' + (index + 1) + '_damageDegree')" class="form-input" />
            </div>
          </div>

          <!-- 第三行：车辆能否正常行驶、车辆状态、发动机号、车架号 -->
          <div class="contact-form-row">
            <div class="form-group">
              <label>车辆能否正常行驶 </label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="vehicle.vehicleCanRun" value="1"
                    @change="onFieldInput('vehicleList' + (index + 1) + '_vehicleCanRun')" /> 能
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="vehicle.vehicleCanRun" value="0"
                    @change="onFieldInput('vehicleList' + (index + 1) + '_vehicleCanRun')" /> 不能
                </label>
              </div>
            </div>

            <div class="form-group">
              <label>车辆状态 </label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="vehicle.vehicleStatus" value="1"
                    @change="onFieldInput('vehicleList' + (index + 1) + '_vehicleStatus')" /> 需要拖车
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="vehicle.vehicleStatus" value="2"
                    @change="onFieldInput('vehicleList' + (index + 1) + '_vehicleStatus')" /> 气囊弹出
                </label>
              </div>
            </div>

            <div class="form-group">
              <label>发动机号 <span class="required">*</span></label>
              <input type="text" v-model="vehicle.engineNumber"
                @input="onFieldInput('vehicleList' + (index + 1) + '_engineNumber')"
                :class="{ 'input-error': validationErrors['vehicleList' + (index + 1) + '_engineNumber'] }"
                class="form-input" />
              <span v-if="validationErrors['vehicleList' + (index + 1) + '_engineNumber']" class="error-message">
                {{ validationErrors['vehicleList' + (index + 1) + '_engineNumber'] }}
              </span>
            </div>

            <div class="form-group">
              <label>车架号 <span class="required">*</span></label>
              <input type="text" v-model="vehicle.frameNumber"
                @input="onFieldInput('vehicleList' + (index + 1) + '_frameNumber')"
                :class="{ 'input-error': validationErrors['vehicleList' + (index + 1) + '_frameNumber'] }"
                class="form-input" />
              <span v-if="validationErrors['vehicleList' + (index + 1) + '_frameNumber']" class="error-message">
                {{ validationErrors['vehicleList' + (index + 1) + '_frameNumber'] }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 财产损失 ============ -->
    <section class="policy-card" id="section-propertyLoss">
      <div class="section-header-other no-border">
        <h3><i class="iconfont icon-meiyuan" style="color: #3B4DAA ;"></i> 财产损失信息</h3>
        <button type="button" v-if="caseInfo.propFlag === '1'" @click="addPropertyLoss"
          class="btn-add-icon float-right">
          <span>+</span>
        </button>
      </div>

      <div v-show="propertyLossExpanded" class="section-content">
        <!-- 是否财产损失 -->
        <div class="form-row nomargin">
          <div class="form-group nomargin">
            <label>是否财产损失</label>
            <div class="radio-group">
              <label class="radio-label">
                <input type="radio" v-model="caseInfo.propFlag" value="0" @change="onPropFlagChange" /> 无
              </label>
              <label class="radio-label">
                <input type="radio" v-model="caseInfo.propFlag" value="1" @change="onFieldInput('propFlag')"
                  @click="addPropertyLoss" /> 有
              </label>
            </div>
          </div>
        </div>

        <!-- 财产损失列表 -->
        <div v-if="caseInfo.propFlag === '1'" class="property-loss-list">
          <div v-for="(item, index) in propertyLossList" :key="index" class="property-loss-item">
            <button type="button" v-if="propertyLossList.length > 1" @click="removePropertyLoss(index)"
              class="btn-remove-icon">
              -
            </button>
            <div class="form-row nomargin">
              <div class="contact-form-group">
                <label>财产名称</label>
                <input type="text" v-model="item.propertyName" @input="onFieldInput(`propertyName_${index}`)"
                  class="form-input" />
              </div>

              <div class="contact-form-group">
                <label>归属 <span class="required">*</span></label>
                <select v-model="item.identityRec" @change="onFieldInput(`identityRec_${index}`)"
                  class="form-input select-sm" :class="{ 'input-error': validationErrors[`identityRec_${index}`] }">
                  <option value="">请选择</option>
                  <option value="0">第三者</option>
                  <option value="1">车上人员</option>
                  <option value="2">本车</option>
                </select>
                <span v-if="validationErrors[`identityRec_${index}`]" class="error-message">
                  {{ validationErrors[`identityRec_${index}`] }}
                </span>
              </div>

              <div class="contact-form-group">
                <label>损失情况</label>
                <select v-model="item.lossSituation" @change="onFieldInput(`lossSituation_${index}`)"
                  class="form-input select-sm" :class="{ 'input-error': validationErrors[`lossSituation_${index}`] }">
                  <option value="">请选择</option>
                  <option value="0">轻微损坏</option>
                  <option value="1">中度损坏</option>
                  <option value="2">严重损坏</option>
                  <option value="3">完全损毁</option>
                </select>
                <span v-if="validationErrors[`lossSituation_${index}`]" class="error-message">
                  {{ validationErrors[`lossSituation_${index}`] }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ============ 人员伤亡 ============ -->
    <section class="policy-card" id="section-personInjury">
      <div class="section-header-other no-border">
        <h3><i class="iconfont icon-aixin" style="color: #3B4DAA ;"></i> 人员伤亡</h3>
        <button type="button" v-if="caseInfo.woundFlag === '1'" class="btn-add-icon float-right"
          @click="addPersonInjury">
          <span>+</span>
        </button>
      </div>

      <div v-show="personInjuryExpanded" class="section-content">
        <div class="contact-form-row nomargin">
          <div class="form-group nomargin">
            <label>是否人员伤亡 </label>
            <div class="radio-group">
              <label class="radio-label">
                <input type="radio" v-model="caseInfo.woundFlag" value="0" @change="onWoundFlagChange" /> 无
              </label>
              <label class="radio-label">
                <input type="radio" v-model="caseInfo.woundFlag" value="1" @click="addPersonInjury" /> 有
              </label>
            </div>
          </div>

          <div class="form-group nomargin">
            <label>是否叫救护车</label>
            <div class="radio-group">
              <label class="radio-label">
                <input type="radio" v-model="caseInfo.isambulance" value="1" /> 是
              </label>
              <label class="radio-label">
                <input type="radio" v-model="caseInfo.isambulance" value="0" /> 否
              </label>
            </div>
          </div>
        </div>

        <div v-if="caseInfo.woundFlag === '1'" class="person-injury-list">
          <div v-for="(item, index) in personInjuryList" :key="index" class="person-injury-item">
            <button type="button" v-if="personInjuryList.length > 1" @click="removePersonInjury(index)"
              class="btn-remove-icon">
              -
            </button>
            <div class="injury-grid-row">
              <div class="contact-form-group">
                <label>姓名<span class="required">*</span></label>
                <input type="text" v-model="item.name" class="form-input" />
              </div>
              <div class="contact-form-group">
                <label>性别</label>
                <select v-model="item.sex" class="form-input select-sm">
                  <option value="">请选择</option>
                  <option value="0">男</option>
                  <option value="1">女</option>
                </select>
              </div>
              <div class="contact-form-group">
                <label>归属<span class="required">*</span></label>
                <select v-model="item.owncar" class="form-input select-sm">
                  <option value="">请选择</option>
                  <option value="0">第三者</option>
                  <option value="1">车上人员</option>
                </select>
              </div>
              <div class="contact-form-group">
                <label>伤亡情况</label>
                <select v-model="item.persionpayType" class="form-input select-sm">
                  <option value="">请选择</option>
                  <option value="0">轻伤</option>
                  <option value="1">重伤</option>
                  <option value="2">残废</option>
                  <option value="3">死亡</option>
                </select>
              </div>
            </div>
            <div class="injury-grid-row">
              <div class="contact-form-group">
                <label>是否就医伤亡 </label>
                <div class="radio-group">
                  <label class="radio-label">
                    <input type="radio" v-model="item.isHospitalized" value="0" /> 无
                  </label>
                  <label class="radio-label">
                    <input type="radio" v-model="item.isHospitalized" value="1" /> 有
                  </label>
                </div>
              </div>
              <div class="contact-form-group">
                <label>就诊医院</label>
                <input type="text" class="form-input" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 损失类型 ============ -->
    <section class="policy-card" id="section-lossType">
      <div class="section-header-other no-border">
        <h3><i class="iconfont icon-shield" style="color: #3B4DAA ;"></i>损失类型</h3>
      </div>
      <div v-show="lossTypeExpanded" class="section-content">
        <div class="loss-type-row">
          <div class="loss-type-item">
            <label class="loss-checkbox-label">
              <input type="checkbox" v-model="lossTypes" value="本车车损" />
              本车车损
            </label>
          </div>
          <div class="loss-type-item">
            <label class="loss-checkbox-label">
              <input type="checkbox" v-model="lossTypes" value="本车人伤" />
              本车人伤
            </label>
          </div>
          <div class="loss-type-item">
            <label class="loss-checkbox-label">
              <input type="checkbox" v-model="lossTypes" value="本车车载货物" />
              本车车载货物
            </label>
          </div>
          <div class="loss-type-item">
            <label class="loss-checkbox-label">
              <input type="checkbox" v-model="lossTypes" value="三者车损" />
              三者车损
            </label>
          </div>
          <div class="loss-type-item">
            <label class="loss-checkbox-label">
              <input type="checkbox" v-model="lossTypes" value="三者人伤" />
              三者人伤
            </label>
          </div>
          <div class="loss-type-item">
            <label class="loss-checkbox-label">
              <input type="checkbox" v-model="lossTypes" value="三者物损" />
              三者物损
            </label>
          </div>
          <div class="loss-type-item">
            <label class="loss-checkbox-label">
              <input type="checkbox" v-model="lossTypes" value="全车盗抢" />
              全车盗抢
            </label>
          </div>
          <div class="loss-type-item">
            <label class="loss-checkbox-label">
              <input type="checkbox" v-model="lossTypes" value="车身划痕" />
              车身划痕
            </label>
          </div>
          <div class="loss-type-item">
            <label class="loss-checkbox-label">
              <input type="checkbox" v-model="lossTypes" value="本车自燃" />
              本车自燃
            </label>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 案件补充说明 ============ -->
    <section class="policy-card" id="section-caseDesc">
      <div class="section-header-other no-border">
        <h3><i class="iconfont icon-008duihuakuang-6" style="color: #3B4DAA;"></i> 案件补充说明</h3>
        <!-- <button type="button" @click="addCaseDesc" class="desc-add-icon float-right"> -->
        <button type="button" class="desc-add-icon float-right">
          <span>+</span><span>添加说明</span>
        </button>
      </div>
      <div class="section-content">
        <div class="report-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th class="seq-column">序号</th>
                <th class="time-column">时间</th>
                <th class="operator-column">操作员</th>
                <th class="content-column">内容</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="caseDescList.length === 0">
                <td colspan="4" class="empty-cell">
                  <p style="text-align: center; color: #999; padding: 20px;">(按「添加说明」增加案件补充说明)</p>
                </td>
              </tr>
              <tr v-else v-for="(item, index) in caseDescList" :key="index">
                <td class="seq-column">{{ index + 1 }}</td>
                <td class="time-column">{{ item.disposeTime }}</td>
                <td class="operator-column">{{ item.usercode }}</td>
                <td class="content-column">
                  <input type="text" v-model="item.context" @input="onFieldInput(`context_${index}`)" class="desc-input"
                    placeholder="请输入补充说明内容" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ============ 全局错误提示 ============ -->
    <div v-if="globalError" class="global-error-toast">
      {{ globalError }}
    </div>
    <div class="footer-message">
      <i class="iconfont icon-008duihuakuang-6" style="color: #3B4DAA;"></i>
      <span>请您保留事故现场，在原地等候查勘，查勘员会立即与您联系。再见。</span>
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
      policyBodyExpanded: true,
      infoDisplayExpanded: true,
      reportInfoExpanded: true,
      vehicleInfoExpanded: true,
      lossTypeExpanded: true,
      personInjuryExpanded: true,
      accidentRescueExpanded: true,
      contactInfoExpanded: true,
      caseDescExpanded: true,
      historyReportExpanded: true,
      propertyLossExpanded: true,
      // 添加一个标记来控制是否显示错误
      shouldShowValidationErrors: false,
      // 新增：导航数据
      activeSection: 'policyInfo', // 当前激活的区块
      // ============ 校验规则 ============
      validationRules: {
        // 姓名校验：2-15个字符，中文或英文字母
        name: {
          pattern: /^[\u4E00-\u9FA5a-zA-Z\s]{2,15}$/,
          message: '姓名应为2-15个字符，只能包含中文、英文字母和空格'
        },
        // 手机号校验：中国大陆手机号
        phone: {
          pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
          message: '请输入有效的手机号码'
        },
        // 证件号校验：支持身份证、护照、驾驶证
        idCard: {
          pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
          message: '请输入有效的证件号码'
        },
        passport: {
          pattern: /^[a-zA-Z]{1,2}[0-9]{7,8}$/,
          message: '请输入有效的护照号码'
        },
        driverLicense: {
          pattern: /^[a-zA-Z0-9]{9,12}$/,
          message: '请输入有效的驾驶证号码'
        }
      },

      // ============ 校验错误信息 ============
      validationErrors: {},
      globalError: '',

      // ============ 动态列表数据 ============
      // 省市区级联数据
      provinces: [
        { code: '11', name: '北京市' },
        { code: '31', name: '上海市' },
        { code: '33', name: '浙江省' },
        // 可以添加更多省份
      ],

      cities: {
        '11': [
          { code: '0', name: '北京市' }
        ],
        '31': [
          { code: '1', name: '上海市' }
        ],
        '33': [
          { code: '2', name: '杭州市' },
          { code: '3', name: '宁波市' },
          { code: '4', name: '温州市' }
          // 可以添加更多城市
        ]
      },

      districts: {
        '0': [
          { code: '0', name: '东城区' },
          { code: '1', name: '西城区' },
          { code: '2', name: '朝阳区' }
          // 可以添加更多区县
        ],
        '1': [
          { code: '0', name: '黄浦区' },
          { code: '1', name: '徐汇区' }
          // 可以添加更多区县
        ],
        '2': [
          { code: '0', name: '西湖区' },
          { code: '1', name: '拱墅区' },
          { code: '2', name: '滨江区' }
          // 可以添加更多区县
        ],
        '3': [
          { code: '0', name: '海曙区' },
          { code: '1', name: '江北区' }
        ],
        '4': [
          { code: '0', name: '鹿城区' },
          { code: '1', name: '龙湾区' }
        ]
      },
      vehicleList: [
        // 标的车信息（默认存在）
        {
          isSubrogation: '0', // 是否要求代位，默认否
          licenseNumber: '', // 车牌号
          currentLicenseNumber: '', // 现有车牌号
          damageStatus: '1', // 损失情况，默认"损"
          driverName: '', // 驾驶员姓名
          driverCertType: '', // 驾驶员证件类型
          driverCertNo: '', // 驾驶员证件号码
          damageDegree: '', // 损坏程度
          vehicleCanRun: '1', // 车辆能否正常行驶，默认"能"
          vehicleStatus: '1', // 车辆状态，默认"需要拖车"
          engineNumber: '', // 发动机号
          frameNumber: '' // 车架号
        }
      ],
      propertyLossList: [],
      lossTypes: [],
      personInjuryList: [],
      caseDescList: [],
      rescueInfo: [
        {
          isNormalRun: '',
          fiftyKm: false,
          hasCarDamageInsurance: false,  // 标的车保有车损险
          isFullLiability: false,        // 标的车全责
          confirmedCompensation: false    // 车损险确认理赔
        },
        {
          isNormalRun: '',
          fiftyKm: false,
          hasThirdPartyInsurance: false,           // 保有交强险及商业三者险
          isNoFault: false,                       // 三者车无责
          confirmedThirdPartyCompensation: false   // 商业三者险确认理赔
        }
      ],
      // ============ 历史报案记录数据 ============
      historyReports: [
        {
          reportNo: 'RDDH20260000000360994',
          policyNo: '29932070365202500000008',
          accidentTime: '2026-03-10 18:15:05',
          reportTime: '2026-03-10 18:21:05',
          reporter: '刘*',
          fastClaimNo: '-',
          status: '已提交'
        },
        {
          reportNo: 'RDDH20260000000360998',
          policyNo: '29932070330202500000008',
          accidentTime: '2026-03-10 18:15:05',
          reportTime: '2026-03-10 18:24:21',
          reporter: '刘*',
          fastClaimNo: '-',
          status: '已提交'
        },
        {
          reportNo: 'RDDH20260000000360993',
          policyNo: '29932070365202500000008',
          accidentTime: '2026-03-10 18:15:05',
          reportTime: '2026-03-10 18:19:48',
          reporter: '刘*',
          fastClaimNo: '-',
          status: '已提交'
        }
      ],
      // 多保单数据结构
      policies: [
        {
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
          selected: true, // 默认选中第一张
          hovered: false,
          bodyExpanded: true
        },
        {
          policyNo: '29932070365202500000009',
          appliName: '张*明',
          insuredName: '张*明',
          agentName: '王丽华',
          insuranceName: '家庭财产综合保险2020版',
          policyStartDateStr: '2025/10/15 00:00:00',
          policyEndDateStr: '2026/10/14 23:59:59',
          insurerName: '32070102-招商财产保险股份有限公司苏州中心支公司',
          workUnit: '',
          customerSource: '',
          customerTag: '重要客户',
          customerLevel: 'VIP客户',
          specialistName: '',
          specialistPhone: '',
          serviceLevel: '',
          selected: false,
          hovered: false,
          bodyExpanded: false
        },
        {
          policyNo: '29932070365202500000010',
          appliName: '李*华',
          insuredName: '李*华',
          agentName: '赵晓东',
          insuranceName: '企业财产保险基本险',
          policyStartDateStr: '2025/12/01 00:00:00',
          policyEndDateStr: '2026/11/30 23:59:59',
          insurerName: '32070103-招商财产保险股份有限公司无锡中心支公司',
          workUnit: '',
          customerSource: '',
          customerTag: '一般客户',
          customerLevel: '老客户',
          specialistName: '',
          specialistPhone: '',
          serviceLevel: '',
          selected: false,
          hovered: false,
          bodyExpanded: false
        }
      ],
      currentOperatingField: null, // 新增：跟踪当前操作的时间字段
    }
  },
  created() {
    // 设置出险时间默认为北京时间当前时间（如果还没有设置的话）
    if (!this.caseInfo.accidentTime) {
      this.caseInfo.accidentTime = this.getCurrentBeijingTime();
    }

    if (!this.caseInfo.reportTime) {
      this.caseInfo.reportTime = this.getCurrentBeijingTime();
    }
    if (!this.caseInfo.alarmTime) {
      this.caseInfo.alarmTime = this.getCurrentBeijingTime();
    }
  },
  computed: {
    // 计算选中保单数量
    selectedPoliciesCount() {
      return this.policies.filter(policy => policy.selected).length;
    },
  },
  methods: {

    // 获取当前正在操作的时间字段的日期
    getCurrentSelectedDate() {
      // 根据当前操作的字段返回相应的时间值
      if (this.currentOperatingField) {
        const fieldValue = this.caseInfo[this.currentOperatingField];
        if (fieldValue) {
          return new Date(fieldValue);
        }
      }
      // 如果没有明确的操作字段，返回当前日期
      return new Date();
    },
    // 禁用晚于当前时间的日期
    disabledFutureDate(time) {
      const now = new Date();
      const utcOffset = now.getTimezoneOffset() * 60000;
      const currentBeijingTime = new Date(now.getTime() + utcOffset + (8 * 3600000));

      return time.getTime() > currentBeijingTime.getTime();
    },
    // 禁用大于当前小时的小时数 - 动态获取当前时间
    disabledHours() {
      // 注意：在这个函数执行时，我们需要获取当前选择器的当前值
      // 但由于Element UI的API限制，我们只能获取到当前操作的时间字段
      const now = new Date();
      const utcOffset = now.getTimezoneOffset() * 60000;
      const currentBeijingTime = new Date(now.getTime() + utcOffset + (8 * 3600000));

      // 获取当前操作字段的日期部分
      if (this.currentOperatingField && this.caseInfo[this.currentOperatingField]) {
        const selectedDateTime = new Date(this.caseInfo[this.currentOperatingField]);
        // 如果选择的日期是今天，则限制小时
        if (selectedDateTime.toDateString() === currentBeijingTime.toDateString()) {
          const hours = [];
          for (let i = currentBeijingTime.getHours() + 1; i < 24; i++) {
            hours.push(i);
          }
          return hours;
        }
      }
      return [];
    },
    // 禁用大于当前分钟的分钟数 - 动态获取当前时间
    disabledMinutes(selectedHour) {
      const now = new Date();
      const utcOffset = now.getTimezoneOffset() * 60000;
      const currentBeijingTime = new Date(now.getTime() + utcOffset + (8 * 3600000));

      if (this.currentOperatingField && this.caseInfo[this.currentOperatingField]) {
        const selectedDateTime = new Date(this.caseInfo[this.currentOperatingField]);
        // 如果选择的日期是今天，且小时相同，则限制分钟
        if (selectedDateTime.toDateString() === currentBeijingTime.toDateString() &&
          selectedHour === currentBeijingTime.getHours()) {
          const minutes = [];
          for (let i = currentBeijingTime.getMinutes() + 1; i < 60; i++) {
            minutes.push(i);
          }
          return minutes;
        }
      }
      return [];
    },
    // 禁用大于当前秒的秒数 - 动态获取当前时间
    disabledSeconds(selectedHour, selectedMinute) {
      const now = new Date();
      const utcOffset = now.getTimezoneOffset() * 60000;
      const currentBeijingTime = new Date(now.getTime() + utcOffset + (8 * 3600000));

      if (this.currentOperatingField && this.caseInfo[this.currentOperatingField]) {
        const selectedDateTime = new Date(this.caseInfo[this.currentOperatingField]);
        // 如果选择的日期是今天，且小时和分钟都相同，则限制秒
        if (selectedDateTime.toDateString() === currentBeijingTime.toDateString() &&
          selectedHour === currentBeijingTime.getHours() &&
          selectedMinute === currentBeijingTime.getMinutes()) {
          const seconds = [];
          for (let i = currentBeijingTime.getSeconds() + 1; i < 60; i++) {
            seconds.push(i);
          }
          return seconds;
        }
      }
      return [];
    },
    // 在时间选择器的focus事件中设置当前操作字段
    setOperatingField(fieldName) {
      this.currentOperatingField = fieldName;
    },

    // 重置当前操作字段
    resetOperatingField() {
      this.currentOperatingField = null;
    },

    // 处理人员伤亡标志变化
    onWoundFlagChange() {
      // 当选择"无"时，清空所有人员伤亡信息
      if (this.caseInfo.woundFlag === '0') {
        this.personInjuryList = []; // 清空人员伤亡列表
      }
    },
    onPropFlagChange() {
      // 当选择"无"时，清空所有
      if (this.caseInfo.propFlag === '0') {
        this.propertyLossList = [];
      }
    },
    // 新增三者车信息
    addVehicleInfo() {
      this.vehicleList.push({
        licenseNumber: '', // 三者车车牌
        currentLicenseNumber: '', // 现有车牌号
        damageStatus: '1', // 损失情况，默认"损"
        driverName: '', // 驾驶员姓名
        driverCertType: '', // 驾驶员证件类型
        driverCertNo: '', // 驾驶员证件号码
        damageDegree: '', // 损坏程度
        vehicleCanRun: '1', // 车辆能否正常行驶，默认"能"
        vehicleStatus: '1', // 车辆状态，默认"需要拖车"
        engineNumber: '', // 发动机号
        frameNumber: '' // 车架号
      });
    },

    // 删除三者车信息（注意：不能删除标的车，即索引为0的项目）
    removeVehicleInfo(index) {
      if (index > 0 && index < this.vehicleList.length) {
        this.vehicleList.splice(index, 1);
      }
    },
    // 当选择当前省份时，清空当前城市和区县
    onCurrentProvinceChange() {
      // 清空当前城市和区县选择
      this.caseInfo.currentAreaCity = '';
      this.caseInfo.currentAreaDistrict = '';
      this.onFieldInput('currentAreaProvince');
    },

    // 当选择当前城市时，清空当前区县
    onCurrentCityChange() {
      // 清空当前区县选择
      this.caseInfo.currentAreaDistrict = '';
      this.onFieldInput('currentAreaCity');
    },
    // 当选择省份时，清空城市和区县
    onProvinceChange() {
      // 清空城市和区县选择
      this.caseInfo.areaCity = '';
      this.caseInfo.areaDistrict = '';
      this.onFieldInput('damageAddress');
    },

    // 当选择城市时，清空区县
    onCityChange() {
      // 清空区县选择
      this.caseInfo.areaDistrict = '';
      this.onFieldInput('damageAddress');
    },
    // 获取当前北京时间
    getCurrentBeijingTime() {
      // 创建一个新的 Date 对象，表示当前时间
      const now = new Date();

      // 获取当前时间的 UTC 时间戳
      const utcTimestamp = now.getTime() + (now.getTimezoneOffset() * 60000);

      // 计算北京时间（UTC + 8小时）
      const beijingTimestamp = utcTimestamp + (8 * 3600000);
      const beijingTime = new Date(beijingTimestamp);

      // 返回符合 ISO 8601 格式的字符串，带时区信息
      // 注意：这里我们手动格式化为 YYYY/MM/DD HH:mm:ss 格式
      const year = beijingTime.getFullYear();
      const month = String(beijingTime.getMonth() + 1).padStart(2, '0');
      const day = String(beijingTime.getDate()).padStart(2, '0');
      const hours = String(beijingTime.getHours()).padStart(2, '0');
      const minutes = String(beijingTime.getMinutes()).padStart(2, '0');
      const seconds = String(beijingTime.getSeconds()).padStart(2, '0');

      return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    },

    // 实时验证并清除错误
    validateFieldRealTime(fieldName) {
      // 处理车辆信息字段的验证
      if (fieldName.startsWith('vehicleList')) {
        const match = fieldName.match(/vehicleList(\d+)_(.*)/);
        if (match) {
          const index = parseInt(match[1]);
          const field = match[2];

          let value = '';
          if (this.vehicleList[index] && this.vehicleList[index][field] !== undefined) {
            value = this.vehicleList[index][field];
          }

          // 根据字段类型进行验证
          if (field === 'licenseNumber' || field === 'engineNumber' || field === 'frameNumber') {
            if (!value || value.trim() === '') {
              this.validationErrors[fieldName] = '此项为必填项';
            } else {
              delete this.validationErrors[fieldName];
            }
          } else if (field === 'driverName') {
            if (!value || value.trim() === '') {
              this.validationErrors[fieldName] = '此项为必填项';
            } else if (!this.validationRules.name.pattern.test(value.trim())) {
              this.validationErrors[fieldName] = this.validationRules.name.message;
            } else {
              delete this.validationErrors[fieldName];
            }
          } else if (field === 'damageStatus' || field === 'vehicleCanRun') {
            if (!value) {
              this.validationErrors[fieldName] = '请选择';
            } else {
              delete this.validationErrors[fieldName];
            }
          } else {
            // 其他字段的验证
            if (value && value.trim() !== '') {
              delete this.validationErrors[fieldName];
            } else {
              delete this.validationErrors[fieldName]; // 非必填项
            }
          }
        }
        return;
      }

      // 特殊处理时间字段的验证 - 使用北京时间
      // if (fieldName === 'accidentTime' || fieldName === 'reportTime' || fieldName === 'alarmTime') {
      //   // 获取当前北京时间
      //   const now = new Date();
      //   const utcOffset = now.getTimezoneOffset() * 60000; // 分钟转毫秒
      //   const currentBeijingTime = new Date(now.getTime() + utcOffset + (8 * 3600000)); // 当前北京时间

      //   if (this.caseInfo[fieldName]) {
      //     const selectedTime = new Date(this.caseInfo[fieldName]);

      //     // 直接比较时间戳，确保使用北京时间
      //     if (selectedTime.getTime() > currentBeijingTime.getTime()) {
      //       // 设置错误信息
      //       if (fieldName === 'accidentTime') {
      //         this.validationErrors[fieldName] = '出险时间不能晚于当前时间';
      //       } else if (fieldName === 'reportTime') {
      //         this.validationErrors[fieldName] = '报案时间不能晚于当前时间';
      //       } else if (fieldName === 'alarmTime') {
      //         this.validationErrors[fieldName] = '报警时间不能晚于当前时间';
      //       }
      //       return; // 提前返回，不执行后续验证
      //     } else {
      //       // 如果时间合法，清除错误信息
      //       delete this.validationErrors[fieldName];
      //     }
      //   }
      // }
      // 添加姓名、手机号、证件号校验
      if (fieldName === 'reportorName' || fieldName === 'linkerName') {
        // 姓名校验
        const nameValue = this.caseInfo[fieldName];
        if (nameValue && nameValue.trim() !== '') {
          if (!this.validationRules.name.pattern.test(nameValue.trim())) {
            this.validationErrors[fieldName] = this.validationRules.name.message;
          } else {
            delete this.validationErrors[fieldName];
          }
        } else {
          // 如果是必填项且为空
          if (requiredFields[fieldName]) {
            this.validationErrors[fieldName] = '此项为必填项';
          } else {
            delete this.validationErrors[fieldName];
          }
        }
        return;
      }

      if (fieldName === 'reportorPhonenumber' || fieldName === 'linkerPhone' || fieldName === 'linkerMobile') {
        // 手机号校验
        const phoneValue = this.caseInfo[fieldName];
        if (phoneValue && phoneValue.trim() !== '') {
          if (!this.validationRules.phone.pattern.test(phoneValue.trim())) {
            this.validationErrors[fieldName] = this.validationRules.phone.message;
          } else {
            delete this.validationErrors[fieldName];
          }
        } else {
          // 如果是必填项且为空
          if (requiredFields[fieldName]) {
            this.validationErrors[fieldName] = '此项为必填项';
          } else {
            delete this.validationErrors[fieldName];
          }
        }
        return;
      }

      if (fieldName === 'reporterCertNo') {
        // 证件号校验 - 根据证件类型选择不同的校验规则
        const certNoValue = this.caseInfo[fieldName];
        const certType = this.caseInfo.reporterCertType;

        if (certNoValue && certNoValue.trim() !== '') {
          if (certType === '124001') { // 身份证
            if (!this.validationRules.idCard.pattern.test(certNoValue.trim())) {
              this.validationErrors[fieldName] = this.validationRules.idCard.message;
            } else {
              delete this.validationErrors[fieldName];
            }
          } else if (certType === '124002') { // 护照
            if (!this.validationRules.passport.pattern.test(certNoValue.trim())) {
              this.validationErrors[fieldName] = this.validationRules.passport.message;
            } else {
              delete this.validationErrors[fieldName];
            }
          } else if (certType === '124003') { // 驾驶证
            if (!this.validationRules.driverLicense.pattern.test(certNoValue.trim())) {
              this.validationErrors[fieldName] = this.validationRules.driverLicense.message;
            } else {
              delete this.validationErrors[fieldName];
            }
          } else {
            // 如果没有选择证件类型，暂时不校验
            delete this.validationErrors[fieldName];
          }
        } else {
          // 如果是必填项且为空
          if (requiredFields[fieldName]) {
            this.validationErrors[fieldName] = '此项为必填项';
          } else {
            delete this.validationErrors[fieldName];
          }
        }
        return;
      }


      if (fieldName === 'lossTypes') {
        // 不进行验证逻辑，直接返回
        return;
      }
      const fieldConfig = requiredFields[fieldName];
      if (!fieldConfig) return;

      let value = this.caseInfo[fieldName];

      // 根据字段类型处理值
      if (typeof value === 'string') {
        value = value.trim();
      } else if (typeof value === 'number') {
        // 数字类型的值保持不变
      } else if (typeof value === 'boolean') {
        // 布尔类型的值保持不变
      } else if (value === null || value === undefined) {
        // null 或 undefined 转换为适当的值
        value = '';
      }

      const errors = validateForm({ [fieldName]: value }, { [fieldName]: fieldConfig });

      if (errors[fieldName]) {
        // 字段仍有错误，保持错误状态
        this.validationErrors[fieldName] = errors[fieldName];
      } else {
        // 字段验证通过，清除错误
        delete this.validationErrors[fieldName];

        // 如果没有其他错误了，清除全局错误
        if (Object.keys(this.validationErrors).length === 0) {
          this.globalError = '';
        }
      }
    },

    // 在用户输入时调用此方法
    onFieldInput(fieldName) {
      if (fieldName === 'lossTypes') {
        return;
      }
      // 设置当前操作字段
      if (['accidentTime', 'reportTime', 'alarmTime'].includes(fieldName)) {
        this.currentOperatingField = fieldName;
      }
      // 延迟执行，避免频繁验证
      clearTimeout(this.inputValidationTimer);
      this.inputValidationTimer = setTimeout(() => {
        this.validateFieldRealTime(fieldName);
      }, 300); // 300ms 延迟
    },

    // 保单号点击处理
    handlePolicyClick(policyNo) {
      console.log(`点击保单号: ${policyNo}`);
      // 这里可以添加实际的业务逻辑，如打开详情页面等
      // 示例：this.$router.push(`/policy/${policyNo}`);
    },

    // 选择单个保单
    selectPolicy(policy, event) {
      // 如果按住Ctrl键则多选，否则单选
      // if (!event?.ctrlKey) {
      //   // 单选模式：取消其他保单的选择状态
      //   this.policies.forEach(p => {
      //     if (p !== policy) {
      //       p.selected = false;
      //     }
      //   });
      // }

      // 切换当前保单选择状态
      policy.selected = !policy.selected;
    },

    // 切换保单选择状态（复选框）
    togglePolicySelection(policy) {
      policy.selected = !policy.selected;
    },

    // 切换保单详情展开状态 - 通过索引
    togglePolicyBodyByIndex(index) {
      this.policies[index].bodyExpanded = !this.policies[index].bodyExpanded;
    },

    // 保留原来的 togglePolicyBody 方法用于兼容
    togglePolicyBody() {
      // 如果是旧的调用方式，可以选择默认处理第一个保单或什么都不做
      console.warn("togglePolicyBody 方法已被弃用，请使用 togglePolicyBodyByIndex(index)");
    },
    // 文本截断方法
    truncateText(text, length) {
      if (!text) return '';
      return text.length > length ? text.substring(0, length) + '...' : text;
    },
    // 切换信息展示（保单详情 + 历史报案记录）
    toggleInfoDisplay() {
      this.infoDisplayExpanded = !this.infoDisplayExpanded;

      // 同时控制保单详情的展开状态
      if (this.infoDisplayExpanded) {
        // 展开时，展开所有保单主体信息
        this.policies.forEach(policy => {
          policy.bodyExpanded = true;
        });
        this.historyReportExpanded = true;
      } else {
        // 展开时，展开所有保单主体信息
        this.policies.forEach(policy => {
          policy.bodyExpanded = false;
        });
        this.historyReportExpanded = false;
      }
    },
    // 点击报案号时触发
    handleReportClick(reportNo) {
      alert(`查看报案号：${reportNo} 的详情`)
      // 可替换为路由跳转、打开弹窗等逻辑
    },
    onAccidentTimeChange(value) {
      console.log('出险时间已更改:', value);
      // 触发验证
      this.$nextTick(() => {
        this.validateField('accidentTime');
      });
    },

    onReportTimeChange(value) {
      console.log('报案时间已更改:', value);
      // 触发验证
      this.$nextTick(() => {
        this.validateField('reportTime');
      });
    },
    onAlarmTimeChange(value) {
      console.log('报警时间已更改:', value);
      // 触发验证
      this.$nextTick(() => {
        this.validateField('alarmTime');
      });
    },
    // ============ 折叠/展开切换方法 ============
    toggleSection(section) {
      const sectionKey = `${section}Expanded`
      this[sectionKey] = !this[sectionKey]
    },
    togglePolicyBody() {
      this.policyBodyExpanded = !this.policyBodyExpanded
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
      if (this.propertyLossList.length > 1) {
        this.propertyLossList.splice(index, 1)
      }
    },
    // 添加补充说明
    addCaseDesc() {
      this.caseDescList.push({
        disposeTime: new Date().toLocaleDateString(), // 默认当前时间
        usercode: '当前用户',
        context: ''
      })
    },

    // 删除补充说明
    removeCaseDesc(index) {
      this.caseDescList.splice(index, 1)
    },

    // 清空所有补充说明
    clearCaseDesc() {
      this.caseDescList = []
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
      if (fieldName.startsWith('identityRec_')) {
        const index = fieldName.split('_')[1]
        const item = this.propertyLossList[index]
        if (!item.identityRec) {
          this.validationErrors[fieldName] = '请选择归属'
        } else {
          delete this.validationErrors[fieldName]
        }
      }
      if (fieldName.startsWith('lossSituation_')) {
        const index = fieldName.split('_')[1]
        const item = this.propertyLossList[index]
        if (!item.lossSituation) {
          this.validationErrors[fieldName] = '请选择损失情况'
        } else {
          delete this.validationErrors[fieldName]
        }
      }

    },

    // ============ 校验并提交（核心方法） ============
    // ============ 校验并提交（核心方法） ============
    async validateAndSubmit() {
      // 1. 清除之前的错误
      this.globalError = ''
      this.clearErrorHighlights()

      // 2. 执行表单校验
      const errors = validateForm(this.caseInfo, requiredFields)

      // 3. 如果有错误，定位到第一个错误字段
      if (Object.keys(errors).length > 0) {
        // 只保留真正有错误的字段，不清除用户已经填写正确的字段的错误状态
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

        // 不要在这里返回 false，而是继续执行后续代码
      } else {
        // 4. 校验通过，提交表单
        this.$emit('submit', this.caseInfo)
        return true
      }

      // 即使有错误也返回 true，因为我们仍需要完成前面的操作
      return Object.keys(errors).length === 0
    },
    // ============ 展开包含错误的区块 ============
    expandSectionsWithErrors(errors) {
      const fieldSectionMap = {
        policyNo: 'policyInfo',
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
      await this.$nextTick() // 确保展开的区块DOM已渲染

      // 获取字段引用
      let element = null

      // 尝试获取普通的 ref
      if (this.$refs[firstErrorField]) {
        element = this.$refs[firstErrorField]
        if (Array.isArray(element)) {
          element = element[0]
        }
      }

      // 如果没有找到普通 ref，则查找 Element Plus 组件的包装元素
      if (!element) {
        // 查找具有对应类名的 Element Plus 组件
        const elDatePickerElements = document.querySelectorAll('.el-date-editor')
        for (let i = 0; i < elDatePickerElements.length; i++) {
          const el = elDatePickerElements[i]
          // 检查这个日期选择器是否对应于错误字段
          if (el.querySelector('input') &&
            (el.querySelector('input').name === firstErrorField ||
              el.querySelector('input').id === firstErrorField ||
              el.closest('.form-group')?.querySelector('label')?.textContent.includes(firstErrorField.replace(/([A-Z])/g, ' $1').toLowerCase()))) {
            element = el
            break
          }
        }
      }

      // 最后尝试通过查询特定的选择器来查找
      if (!element) {
        // 尝试通过标签文本关联字段
        const labels = document.querySelectorAll('label')
        for (let i = 0; i < labels.length; i++) {
          if (labels[i].textContent.toLowerCase().includes(
            firstErrorField.replace(/([A-Z])/g, ' $1').toLowerCase().replace('time', '').trim())) {

            const formGroup = labels[i].closest('.form-group')
            if (formGroup) {
              const datePicker = formGroup.querySelector('.el-date-editor')
              if (datePicker) {
                element = datePicker
                break
              }
            }
          }
        }
      }

      if (element) {
        // 添加错误样式
        element.classList.add('input-error')

        // 滚动到元素
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        })

        // 添加视觉反馈
        element.style.transition = 'box-shadow 0.3s ease'
        element.style.boxShadow = '0 0 0 2px rgba(255, 77, 79, 0.5)'

        // 3秒后移除视觉反馈
        setTimeout(() => {
          if (element.style) {
            element.style.boxShadow = ''
          }
        }, 3000)
      } else {
        console.warn('找不到错误字段元素:', firstErrorField)

        // 如果真的找不到元素，至少展开包含错误字段的部分
        const fieldSectionMap = {
          policyNo: 'policyInfo',
          accidentTime: 'reportInfo',
          reportTime: 'reportInfo',
          alarmTime: 'reportInfo',
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

        const section = fieldSectionMap[firstErrorField]
        if (section) {
          const sectionKey = `${section}Expanded`
          this[sectionKey] = true

          // 滚动到对应区块
          this.$nextTick(() => {
            const sectionElement = document.getElementById(`section-${section}`)
            if (sectionElement) {
              sectionElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              })
            }
          })
        }
      }
    },
    highlightError(element) {
      if (element) {
        // 如果是 input 元素，添加错误类
        if (element.classList) {
          element.classList.add('input-error')
        } else if (element.parentNode && element.parentNode.querySelector('input')) {
          element.parentNode.querySelector('input').classList.add('input-error')
        }
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
      // 确保只有在选择"有"时才添加新的人员伤亡信息
      if (this.caseInfo.woundFlag === '1') {
        this.personInjuryList.push({
          name: '',
          sex: '',
          owncar: '',
          persionpayType: '',
          isHospitalized: '0'
        });
      }
    },
    removePersonInjury(index) {
      if (this.personInjuryList.length > 1) {
        this.personInjuryList.splice(index, 1)
      }
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

      if (Object.prototype.hasOwnProperty.call(this, sectionKey)) {
        // 展开目标区块
        this[sectionKey] = true

        // 等待 DOM 更新后滚动
        this.$nextTick(() => {
          this.$nextTick(() => { // 确保展开动画完成
            const sectionElement = document.getElementById(`section-${section}`)
            if (sectionElement) {
              console.log('找到区块元素:', sectionElement)

              // 获取元素相对于视口的位置
              const rect = sectionElement.getBoundingClientRect();
              const elementTop = rect.top + window.pageYOffset;

              // 计算滚动位置，减去顶部固定元素的高度
              const offsetTop = 60; // 顶部标题栏高度 + 一些额外空间
              const scrollTop = elementTop - offsetTop;

              // 使用 smooth 滚动到计算好的位置
              window.scrollTo({
                top: scrollTop,
                behavior: 'smooth'
              });

              // // 高亮区块头部
              // this.highlightSection(sectionElement, section)
            }
          })
        })
      }
    },

    // 新增高亮方法
    highlightSection(sectionElement, section) {
      // 移除之前的所有高亮
      this.removeHighlightFromAllSections()

      // 为当前区块添加高亮
      const headerElement = sectionElement.querySelector('.section-header')
      if (headerElement) {
        headerElement.classList.add('section-highlighted')

        // 3秒后移除高亮
        setTimeout(() => {
          headerElement.classList.remove('section-highlighted')
        }, 3000)
      }
    },

    // 移除所有区块高亮
    removeHighlightFromAllSections() {
      const allHeaders = document.querySelectorAll('.section-header.section-highlighted')
      allHeaders.forEach(header => {
        header.style.backgroundColor = ''
        header.style.borderLeft = ''
        header.classList.remove('section-highlighted')
      })
    },
    // 滚动处理方法
    handleScroll() {
      const sectionIds = [
        'section-policyInfo',
        'section-reportInfo',
        'section-vehicleInfo',
        'section-lossType',
        'section-personInjury',
        'section-accidentRescue',
        'section-contactInfo',
        'section-caseDesc',
        'section-historyReport',
        'section-propertyLoss'
      ]

      let currentSection = ''
      const scrollPosition = window.scrollY + 150 // 增加偏移量，提前切换

      for (let i = 0; i < sectionIds.length; i++) {
        const sectionId = sectionIds[i]
        const sectionElement = document.getElementById(sectionId)

        if (sectionElement) {
          const offsetTop = sectionElement.offsetTop
          const height = sectionElement.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            currentSection = sectionId.replace('section-', '')
            break
          }
        }
      }

      if (currentSection && currentSection !== this.activeSection) {
        this.activeSection = currentSection
        // 通知父组件更新激活的标签
        this.$parent && this.$parent.$data && (this.$parent.activeTab = currentSection)
      }
    },
  },
  mounted() {
    // 添加滚动事件监听器
    window.addEventListener('scroll', this.handleScroll)
  },

  beforeDestroy() {
    // 移除滚动事件监听器
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>


<style scoped>
#section-policyInfo,
#section-reportInfo,
#section-vehicleInfo,
#section-lossType,
#section-personInjury,
#section-accidentRescue,
#section-contactInfo,
#section-caseDesc,
#section-historyReport,
#section-propertyLoss {
  scroll-margin-top: 100px;
  /* 调整这个值以适应你的页面布局 */
}

.vehicle-info-section {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 16px;
  background-color: #fafafa;
  position: relative;
}

/* ============ 底部提示文字样式 ============ */
.footer-message {
  margin-top: 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #4863e7;
  text-align: left;
  line-height: 1.5;
  display: flex;
  align-items: center;
  gap: 6px;
  line-height: 1;

}

.footer-message i {
  font-size: 14px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
}

.footer-message span {
  color: #6B7AC4;
}

/* 人员伤亡统一网格布局 */
.injury-grid-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.aligned-with-sex {
  grid-column: 2 / span 1;
  /* 从第2列开始，占1列，与上面的性别字段对齐 */
}

/* 导航栏样式 */
.sidebar-nav {
  position: fixed;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
}

.nav-item {
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background-color: #f5f5f5;
}

.nav-item.active {
  background-color: #e6f7ff;
  color: #1890ff;
  font-weight: bold;
  border-left: 3px solid #1890ff;
}

/* 区块高亮样式 */
.section-header.section-highlighted {
  background-color: #e6f7ff !important;
  border-left: 4px solid #1890ff !important;
  transition: all 0.3s ease;
}

/* 区块标题装饰 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0px !important;
  cursor: pointer;
  transition: none;
  gap: 12px;
  background-color: white;
}

.section-header-other {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 0px 30px !important;
  cursor: pointer;
  transition: none;
  gap: 12px;
  background-color: white;
}

.section-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-header-right {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;

}

.iconfont {
  color: #3B4DAA;
}

/* 主题色竖条装饰 */
.section-decorator {
  width: 4px;
  height: 32px;
  background-color: #3B4DAA;
  /* 主题色 */
  border-radius: 2px;
}

/* 已选择保单标签 */
.selected-count-tag {
  margin-left: 8px;
  background-color: #faf7f7;
  color: black;
  height: 24px;
  line-height: 22px;
  font-size: 8px;
  border-radius: 10%;
}

/* 信息展示按钮 */
.btn-info-display {
  padding: 6px 12px;
  background-color: white;
  color: #111111;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;
  border: 1px solid #ddd;
}

.btn-info-display:hover {
  background-color: #e6f7ff;
  border-color: #91d5ff;
}

/* 日期选择器样式 */
.el-date-editor {
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 0;
  background-color: white;
}

.el-date-editor .el-input__inner {
  padding: 0 !important;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  height: 20px;
  line-height: 20px;
  text-align: left;
}

.el-date-editor .el-input__icon {
  font-size: 16px;
  color: #666;
  margin-right: 8px;
}

.el-date-editor .el-input__suffix {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.el-date-editor .el-input__suffix-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.el-date-editor .el-input__prefix {
  display: none;
}

/* 确保图标显示正确 */
.el-date-editor .el-input__icon {
  cursor: pointer;
  transition: all 0.2s ease;
}

.el-date-editor .el-input__icon:hover {
  color: #007bff;
}

.btn-search {
  padding: 6px 12px;
  background-color: #0887FF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  margin-left: 8px;
}

.btn-search:hover {
  background-color: #0066CC;
}

.tag-container {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  width: 100%;
  align-items: center;
  min-width: 0;
  flex: 1;
  box-sizing: border-box;

}

/* ============ 案件补充说明区块样式 ============ */
.case-desc-container {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-top: 16px;
}

.case-desc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e9ecef;
  background-color: #f8f9fa;
}

.case-desc-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-add-desc {
  padding: 8px 16px;
  background-color: #ffffff;
  color: #007bff;
  border: 1px solid #007bff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-add-desc:hover {
  background-color: #f8f9fa;
  border-color: #0056b3;
  color: #0056b3;
}

/* 表格样式 */
.case-desc-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  border: none;
}

.case-desc-table th,
.case-desc-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.case-desc-table th {
  background-color: #f8f9fa;
  font-weight: 500;
  color: #333;
  font-size: 14px;
  border-bottom: 1px solid #e9ecef;
}

.case-desc-table tr:last-child td {
  border-bottom: none;
}

/* 输入框样式 */
.desc-input {
  width: 100%;
  height: 12px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 12px;
  transition: border-color 0.2s ease;
  outline: none;
}

.desc-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
}

/* 序号列样式 */
.seq-column {
  width: 50px !important;
  font-weight: 300;
  color: #333;
  font-size: 11px !important;
  text-align: center !important;

}

/* 时间列样式 */
.time-column {
  width: 50px !important;
  color: #6c757d;
  text-align: center !important;
  font-size: 11px !important;
  text-align: center !important;


}

/* 操作员列样式 */
.operator-column {
  width: 50px !important;
  color: #6c757d;
  text-align: center !important;
  font-size: 11px !important;
  text-align: center !important;


}

/* 内容列样式 */
.content-column {
  width: calc(100% - 360px);
  height: 20px !important;
  font-size: 11px !important;
  padding: 10px 12px !important;

}

/* 财产损失信息区块样式 */

.property-loss-item {
  position: relative;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 18px;
  background-color: white;
  height: auto;
  display: block;
}

.person-injury-item {
  position: relative;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  margin-bottom: 18px;
  padding: 16px;
  background-color: white;
  height: 120px;
  display: grid;
}

.property-loss-item .form-row {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(4, 1fr);
}

.nomargin {
  margin-bottom: 0 !important;
}

.btn-add-icon {
  background-color: #F5F7FA;
  color: rgb(20, 19, 19);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 40px;
  height: 35px;
  /* 核心：加号垂直水平居中 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: normal;
  line-height: 1;
  /* 确保垂直居中 */
  padding: 0;
  margin-top: 8px;
  border-radius: 8px;
}

.desc-add-icon:focus,
.btn-remove-icon:focus,
.btn-add-icon:focus {
  outline: none;
}

.desc-add-icon:hover,
.btn-remove-icon:hover,
.btn-add-icon:hover {
  background-color: #4D9F8D;
  color: white;
}

.btn-remove-icon {
  background-color: white;
  color: rgb(20, 19, 19);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 20px;
  height: 18px;
  /* 核心：加号垂直水平居中 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  line-height: 1;
  /* 确保垂直居中 */
  padding: 0;
  margin-left: auto;
  border-radius: 4px;
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
}

.desc-add-icon {
  background-color: #F5F7FA;
  color: #333;
  border: 1px solid #E5E5E5;
  /* 匹配截图的浅边框 */
  cursor: pointer;
  transition: all 0.2s ease;
  width: auto;
  /* 自适应宽度，避免过宽 */
  height: 30px;
  /* 匹配截图按钮高度 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  /* 关键：加号和文字之间的间距，解决拥挤 */
  padding: 0 6px;
  margin: 0;
  /* 清除多余外边距，避免和两侧距离过远 */
  border-radius: 8px;
  /* 匹配截图的圆角大小 */
  font-size: 11px;
  font-weight: normal;
  line-height: 1;
  white-space: nowrap;
  /* 防止文字换行 */
}


.desc-add-icon span {
  font-weight: bold;
}

.desc-add-icon span:first-child {
  font-size: 16px;
  /* 加号字体稍大，更醒目 */
}

.float-right {
  float: right;
  margin-left: auto;
  margin-top: -15px;
  /* 调整垂直对齐 */
}


/* 保单卡片容器 */
.policy-cards-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}


/* 选中状态的保单卡片 */
.policy-card.selected {
  border: 2px solid #3B4DAA;
  /* 选中时的主题色边框 */
  box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.2);
  /* 外发光效果 */
  background-color: white;
  /* 选中背景色 */
}

/* 鼠标悬停状态 */
.policy-card.hovered {
  border-color: #3B4DAA;
  /* 悬停时加深边框颜色 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  /* 添加阴影效果 */
}

/* 选中且悬停的状态 */
.policy-card.selected.hovered {
  border-color: #3B4DAA;
  /* 选中状态下悬停更深的颜色 */
}

/* ============ 保单卡片样式 ============ */
.policy-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  padding: 16px;
  margin-bottom: 16px;
}

.policy-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.policy-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* 保单号链接样式 */
.policy-no-link {
  font-size: 11px;
  font-weight: bold;
  color: #3B4DAA;
  /* 主题色 */
  text-decoration: underline;
  /* 添加下划线 */
  display: inline-block;
  transition: color 0.2s ease;
}

.policy-no-link:hover {
  color: #0052A3;
  /* 悬停时加深颜色 */
  text-decoration: underline;
}

/* 客户信息标签行 */
.policy-tags-row {
  display: flex;
  gap: 8px;
}

/* 客户信息标签样式 */
.policy-tag {
  border-radius: 4px;
  font-size: 10px;
  height: 18px;
  line-height: 20px;
}

/* 险种名称标签样式 */
.insurance-name-tag {
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  max-width: 200px;
  /* 限制最大宽度 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  color: #0066CC;
  background-color: #afcbe9;
}

.policy-number-wrapper {
  display: flex;
  gap: 8px;
  align-items: center;
}

.policy-number {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.policy-no-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.checkmark {
  font-size: 18px;
  color: #007bff;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 2px;
}

.policy-no {
  font-size: 16px;
  font-weight: bold;
  color: #0066CC;
  border: none !important;
  background: transparent !important;
  padding: 0;
  margin: 0;
  text-align: left;
}

.policy-tags {
  display: flex;
  gap: 8px;
}

.tag {
  padding: 4px 8px;
  background-color: #f6f8f9;
  color: #101111;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid #f5f7fa;
}

.policy-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-text {
  font-size: 14px;
  color: #666;
}

.btn-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  color: #999;
}

.icon {
  font-size: 12px;
  margin-right: 4px;
}

.policy-body {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.info-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  width: 100%;
}

.info-item label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #666;
  font-weight: 500;
  font-family: 'Geist', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  white-space: nowrap;
  margin: 0;
  justify-content: flex-start;
}


.info-item .value {
  display: block;
  font-size: 12px;
  color: #333;
  word-break: break-all;
  overflow-wrap: break-word;
  line-height: 1.4;
  margin: 0;
  padding: 0;
  width: 100%;
  text-align: left;
  padding-left: 20px;
  box-sizing: border-box;
  font-weight: bold;

}

/* 图标样式（可替换为实际图标库） */
.icon-user {
  display: inline-block;
  width: 9px;
  height: 14px;
  background-image: url('@/assets/icons/user.svg');
  background-size: 9px 14px;
}

.icon-user-t {
  display: inline-block;
  width: 14px;
  height: 14px;
  background-image: url('@/assets/icons/user.svg');
  background-size: 14px 14px;
}

.icon-history {
  display: inline-block;
  width: 15px;
  height: 15px;
  background-image: url('@/assets/icons/history.svg');
  background-size: 15px 15px;
}

.icon-agent::before {
  content: "💼";
}

.icon-insurance::before {
  content: "📄";
}

.icon-calendar::before {
  content: "📅";
}

.icon-clock::before {
  content: "⏰";
}

.icon-company::before {
  content: "🏢";
}

.icon-work::before {
  content: "🏢";
}

.icon-source::before {
  content: "📍";
}

.icon-star::before {
  content: "⭐";
}

.icon-specialist::before {
  content: "👨‍💼";
}

.icon-phone::before {
  content: "📞";
}

/* 响应式调整 */
@media (max-width: 768px) {

  .policy-body,
  .info-row {
    grid-template-columns: 1fr;
  }

  .info-item {
    width: 100%;
  }
}

/* ============ 历史报案记录样式 ============ */
.section-header.no-border {
  border-bottom: none;
  transition: none;
}

.section-header.no-border:hover {
  background-color: white;
  /* 保持原始背景色，无变化 */
}

.record-count {
  font-size: 10px;
  color: black;
  background-color: #f0f0f0;
  padding: 2px 8px;
  border-radius: 6px;

}

/* 表格容器 */
.report-table-container {
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* 表格样式 */
.data-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 100%;
  table-layout: auto;
}

.data-table th {
  text-align: left;
  padding: 10px 6px;
  background-color: #f8f9fa;
  /* 表头背景色 */
  border-bottom: 1px solid #e1e5e9;
  font-size: 11px;
  color: #333;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 20px;
  /* 为每列设置最小宽度 */
  font-weight: bold;
}

.data-table td {
  padding: 2px 3px;
  border-bottom: 1px solid #eee;
  font-size: 11px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  height: 20px;
  /* 设置固定行高 */
  min-width: 20px;
  /* 为每列设置最小宽度 */

}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

/* 针对不同列设置最小宽度 */
.col-seq {
  min-width: 10px !important;
  width: 10px !important;
  text-align: center;

}

.col-report-no {
  min-width: 140px;
  width: auto;
}

.col-policy-no {
  min-width: 120px;
  width: auto;
}

.col-accident-time {
  min-width: 130px;
  width: auto;
}

.col-report-time {
  min-width: 130px;
  width: auto;
}

.col-reporter {
  min-width: 80px;
  width: auto;
}

.col-fast-claim {
  min-width: 100px;
  width: auto;
}

.col-status {
  min-width: 80px;
  width: auto;
}

/* 序号列居中对齐 */
.seq-center {
  text-align: center !important;
}


/* 表格行悬停效果 */
.table-row:hover {
  background-color: #f5f9ff;
  /* 悬停背景色 */
  transition: background-color 0.2s ease;
}

.report-link {
  color: #3B4DAA;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: flex-start;
  font-weight: bold;

}

.report-link:hover {
  text-decoration: underline;
}

.icon-link {
  font-size: 12px;
  color: #007bff;
}

.empty-cell {
  color: #999;
  font-style: normal;
}

/* 状态标签样式 */
.status-tag {
  border-radius: 12px;
  font-size: 9px;
  font-weight: bold;
  padding: 2px 6px;
  height: auto;
  line-height: normal;
}

/* 已提交：绿色系 */
.status-submitted {
  background-color: #e8f7ef;
  color: #1db369;
  border-color: #1db369;
}

/* 处理中：黄色/警告色 */
.status-processing {
  background-color: #fffbeb;
  color: #f5a623;
  border-color: #f5a623;
}

/* 已完成：主题色 */
.status-completed {
  background-color: #e6f7ff;
  color: #1890ff;
  border-color: #1890ff;
}

/* ============ 损失类型信息区块样式 ============ */


.loss-type-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 12px;
  align-items: center;
}

.loss-type-item {
  min-width: auto;
  /* 取消最小宽度限制 */
  max-width: none;
  /* 取消最大宽度限制 */
}

/* ============ 联系人信息区块样式 ============ */
.contact-info-section {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.contact-info-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 12px 16px;
  background-color: #f8f9fa;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.2s;
  gap: 12px;
}

.contact-info-header:hover {
  background-color: #e8f4fc;
}

.contact-info-header h3 {
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
  margin-left: auto;
}

.toggle-icon i {
  font-size: 10px;
  /* 调整图标大小 */
}

.contact-info-content {
  padding: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.contact-form-row {
  display: grid;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  grid-template-columns: repeat(4, 1fr);

}

/* 分割线样式 */
.divider-line {
  height: 1px;
  background-color: #ddd;
  margin: 16px 0;
  /* 上下间距 */
}

/* ============ 事故救援样式 ============ */
.rescue-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.rescue-vehicle-section {
  flex: 1;
  min-width: 300px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  background-color: #fafafa;
  text-align: left;
  /* 确保内容左对齐 */
}

.rescue-vehicle-header {
  margin-bottom: 16px;
  padding-bottom: 8px;
  text-align: left;
  /* 确保标题左对齐 */
}

.rescue-vehicle-header h4 {
  margin: 0;
  color: #333;
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  /* 确保标题文字左对齐 */
}

.rescue-checkbox-group {
  display: grid;
  gap: 10px 4px;
  flex-wrap: wrap;
  grid-template-columns: auto auto auto;
}



.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

/* 使用更具体的选择器来覆盖其他样式 */
.form-section .checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  color: #333;
  margin-bottom: 0;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid #ddd;
}

.rescue-checkbox-group .checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 11px;
  color: #333;
  margin-bottom: 0;
  text-align: left;
  white-space: nowrap;
  border: 1px solid #ddd;
  padding: 6px 10px;
  gap: 4px;
  /* 复选框和文字之间的间距 */
  border-radius: 8px;
  width: fit-content;
  background-color: white;
}


.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 10px;
  color: #333;
  margin-bottom: 0;
  text-align: left;
  /* 确保标签文字左对齐 */
  white-space: nowrap;
  /* 防止文字换行 */
}

.loss-checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 11px;
  color: #333;
  margin-bottom: 0;
  text-align: left;
  white-space: nowrap;
  border: 1px solid #ddd;
  padding: 6px 10px;
  gap: 4px;
  /* 复选框和文字之间的间距 */
  border-radius: 8px;
  width: fit-content;
  background-color: white;
  font-weight: bold;
}

.checkbox-label input {
  margin-right: 8px;
}

/* 单选框组也左对齐 */
.radio-group {
  display: flex;
  gap: 16px;
  align-items: center;
  text-align: left;
  height: 20px;
  /* 确保文字左对齐 */
}

.radio-group.height {
  display: flex;
  gap: 16px;
  align-items: center;
  text-align: left;
  height: 40px;
  /* 确保文字左对齐 */
}

/* ============ 表单行样式 ============ */
.form-row {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  align-items: flex-start;
}

.form-group {
  margin-bottom: 16px;
  min-width: 80px;
}

.vehicle.form-group {
  margin-bottom: 1px;
  min-width: 80px;
}


.contact-form-group {
  display: flex;
  flex-direction: column;
  /* 核心：垂直排列（文字在上，下拉框在下） */
  align-items: flex-start;
  /* 核心：左侧对齐（文字和下拉框左边缘齐平） */
}

.contact-form-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 11px;
  color: #333;
  font-weight: bold;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 11px;
  color: #333;
  font-weight: bold;
  text-align: left;
}

.form-group.full-width {
  width: 100%;
  flex: 1;
}

.form-input {
  width: 100%;
  padding: 8px 2px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 11px;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  box-sizing: border-box;

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

/* ============ 响应式适配 ============ */
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions button {
    width: 100%;
  }
}

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

.textarea {
  resize: vertical;
  min-height: 80px;
}

.select-sm {
  width: auto;
  min-width: 180px;
  padding-right: 1rem !important;
  /* 强制生效 */
  padding-left: 0.5rem !important;
  /* 强制生效 */

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='6' viewBox='0 0 12 8'%3E%3Cpath fill='%23666' d='M10.8 1.2L6 6 1.2 1.2 0 2.4l6 6 6-6z'/%3E%3C/svg%3E") no-repeat right 0.5rem center;
  background-color: #ffffff;
  box-sizing: border-box !important;
  border: 1px solid #ddd;
  /* 补充基础样式，避免样式缺失 */
}

/* ============ 表单行样式 ============ */

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
  text-align: left;
}

.radio-label input,
.checkbox-label input {
  margin-right: 6px;
  background-color: #3B4DAA !important;
  /* 选中时的填充色 */

}

/* 单选框选中状态 */
input[type="radio"]:checked {
  background-color: #3B4DAA !important;
  /* 设置选中时的填充色 */
  border-color: #3B4DAA;
  /* 边框颜色也要设置 */
}

/* ============ 复选框样式 ============ */
.checkbox-input {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 4px;
  appearance: none;
  -webkit-appearance: none;
  background-color: white;
  transition: all 0.2s ease;
  margin-top: 6px;
}

.checkbox-input:checked {
  background-color: #3B4DAA;
  border-color: #3B4DAA;
}

.checkbox-input:checked::after {
  content: "✓";
  display: block;
  color: white;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
}

/* ============ 区块样式 ============ */
.form-section {
  margin-bottom: 20px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #ddd;
}

.form-section-policy {
  margin-bottom: 20px;
  border-radius: 4px;
  overflow: hidden;
}



.section-header h3 {
  margin: 0;
  font-size: 13px;
  color: #333;
}

.section-header-other h3 {
  margin: 0;
  font-size: 13px;
  color: #333;
  gap: 5px;
  display: flex;
  align-items: center;

}

.section-content {
  overflow: hidden;
  transition: all 0.3s ease;
}


/* ============ 按钮样式 ============ */
.case-info-form {
  min-height: calc(100vh - 60px);
  /* 减去页面其他部分的高度 */
  display: flex;
  flex-direction: column;
  padding-bottom: 0px;
}

/* 固定在底部的按钮区域 */
.form-actions-sticky {
  position: fixed;
  bottom: 20px;
  /* 距离页面底部20px */
  z-index: 200;
  /* 确保在所有内容之上 */
  height: 40px;
  background-color: #ffffff;
  border-top: 1px solid #858789;
  /* 上部边框 */
  border-bottom: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  width: 100%;
  display: flex;
  gap: 16px;
  padding: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .form-actions-sticky {
    position: fixed;
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
    flex-direction: row;
    justify-content: center;
  }
}

.btn-submit {
  padding: 10px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
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
  font-size: 12px;
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
  font-size: 12px;
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
  background-color: white;
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