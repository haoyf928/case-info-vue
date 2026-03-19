  <!-- src/components/CaseInfoForm.vue -->
  <template>
    <div class="case-info-form">

      <!-- ============ 保单信息区块 ============ -->
      <section class="form-section" id="section-policyInfo">
        <div class="section-header">
          <h3> 保单信息</h3>
          <span class="toggle-icon" @click="toggleSection('policyInfo')">
            <i :class="policyInfoExpanded ? 'iconfont icon-arrow-down' : 'iconfont icon-shouqi'"></i>
          </span>
        </div>

        <div v-show="policyInfoExpanded" class="section-content">
          <!-- 卡片容器 -->
          <div class="policy-card">
            <!-- 顶部信息行 -->
            <div class="policy-header">
              <div class="policy-number-wrapper">
                <input type="checkbox" v-model="caseInfo.selected" class="checkbox-input" />
                <div class="policy-number">
                  <div class="policy-no-row">
                    <input type="text" v-model="caseInfo.policyNo" readonly class="form-input policy-no" />
                  </div>
                  <div class="policy-tags">
                    <span class="tag">一般客户</span>
                    <span class="tag">新客户</span>
                  </div>

                </div>
              </div>
              <div class="policy-title">
                <span class="title-text">{{ caseInfo.insuranceName }}</span>
                <span class="toggle-icon" @click="toggleSection('policyBody')">
                  <i :class="policyBodyExpanded ? 'iconfont icon-arrow-down' : 'iconfont icon-shouqi'"></i>
                </span>
              </div>
            </div>

            <!-- 主体信息网格 -->
            <div class="policy-body" v-show="policyBodyExpanded" id="policyBody">
              <!-- 第 1 行：3 个字段 -->
              <div class="info-item">
                <label><i class="iconfont icon-yonghu"></i> 投保人名称</label>
                <div class="value">{{ caseInfo.appliName }}</div>
              </div>
              <div class="info-item">
                <label><i class="iconfont icon-yonghu"></i> 被保人名称</label>
                <div class="value">{{ caseInfo.insuredName }}</div>
              </div>
              <div class="info-item">
                <label><i class="iconfont icon-shield"></i> 代理人名称</label>
                <div class="value">{{ caseInfo.agentName }}</div>
              </div>

              <!-- 第 2 行：3 个字段 -->
              <div class="info-item">
                <label><i class="iconfont icon-wendang"></i> 险种名称</label>
                <div class="value">{{ caseInfo.insuranceName }}</div>
              </div>
              <div class="info-item">
                <label><i class="iconfont icon-shijiankaishishijian"></i> 保险起期</label>
                <div class="value">{{ caseInfo.policyStartDateStr }}</div>
              </div>
              <div class="info-item">
                <label><i class="iconfont icon-shijiankaishishijian"></i> 保险止期</label>
                <div class="value">{{ caseInfo.policyEndDateStr }}</div>
              </div>

              <!-- 第 3 行：3 个字段 -->
              <div class="info-item">
                <label><i class="iconfont icon-shijiankaishishijian"></i> 保险日期止期</label>
                <div class="value">{{ caseInfo.policyEndDateStr }}</div>
              </div>
              <div class="info-item">
                <label><i class="iconfont icon-jigou"></i> 承保机构</label>
                <div class="value">{{ caseInfo.insurerName }}</div>
              </div>
              <div class="info-item">
                <label><i class="iconfont icon-commpany"></i> 工作单位</label>
                <div class="value">{{ caseInfo.workUnit || '-' }}</div>
              </div>

              <!-- 第 4 行：3 个字段 -->
              <div class="info-item">
                <label><i class="iconfont icon-dingwei"></i> 客户来源</label>
                <div class="value">{{ caseInfo.customerSource || '-' }}</div>
              </div>
              <div class="info-item">
                <label><i class="iconfont icon-yonghu"></i> 客户标识</label>
                <div class="value">{{ caseInfo.customerTag || '-' }}</div>
              </div>
              <div class="info-item">
                <label><i class="iconfont icon-shoucang"></i> 客户等级</label>
                <div class="value">{{ caseInfo.customerLevel || '-' }}</div>
              </div>

              <!-- 第 5 行：3 个字段 -->
              <div class="info-item">
                <label><i class="iconfont icon-yonghu"></i> 专员名称</label>
                <div class="value">{{ caseInfo.specialistName || '-' }}</div>
              </div>
              <div class="info-item">
                <label><i class="iconfont icon-Telephone"></i> 专员电话</label>
                <div class="value">{{ caseInfo.specialistPhone || '-' }}</div>
              </div>
              <div class="info-item">
                <label><i class="iconfont icon-shoucang"></i> 服务等级</label>
                <div class="value">{{ caseInfo.serviceLevel || '-' }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ 历史报案记录区块 ============ -->
      <section class="form-section" id="section-historyReport">
        <div class="section-header">
          <h3><i class="icon-history"></i> 历史报案记录</h3>
          <span class="record-count">{{ historyReports.length }} 条记录</span>
          <span class="toggle-icon" @click="toggleSection('historyReport')">
            <i :class="historyReportExpanded ? 'iconfont icon-arrow-down' : 'iconfont icon-shouqi'"></i>
          </span>
        </div>

        <div v-show="historyReportExpanded" class="section-content">
          <div class="report-table">
            <table class="data-table">
              <thead>
                <tr>
                  <th>序号</th>
                  <th>报案号</th>
                  <th>保单号</th>
                  <th>出险时间</th>
                  <th>报案时间</th>
                  <th>报案人</th>
                  <th>快赔案件编号</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in historyReports" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <a href="#" class="report-link" @click.prevent="handleReportClick(item.reportNo)">
                      {{ item.reportNo }}
                      <svg t="1773716425571" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="45920" width="10" height="10">
                        <path
                          d="M783.530667 861.013333H162.901333V240.554667h310.272V162.986667H85.333333V938.666667h775.68V550.826667h-77.482666z"
                          fill="#0887FF" p-id="45921"></path>
                        <path
                          d="M550.826667 85.333333v77.653334h255.146666L407.296 562.346667l54.272 54.357333 399.530667-398.677333v255.146666H938.666667V85.333333z"
                          fill="#0887FF" p-id="45922"></path>
                      </svg>
                    </a>
                  </td>
                  <td>{{ item.policyNo }}</td>
                  <td>{{ item.accidentTime }}</td>
                  <td>{{ item.reportTime }}</td>
                  <td>{{ item.reporter }}</td>
                  <td><span class="empty-cell">-</span></td>
                  <td>
                    <span class="status-badge status-submitted">已提交</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ============ 报案信息区块 ============ -->
      <section class="form-section" id="section-reportInfo">
        <div class="section-header"">
          <h3><i class=" iconfont icon-bianji-wenjian-bianji" style="color: #0056a4 ;"></i> 报案信息</h3>
        </div>

        <div v-show="reportInfoExpanded" class="section-content">
          <!-- 第一行：出险时间 & 报案时间 -->
        <div class="contact-form-row">
          <!-- 出险时间 - 使用 ElDatePicker -->
          <div class="form-group">
            <label><i class="iconfont icon-shijiankaishishijian"></i> 出险时间 </label>
            <el-date-picker
              v-model="caseInfo.accidentTime"
              type="datetime"
              format="YYYY/MM/DD HH:mm:ss"
              value-format="YYYY/MM/DD HH:mm:ss"
              placeholder="选择出险时间"
              prefix-icon="_"
              clear-icon="_"
              :class="{ 'input-error': validationErrors.accidentTime }"
              style="width: 100%;">
            </el-date-picker>
            <span v-if="validationErrors.accidentTime" class="error-message">
              {{ validationErrors.accidentTime }}
            </span>
          </div>

          <!-- 报案时间 - 同样可以使用 ElDatePicker -->
          <div class="form-group">
            <label><i class="iconfont icon-shijiankaishishijian"></i> 报案时间</label>
            <el-date-picker
              v-model="caseInfo.reportTime"
              type="datetime"
              format="YYYY/MM/DD HH:mm:ss"
              value-format="YYYY/MM/DD HH:mm:ss"
              placeholder="选择报案时间"
              prefix-icon="_"
              clear-icon="_"
              :class="{ 'input-error': validationErrors.reportTime }"
              style="width: 100%;">
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
                  <input type="radio" v-model="caseInfo.isfirstsiteFlag" value="1" /> 是
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="caseInfo.isfirstsiteFlag" value="0" /> 否
                </label>
              </div>
            </div>

            <div class="form-group">
              <label><i class="iconfont icon-yun"></i> 天气情况</label>
              <select v-model="caseInfo.weatherSituation" ref="weatherSituation"
                :class="{ 'input-error': validationErrors.weatherSituation }" class="form-input">
                <option value="">请选择</option>
                <option value="0">晴</option>
                <option value="1">阴</option>
                <option value="2">雨</option>
                <option value="3">雪</option>
                <option value="4">雾</option>
                <option value="9">其他</option>
              </select>
            </div>

            <div class="form-group">
              <label><i class="iconfont icon-tishi"></i> 出险地点分类 </label>
              <select v-model="caseInfo.damageLocationType" ref="damageLocationType"
                :class="{ 'input-error': validationErrors.damageLocationType }" class="form-input">
                <option value="">请选择</option>
                <option value="0">道路</option>
                <option value="1">停车场</option>
                <option value="2">小区</option>
                <option value="3">其他</option>
              </select>
            </div>
          </div>

          <!-- 第三行：出险地点（省市区街道门牌号）+ 路名索检 -->
          <div class="form-row">
            <div class="form-group">
              <label><i class="iconfont icon-dingwei"></i> 出险地点 <span class="required">*</span></label>
              <div class="address-inputs">
                <select v-model="caseInfo.areaProvince" ref="areaProvince"
                  :class="{ 'input-error': validationErrors.areaProvince }" class="form-input select-sm">
                  <option value="">请选择省</option>
                  <option value="11">北京市</option>
                  <option value="31">上海市</option>
                  <option value="33">浙江省</option>
                </select>

                <select v-model="caseInfo.areaCity" ref="areaCity" :class="{ 'input-error': validationErrors.areaCity }"
                  class="form-input select-sm">
                  <option value="">请选择市</option>
                </select>

                <select v-model="caseInfo.areaDistrict" ref="areaDistrict"
                  :class="{ 'input-error': validationErrors.areaDistrict }" class="form-input select-sm">
                  <option value="">请选择区</option>
                </select>

                <input type="text" v-model="caseInfo.street" ref="street"
                  :class="{ 'input-error': validationErrors.street }" placeholder="街道" class="form-input" />

                <input type="text" v-model="caseInfo.doorNumber" ref="doorNumber"
                  :class="{ 'input-error': validationErrors.doorNumber }" placeholder="门牌号" class="form-input" />

                <button type="button" class="btn-search" @click="searchAddress">
                  <i class="iconfont icon-dingwei"></i> 路名索检
                </button>
              </div>
              <span v-if="validationErrors.damageAddress" class="error-message">
                {{ validationErrors.damageAddress }}
              </span>
            </div>
            <div class="form-group">
              <label>客户提供位置信息不准</label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="caseInfo.isfirstsiteFlag" value="1" /> 是
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="caseInfo.isfirstsiteFlag" value="0" /> 否
                </label>
              </div>
            </div>
          </div>

          <!-- 第四行：经纬度 -->
          <div class="form-row">
            <div class="form-group">
              <label>经度 <span class="required">*</span></label>
              <input type="number" step="0.000001" v-model="caseInfo.longitude" ref="longitude"
                :class="{ 'input-error': validationErrors.longitude }" class="form-input" />
            </div>

            <div class="form-group">
              <label>纬度 <span class="required">*</span></label>
              <input type="number" step="0.000001" v-model="caseInfo.latitude" ref="latitude"
                :class="{ 'input-error': validationErrors.latitude }" class="form-input" />
            </div>
          </div>

          <!-- 第五行：车辆目前所在地 -->
          <div class="form-row">
            <div class="form-group full-width">
              <label><i class="iconfont icon-dingwei"></i> 车辆目前所在地 <span class="required">*</span></label>
              <div class="address-inputs">
                <select v-model="caseInfo.currentAreaProvince" ref="currentAreaProvince"
                  :class="{ 'input-error': validationErrors.currentAreaProvince }" class="form-input select-sm">
                  <option value="">请选择省</option>
                  <option value="11">北京市</option>
                  <option value="31">上海市</option>
                  <option value="33">浙江省</option>
                </select>

                <select v-model="caseInfo.currentAreaCity" ref="currentAreaCity"
                  :class="{ 'input-error': validationErrors.currentAreaCity }" class="form-input select-sm">
                  <option value="">请选择市</option>
                </select>

                <select v-model="caseInfo.currentAreaDistrict" ref="currentAreaDistrict"
                  :class="{ 'input-error': validationErrors.currentAreaDistrict }" class="form-input select-sm">
                  <option value="">请选择区</option>
                </select>

                <input type="text" v-model="caseInfo.currentStreet" ref="currentStreet"
                  :class="{ 'input-error': validationErrors.currentStreet }" placeholder="街道" class="form-input" />

                <input type="text" v-model="caseInfo.currentDoorNumber" ref="currentDoorNumber"
                  :class="{ 'input-error': validationErrors.currentDoorNumber }" placeholder="门牌号" class="form-input" />

                <button type="button" class="btn-search" @click="searchCurrentAddress">
                  <i class="iconfont icon-dingwei"></i> 路名索检
                </button>
              </div>
            </div>
          </div>

          <!-- 第六行：车辆目前所在地经纬度 -->
          <div class="form-row">
            <div class="form-group">
              <label>车辆目前所在地经度 <span class="required">*</span></label>
              <input type="number" step="0.000001" v-model="caseInfo.currentLongitude" ref="currentLongitude"
                :class="{ 'input-error': validationErrors.currentLongitude }" class="form-input" />
            </div>

            <div class="form-group">
              <label>车辆目前所在地纬度 <span class="required">*</span></label>
              <input type="number" step="0.000001" v-model="caseInfo.currentLatitude" ref="currentLatitude"
                :class="{ 'input-error': validationErrors.currentLatitude }" class="form-input" />
            </div>
          </div>

          <!-- 第七行：出险经过 -->
          <div class="form-row">
            <div class="form-group full-width">
              <label>出险经过 <span class="required">*</span></label>
              <textarea v-model="caseInfo.accidentDescription" rows="3" class="form-input"
                placeholder="请详细描述出险经过..."></textarea>
            </div>
          </div>

          <!-- 第八行：多列下拉选择 -->
          <div class="contact-form-row">
            <div class="form-group">
              <label>险因类型 <span class="required">*</span></label>
              <select v-model="caseInfo.lsType" ref="lsType" :class="{ 'input-error': validationErrors.lsType }"
                class="form-input">
                <option value="">请选择</option>
                <option value="01">碰撞</option>
                <option value="02">倾覆</option>
                <option value="03">火灾</option>
                <option value="04">爆炸</option>
                <option value="05">盗抢</option>
              </select>
            </div>

            <div class="form-group">
              <label>保险事故分类 <span class="required">*</span></label>
              <select v-model="caseInfo.damageCode" ref="damageCode"
                :class="{ 'input-error': validationErrors.damageCode }" class="form-input">
                <option value="">请选择</option>
                <option value="01">单方事故</option>
                <option value="02">双方事故</option>
                <option value="03">多方事故</option>
              </select>
            </div>

            <div class="form-group">
              <label>出险原因 <span class="required">*</span></label>
              <select v-model="caseInfo.accidentCause" ref="accidentCause"
                :class="{ 'input-error': validationErrors.accidentCause }" class="form-input">
                <option value="">请选择</option>
                <option value="0">未按规定让行</option>
                <option value="1">违反交通信号灯</option>
                <option value="2">超速行驶</option>
                <option value="3">酒后驾驶</option>
                <option value="4">其他</option>
              </select>
            </div>

            <div class="form-group">
              <label>事故处理部门 <span class="required">*</span></label>
              <select v-model="caseInfo.handleDepartment" ref="handleDepartment"
                :class="{ 'input-error': validationErrors.handleDepartment }" class="form-input">
                <option value="">请选择</option>
                <option value="0">交警</option>
                <option value="1">保险公司</option>
                <option value="2">第三方调解</option>
              </select>
            </div>
          </div>

          <!-- 第九行 -->
          <div class="contact-form-row">
            <div class="form-group">
              <label>事故处理类型 <span class="required">*</span></label>
              <select v-model="caseInfo.handleType" ref="handleType"
                :class="{ 'input-error': validationErrors.handleType }" class="form-input">
                <option value="">请选择</option>
                <option value="0">快赔</option>
                <option value="1">定损</option>
                <option value="2">诉讼</option>
              </select>
            </div>

            <div class="form-group">
              <label>事故责任 <span class="required">*</span></label>
              <select v-model="caseInfo.responsibility" ref="responsibility"
                :class="{ 'input-error': validationErrors.responsibility }" class="form-input">
                <option value="">请选择</option>
                <option value="0">全责</option>
                <option value="1">主责</option>
                <option value="2">同责</option>
                <option value="3">次责</option>
                <option value="4">无责</option>
              </select>
            </div>

            <div class="form-group">
              <label>驾驶员是否被保险人 <span class="required">*</span></label>
              <select v-model="caseInfo.driverIsInsured" ref="driverIsInsured"
                :class="{ 'input-error': validationErrors.driverIsInsured }" class="form-input">
                <option value="">请选择</option>
                <option value="0">否</option>
                <option value="1">是</option>
              </select>
            </div>

            <div class="form-group">
              <label>被保险人证件类型 <span class="required">*</span></label>
              <select v-model="caseInfo.insuredCertType" ref="insuredCertType"
                :class="{ 'input-error': validationErrors.insuredCertType }" class="form-input">
                <option value="">请选择</option>
                <option value="124001">居民身份证或驾驶证</option>
                <option value="124002">护照</option>
              </select>
            </div>
          </div>

          <!-- 第十行 -->
          <div class="contact-form-row">
            <div class="form-group">
              <label>紧急程度 <span class="required">*</span></label>
              <select v-model="caseInfo.emergencyLevel" ref="emergencyLevel"
                :class="{ 'input-error': validationErrors.emergencyLevel }" class="form-input">
                <option value="">请选择</option>
                <option value="0">普通</option>
                <option value="1">紧急</option>
                <option value="2">重大</option>
              </select>
            </div>

            <div class="form-group">
              <label>是否异地 <span class="required">*</span></label>
              <select v-model="caseInfo.isOutProvince" ref="isOutProvince"
                :class="{ 'input-error': validationErrors.isOutProvince }" class="form-input">
                <option value="">请选择</option>
                <option value="0">否</option>
                <option value="1">是</option>
              </select>
            </div>

            <div class="form-group">
              <label>是否微信理赔 <span class="required">*</span></label>
              <select v-model="caseInfo.isWeChatClaim" ref="isWeChatClaim"
                :class="{ 'input-error': validationErrors.isWeChatClaim }" class="form-input">
                <option value="">请选择</option>
                <option value="0">否</option>
                <option value="1">是</option>
              </select>
            </div>

            <div class="form-group">
              <label>事故原因 <span class="required">*</span></label>
              <select v-model="caseInfo.accidentReason" ref="accidentReason"
                :class="{ 'input-error': validationErrors.accidentReason }" class="form-input">
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
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="caseInfo.isAlarm" value="1" /> 是
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="caseInfo.isAlarm" value="0" /> 否
                </label>
              </div>
            </div>
<div class="form-group">
            <label><i class="iconfont icon-shijiankaishishijian"></i> 报警时间 </label>
            <el-date-picker
              v-model="caseInfo.alarmTime"
              type="datetime"
              format="YYYY/MM/DD HH:mm:ss"
              value-format="YYYY/MM/DD HH:mm:ss"
              placeholder="选择报警时间"
              prefix-icon="_"
              clear-icon="_"
              :class="{ 'input-error': validationErrors.alarmTime }"
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
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="caseInfo.isDisaster" value="1" /> 是
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="caseInfo.isDisaster" value="0" /> 否
                </label>
              </div>
            </div>

            <div class="form-group">
              <label>巨灾类型 <span class="required">*</span></label>
              <select v-model="caseInfo.disasterType" ref="disasterType"
                :class="{ 'input-error': validationErrors.disasterType }" class="form-input">
                <option value="">请选择</option>
                <option value="0">地震</option>
                <option value="1">洪水</option>
                <option value="2">台风</option>
                <option value="3">火灾</option>
              </select>
            </div>

            <div class="form-group">
              <label>巨灾名称 <span class="required">*</span></label>
              <input type="text" v-model="caseInfo.disasterName" ref="disasterName"
                :class="{ 'input-error': validationErrors.disasterName }" class="form-input" />
            </div>
          </div>

          <!-- 第十三行：是否需现场查勘 -->
          <div class="contact-form-row">
            <div class="form-group">
              <label>是否需现场查勘 <span class="required">*</span></label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="caseInfo.isOnSiteSurvey" value="1" /> 是
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="caseInfo.isOnSiteSurvey" value="0" /> 否
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

      <!-- ============ 事故救援区块 ============ -->
      <section class="form-section" id="section-accidentRescue">
        <div class="section-header">
          <h3><i class="iconfont icon-wuliuqiache" style="color: #0056a4 ;"></i> 事故救援</h3>
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
                    <input type="radio" v-model="rescueInfo[0].isNormalRun" value="1" /> 能
                  </label>
                  <label class="radio-label">
                    <input type="radio" v-model="rescueInfo[0].isNormalRun" value="0" /> 不能
                  </label>
                </div>
              </div>

              <!-- 标的车事故救援选项 -->
              <div class="form-group">
                <label>标的车事故救援</label>
                <div class="rescue-checkbox-group">
                  <label class="checkbox-label">
                    <input type="checkbox" v-model="rescueInfo[0].hasCarDamageInsurance" /> 标的车保有车损险
                  </label>
                  <label class="checkbox-label">
                    <input type="checkbox" v-model="rescueInfo[0].isFullLiability" /> 标的车全责
                  </label>
                  <label class="checkbox-label">
                    <input type="checkbox" v-model="rescueInfo[0].confirmedCompensation" /> 车损险确认理赔
                  </label>
                  <label class="checkbox-label">
                    <input type="checkbox" v-model="rescueInfo[0].fiftyKm" /> 拖车50KM内
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
                    <input type="radio" v-model="rescueInfo[1].isNormalRun" value="1" /> 能
                  </label>
                  <label class="radio-label">
                    <input type="radio" v-model="rescueInfo[1].isNormalRun" value="0" /> 不能
                  </label>
                </div>
              </div>

              <!-- 三者车事故救援选项 -->
              <div class="form-group">
                <label>三者车事故救援</label>
                <div class="rescue-t-checkbox-group">
                  <label class="checkbox-label">
                    <input type="checkbox" v-model="rescueInfo[1].hasThirdPartyInsurance" /> 保有交强险及商业三者险
                  </label>
                  <label class="checkbox-label">
                    <input type="checkbox" v-model="rescueInfo[1].isNoFault" /> 三者车无责
                  </label>
                  <label class="checkbox-label">
                    <input type="checkbox" v-model="rescueInfo[1].confirmedThirdPartyCompensation" /> 商业三者险确认理赔
                  </label>
                  <label class="checkbox-label">
                    <input type="checkbox" v-model="rescueInfo[1].fiftyKm" /> 拖车50KM内
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ 报案人，联系人姓名区块 ============ -->
      <section class="form-section" id="section-contactInfo">
        <div class="section-header">
          <h3><i class="iconfont icon-yonghu" style="color: #0056a4 ;"></i> 报案人姓名、联系人姓名</h3>
        </div>

        <div v-show="contactInfoExpanded" class="section-content">
          <!-- 第一行：4个字段 -->
          <div class="contact-form-row">
            <div class="form-group">
              <label>报案人姓名 <span class="required">*</span></label>
              <input type="text" v-model="caseInfo.reportorName" ref="reportorName"
                :class="{ 'input-error': validationErrors.reportorName }" class="form-input" />
              <span v-if="validationErrors.reportorName" class="error-message">
                {{ validationErrors.reportorName }}
              </span>
            </div>

            <div class="form-group">
              <label>报案电话 <span class="required">*</span></label>
              <input type="text" v-model="caseInfo.reportorPhonenumber" ref="reportorPhonenumber"
                :class="{ 'input-error': validationErrors.reportorPhonenumber }" class="form-input"
                placeholder="手机号或固定电话" />
              <span v-if="validationErrors.reportorPhonenumber" class="error-message">
                {{ validationErrors.reportorPhonenumber }}
              </span>
            </div>

            <div class="form-group">
              <label>报案人跟被保险人关系 <span class="required">*</span></label>
              <select v-model="caseInfo.reporterRelation" ref="reporterRelation"
                :class="{ 'input-error': validationErrors.reporterRelation }" class="form-input">
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
              <select v-model="caseInfo.reporterCertType" class="form-input">
                <option value="">请选择</option>
                <option value="124001">身份证</option>
                <option value="124002">护照</option>
                <option value="124003">驾驶证</option>
              </select>
            </div>
          </div>

          <!-- 第二行：1个字段 -->
          <div class="contact-form-row">
            <div class="form-group">
              <label>报案人证件号码</label>
              <input type="text" v-model="caseInfo.reporterCertNo" class="form-input" />
            </div>
          </div>
          <!-- 分割线 -->
          <div class="divider-line"></div>
          <!-- 第三行：4个字段 -->
          <div class="contact-form-row">
            <div class="form-group">
              <label>现场联系人姓名 <span class="required">*</span></label>
              <input type="text" v-model="caseInfo.linkerName" ref="linkerName"
                :class="{ 'input-error': validationErrors.linkerName }" class="form-input" />
              <span v-if="validationErrors.linkerName" class="error-message">
                {{ validationErrors.linkerName }}
              </span>
            </div>

            <div class="form-group">
              <label>现场联系人电话 <span class="required">*</span></label>
              <input type="text" v-model="caseInfo.linkerPhone" ref="linkerPhone"
                :class="{ 'input-error': validationErrors.linkerPhone }" class="form-input" />
              <span v-if="validationErrors.linkerPhone" class="error-message">
                {{ validationErrors.linkerPhone }}
              </span>
            </div>

            <div class="form-group">
              <label>联系人手机</label>
              <input type="text" v-model="caseInfo.linkerMobile" class="form-input" />
            </div>
            <div class="form-group">
              <label>受理人编码 <span class="required">*</span></label>
              <input type="text" v-model="caseInfo.handlerCode" class="form-input" />
            </div>
          </div>
        </div>
      </section>
      <!-- ============ 车辆信息区块 ============ -->
      <section class="form-section" id="section-vehicleInfo">
        <div class="section-header">
          <h3><i class="iconfont icon-qicheSUV" style="color: #0056a4 ;"></i> 涉案车辆信息</h3>
          <button type="button" class="btn-add-icon float-right">
            <span>+</span>
          </button>
        </div>

        <div v-show="vehicleInfoExpanded" class="section-content">
          <!-- 第一行：是否要求代位 -->
          <div class="contact-form-row">
            <div class="form-group">
              <label>是否要求代位</label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="caseInfo.isSubrogation" value="1" /> 是
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="caseInfo.isSubrogation" value="0" /> 否
                </label>
              </div>
            </div>
          </div>

          <!-- 第二行：标的车车牌、现有车牌号、损失情况 -->
          <div class="contact-form-row">
            <div class="form-group">
              <label>标的车车牌 <span class="required">*</span></label>
              <input type="text" v-model="caseInfo.licenseNumber" ref="licenseNumber"
                :class="{ 'input-error': validationErrors.licenseNumber }" class="form-input"
                placeholder="如：京 A12345" />
              <span v-if="validationErrors.licenseNumber" class="error-message">
                {{ validationErrors.licenseNumber }}
              </span>
            </div>

            <div class="form-group">
              <label>现有车牌号</label>
              <input type="text" v-model="caseInfo.currentLicenseNumber" class="form-input" />
            </div>

            <div class="form-group">
              <label>损失情况 <span class="required">*</span></label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="caseInfo.damageStatus" value="1" /> 损
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="caseInfo.damageStatus" value="0" /> 无损
                </label>
              </div>
            </div>
          </div>

          <!-- 第三行：驾驶员姓名、证件类型、证件号码、损坏程度 -->
          <div class="contact-form-row">
            <div class="form-group">
              <label>驾驶员姓名 <span class="required">*</span></label>
              <input type="text" v-model="caseInfo.driverName" ref="driverName"
                :class="{ 'input-error': validationErrors.driverName }" class="form-input" />
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
              <input type="text" v-model="caseInfo.driverCertNo" class="form-input" />
            </div>

            <div class="form-group">
              <label>损坏程度</label>
              <input type="text" v-model="caseInfo.damageDegree" class="form-input" />
            </div>
          </div>

          <!-- 第四行：车辆能否正常行驶、车辆状态、发动机号、车架号 -->
          <div class="contact-form-row">
            <div class="form-group">
              <label>车辆能否正常行驶 </label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="caseInfo.vehicleCanRun" value="1" /> 能
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="caseInfo.vehicleCanRun" value="0" /> 不能
                </label>
              </div>
            </div>

            <div class="form-group">
              <label>车辆状态 </label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="caseInfo.vehicleStatus" value="1" /> 需要拖车
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="caseInfo.vehicleStatus" value="2" /> 气囊弹出
                </label>
              </div>
            </div>

            <div class="form-group">
              <label>发动机号 <span class="required">*</span></label>
              <input type="text" v-model="caseInfo.engineNumber" ref="engineNumber"
                :class="{ 'input-error': validationErrors.engineNumber }" class="form-input" />
              <span v-if="validationErrors.engineNumber" class="error-message">
                {{ validationErrors.engineNumber }}
              </span>
            </div>

            <div class="form-group">
              <label>车架号 <span class="required">*</span></label>
              <input type="text" v-model="caseInfo.frameNumber" ref="frameNumber"
                :class="{ 'input-error': validationErrors.frameNumber }" class="form-input" />
              <span v-if="validationErrors.frameNumber" class="error-message">
                {{ validationErrors.frameNumber }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- 财产损失信息区块 -->
      <section class="form-section" id="section-propertyLoss">
        <div class="section-header">
          <h3><i class="iconfont icon-meiyuan" style="color: #0056a4 ;"></i> 财产损失信息</h3>
          <button type="button" @click="addPropertyLoss" class="btn-add-icon float-right">
            <span>+</span>
          </button>
        </div>

        <div v-show="propertyLossExpanded" class="section-content">
          <!-- 是否财产损失 -->
          <div class="form-row">
            <div class="form-group">
              <label>是否财产损失</label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="caseInfo.propFlag" value="0" /> 无
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="caseInfo.propFlag" value="1" /> 有
                </label>
              </div>
            </div>
          </div>

          <!-- 财产损失列表 -->
          <div v-if="caseInfo.propFlag === '1'" class="property-loss-list">
            <div v-for="(item, index) in propertyLossList" :key="index" class="property-loss-item">
              <button type="button" @click="removePropertyLoss(index)" class="btn-remove-top">
                -
              </button>
              <div class="form-row">
                <div class="form-group">
                  <label>财产名称</label>
                  <input type="text" v-model="item.propertyName" class="form-input" />
                </div>

                <div class="form-group">
                  <label>归属 *</label>
                  <select v-model="item.identityRec" class="form-input"
                    :class="{ 'input-error': validationErrors[`identityRec_${index}`] }">
                    <option value="">请选择</option>
                    <option value="0">第三者</option>
                    <option value="1">车上人员</option>
                    <option value="2">本车</option>
                  </select>
                  <span v-if="validationErrors[`identityRec_${index}`]" class="error-message">
                    {{ validationErrors[`identityRec_${index}`] }}
                  </span>
                </div>

                <div class="form-group">
                  <label>损失情况</label>
                  <select v-model="item.lossSituation" class="form-input"
                    :class="{ 'input-error': validationErrors[`lossSituation_${index}`] }">
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
      <!-- ============ 人员伤亡区块 ============ -->
      <section class="form-section" id="section-personInjury">
        <div class="section-header">
          <h3><i class="iconfont icon-aixin" style="color: #0056a4 ;"></i> 人员伤亡</h3>
          <button type="button" class="btn-add-icon float-right">
            <span>+</span>
          </button>
        </div>

        <div v-show="personInjuryExpanded" class="section-content">
          <div class="contact-form-row">
            <div class="form-group">
              <label>是否人员伤亡 </label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="caseInfo.woundFlag" value="0" /> 无
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="caseInfo.woundFlag" value="1" /> 有
                </label>
              </div>
            </div>

            <div class="form-group">
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

          <!-- <div v-if="caseInfo.woundFlag === '1'" class="person-injury-list">
            <div v-for="(item, index) in personInjuryList" :key="index" class="injury-item">
              <div class="form-row">
                <div class="form-group">
                  <label>姓名</label>
                  <input type="text" v-model="item.name" class="form-input" />
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
                  <button type="button" @click="removePersonInjury(index)" class="btn-remove">
                    删除
                  </button>
                </div>
              </div>
            </div>

            <button type="button" @click="addPersonInjury" class="btn-add">
              + 添加人员伤亡
            </button>
          </div> -->
        </div>
      </section>
      <!-- ============ 损失类型区块 ============ -->
      <section class="form-section" id="section-lossType">
        <div class="section-header">
          <h3><i class="iconfont icon-shield" style="color: #0056a4 ;"></i>损失类型</h3>
        </div>

        <div v-show="lossTypeExpanded" class="section-content">
          <div class="loss-type-container">
            <!-- 第一行：7个选项 -->
            <div class="loss-type-row">
              <div class="loss-type-item">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="caseInfo.lossTypes" value="本车车损" />
                  本车车损
                </label>
              </div>
              <div class="loss-type-item">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="caseInfo.lossTypes" value="本车人伤" />
                  本车人伤
                </label>
              </div>
              <div class="loss-type-item">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="caseInfo.lossTypes" value="本车车载货物" />
                  本车车载货物
                </label>
              </div>
              <div class="loss-type-item">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="caseInfo.lossTypes" value="三者车损" />
                  三者车损
                </label>
              </div>
              <div class="loss-type-item">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="caseInfo.lossTypes" value="三者人伤" />
                  三者人伤
                </label>
              </div>
              <div class="loss-type-item">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="caseInfo.lossTypes" value="三者物损" />
                  三者物损
                </label>
              </div>
              <div class="loss-type-item">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="caseInfo.lossTypes" value="全车盗抢" />
                  全车盗抢
                </label>
              </div>
              <div class="loss-type-item">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="caseInfo.lossTypes" value="车身划痕" />
                  车身划痕
                </label>
              </div>
            </div>

            <!-- 第二行：1个选项 -->
            <div class="loss-type-row">
              <div class="loss-type-item">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="caseInfo.lossTypes" value="本车自燃" />
                  本车自燃
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- ============ 案件补充说明区块 ============ -->
      <section class="form-section" id="section-caseDesc">
        <div class="section-header"">
          <h3><i class=" iconfont icon-008duihuakuang-6" style="color: #0056a4 ;"></i>案件补充说明</h3>
          <button type=" button" @click="addCaseDesc" class="desc-add-icon float-right">
            <span>+ 添加说明</span>
          </button>
        </div>

        <div v-show="caseDescExpanded" class="section-content">
          <!-- 使用表格布局的补充说明列表 -->
          <div class="case-desc-list">
            <div v-if="caseDescList.length === 0" class="empty-state">
              <p style="color: #6c757d; text-align: center; padding: 20px;">暂无补充说明记录</p>
            </div>

            <div v-else>
              <table class="case-desc-table">
                <thead>
                  <tr>
                    <th class="seq-column">序号</th>
                    <th class="time-column">时间</th>
                    <th class="operator-column">操作员</th>
                    <th class="content-column">内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in caseDescList" :key="index">
                    <td class="seq-column">{{ index + 1 }}</td>
                    <td class="time-column">{{ item.disposeTime }}</td>
                    <td class="operator-column">{{ item.usercode }}</td>
                    <td class="content-column">
                      <input type="text" v-model="item.context" class="desc-input" placeholder="请输入补充说明内容" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ 表单底部按钮 ============ -->
      <div class="form-actions">
        <button type="button" @click="validateAndSubmit" class="btn-submit">
          <i class=" iconfont icon-fasong"></i> 提交
        </button>
        <button type="button" @click="handleSave" class="btn-save">
          <i class=" iconfont icon-icon-zancun"></i> 暂存
        </button>
        <button type="button" @click="handleTransfer" class="btn-transfer">
          <i class=" iconfont icon-arrow-1-right"></i> 转专岗处理
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
      policyBodyExpanded: true,
      reportInfoExpanded: true,
      vehicleInfoExpanded: true,
      lossTypeExpanded: true,
      personInjuryExpanded: true,
      accidentRescueExpanded: true,
      contactInfoExpanded: true,
      caseDescExpanded: true,
      historyReportExpanded: true,
      propertyLossExpanded: true,


      // ============ 校验错误信息 ============
      validationErrors: {},
      globalError: '',

      // ============ 动态列表数据 ============
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
      ]
    }
  },

  methods: {
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
      this.propertyLossList.splice(index, 1)
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
/* 日期选择器样式 */
.el-date-editor {
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 0;
  background-color: white;
}

.el-date-editor .el-input__inner {
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  height: 36px;
  line-height: 36px;
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
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  outline: none;
}

.desc-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
}

/* 序号列样式 */
.seq-column {
  width: 60px;
  font-weight: 500;
  color: #333;
}

/* 时间列样式 */
.time-column {
  width: 180px;
  color: #6c757d;
}

/* 操作员列样式 */
.operator-column {
  width: 120px;
  color: #6c757d;
}

/* 内容列样式 */
.content-column {
  width: calc(100% - 360px);
}

.desc-add-icon {
  /* 基础样式保留 */
  background-color: #f2f4f7;
  color: rgb(20, 19, 19);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;


  width: 60px;
  height: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: flex-start;
  font-size: 12px;
  /* 加号大小，可按需改 */
  font-weight: normal;
  /* 避免加号过粗 */
  padding: 0;
  /* 取消内边距，防止圆形变形 */
  margin-top: 8px;
  /* 保留原外边距，可删改 */
}

.desc-add-icon:focus {
  outline: none;
}


/* 财产损失信息区块样式 */
.property-loss-list {
  margin-top: 16px;
}

.property-loss-item {
  position: relative;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 16px;
  background-color: white;
  transition: box-shadow 0.2s ease;
  height: 100px;
  display: grid;
}

.btn-remove-top {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 30px;
  height: 24px;
  border: none;
  background: none;
  color: #100f0f;
  font-size: 25px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  background-color: white;
  z-index: 10;
  transform: translateY(0);
}

.btn-remove-top:focus {
  outline: none;
}

/* .btn-remove-top:hover {
  background-color: rgba(255, 0, 0, 0.1);
  color: #d32f2f;
} */
.property-loss-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.property-loss-item .form-row {
  display: grid;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  grid-template-columns: repeat(4, 1fr);
}

.property-loss-item .form-group {
  min-width: 0;
}

.property-loss-item .form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 12px;
  color: #333;
  font-weight: 500;
}

.property-loss-item .form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 12px;
  transition: border-color 0.2s ease;
}

.property-loss-item .form-input:focus {
  outline: none;
  border-color: #0887FF;
  box-shadow: 0 0 0 2px rgba(8, 135, 255, 0.1);
}

.property-loss-item .btn-remove {
  background-color: #f5f5f5;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.property-loss-item .btn-remove:hover {
  background-color: #e0e0e0;
  color: #333;
}

.btn-add-icon {
  /* 基础样式保留 */
  background-color: #f2f4f7;
  color: rgb(20, 19, 19);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 30px;
  height: 40px;
  border-radius: 8px;
  /* 核心：加号垂直水平居中 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: normal;
  padding: 0;
  margin-top: 8px;
}

.btn-add-icon:focus {
  outline: none;
}

/* .property-loss-item .btn-add:hover {
  background-color: #0066CC;
} */

.float-right {
  float: right;
  margin-left: auto;
  margin-top: -15px;
  /* 调整垂直对齐 */
}

/* ============ 保单卡片样式 ============ */
.policy-card {
  border: 2px solid #0066CC;
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

.policy-number-wrapper {
  display: flex;
  flex-direction: row;
  /* 改为垂直排列 */
  gap: 4px;
  /* 减小间距 */
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
  font-size: 12px;
  color: #666;
  font-weight: 500;
  font-family: 'Geist', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  white-space: nowrap;
  margin: 0;
  justify-content: flex-start;
}


.info-item .value {
  display: block;
  font-size: 14px;
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
.record-count {
  font-size: 12px;
  color: #666;
  background-color: #f0f0f0;
  padding: 2px 8px;
  border-radius: 4px;
}

.report-table {
  width: 100%;
  border-collapse: collapse;
  overflow-x: fixed;
}

.data-table th {
  text-align: left;
  padding: 12px 16px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
  font-size: 10px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.data-table {
  min-width: 100%;
  table-layout: fixed;
}

.data-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  font-size: 10px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}

.report-link {
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: flex-start;
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

.status-badge {
  display: inline-block;
  padding: 2px 2px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
}

.status-submitted {
  background-color: #e4e5e6;
  color: #42dd69;
  border: 1px solid #b3d8ff;
}

/* ============ 损失类型信息区块样式 ============ */
.loss-type-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.loss-type-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.loss-type-item {
  flex: 1;
  min-width: 100px;
  /* 减小最小宽度 */
  max-width: 150px;
  /* 添加最大宽度限制 */
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
  border-bottom: 1px solid #eee;
  text-align: left;
  /* 确保标题左对齐 */
}

.rescue-vehicle-header h4 {
  margin: 0;
  color: #333;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  /* 确保标题文字左对齐 */
}

.rescue-checkbox-group {
  display: grid;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  grid-template-columns: repeat(3, 1fr);
}

.rescue-t-checkbox-group {
  display: grid;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  grid-template-columns: repeat(2, 1fr);
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

/* 使用更具体的选择器来覆盖其他样式 */
.rescue-checkbox-group .checkbox-label,
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

.checkbox-label input {
  margin-right: 8px;
}

/* 单选框组也左对齐 */
.radio-group {
  display: flex;
  gap: 16px;
  align-items: center;
  text-align: left;
  /* 确保文字左对齐 */
}

.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  text-align: left;
}

.radio-label input {
  margin-right: 6px;
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



.form-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 11px;
  color: #333;
  font-weight: 500;
  text-align: left;
}

.form-group.full-width {
  width: 100%;
  flex: 1;
}

.form-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 11px;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
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
  min-width: 120px;
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
}

.radio-label input,
.checkbox-label input {
  margin-right: 6px;
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
  background-color: #007bff;
  border-color: #007bff;
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
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.section-header {
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
  margin-left: auto;
}

.section-content {
  padding: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

aozu

/* ============ 按钮样式 ============ */
.case-info-form {
  min-height: calc(100vh - 60px);
  /* 减去页面其他部分的高度 */
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
  /* 为固定按钮预留空间 */
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: auto;
  /* 推到底部 */
  padding-top: 20px;
  border-top: 1px solid #ddd;
  flex-wrap: wrap;
  position: fixed;
  /* 固定定位 */
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  padding: 16px 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  /* 确保在最顶层 */
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