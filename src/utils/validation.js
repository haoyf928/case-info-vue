// src/utils/validation.js

// ============ 必填字段规则定义 ============
export const requiredFields = {
  // 报案时间信息
  accidentTime: { required: true, message: '请选择出险时间' },
  reportTime: { required: true, message: '请选择报案时间' },
  
  // 报案基本信息
  isfirstsiteFlag: { required: true, message: '请选择是否现场报案' },
  upadress: { required: true, message: '请选择客户提供位置信息是否准确' },
  
  // 出险地点信息
  areaProvince: { required: true, message: '请选择省' },
  areaCity: { required: true, message: '请选择市' },
  areaDistrict: { required: true, message: '请选择区' },
  street: { required: true, message: '请输入街道' },
  doorNumber: { required: true, message: '请输入门牌号' },
  longitude: { required: true, message: '请输入经度' },
  latitude: { required: true, message: '请输入纬度' },
  // 案件信息
  accidentDescription: { required: true, message: '请填写出险经过' },
  lsType: { required: true, message: '请选择险因类型' },
  damageCode: { required: true, message: '请选择保险事故分类' },
  accidentCause: { required: true, message: '请选择出险原因' },
  handleDepartment: { required: true, message: '请选择事故处理部门' },
  handleType: { required: true, message: '请选择事故处理类型' },
  responsibility: { required: true, message: '请选择事故责任' },
  driverIsInsured: { required: true, message: '请选择驾驶员是否被保险人' },
  insuredCertType: { required: true, message: '请选择被保险人证件类型' },
  emergencyLevel: { required: true, message: '请选择紧急程度' },
  isOutProvince: { required: true, message: '请选择是否异地' },
  isWeChatClaim: { required: true, message: '请选择是否微信理赔' },
  accidentReason: { required: true, message: '请选择事故原因' },
  isAlarm: { required: true, message: '请选择是否报警' },
  isDisaster: { required: true, message: '请选择是否巨灾' },
  isOnSiteSurvey: { required: true, message: '请选择是否需现场查勘' },
  disasterType: { required: true, message: '请选择巨灾类型' },
  disasterName: { required: true, message: '请输入巨灾名称' },
  alarmTime: { required: true, message: '请选择报警时间' }, // 条件验证，在表单中处理
  
  // 联系人信息
  reportorName: { required: true, message: '请输入报案人姓名' },
  reportorPhonenumber: { 
    required: true, 
    pattern: /^1[3-9]\d{9}$|^0\d{2,3}-?\d{7,8}$/,
    message: '请输入正确的手机号码或电话号码'
  },
  reporterRelation: { required: true, message: '请选择报案人跟被保险人关系' },
  linkerName: { required: true, message: '请输入现场联系人姓名' },
  linkerPhone: { required: true, message: '请输入现场联系人电话' },
  handlerCode: { required: true, message: '请填写受理人编码' },
  
  
  
  // 案件状态
  propFlag: { required: true, message: '请选择是否财产损失' },
  woundFlag: { required: true, message: '请选择是否人员伤亡' },

}

/**
 * 校验必填字段
 */
export function validateRequiredFields(formData, requiredFields) {
  const errors = {}
  requiredFields.forEach(field => {
    const value = formData[field.key]
    if (value === null || value === undefined || value === '') {
      errors[field.key] = field.message || `${field.label}不能为空`
      return
    }
    if (typeof value === 'string' && value.trim() === '') {
      errors[field.key] = field.message || `${field.label}不能为空`
      return
    }
    if (Array.isArray(value) && value.length === 0) {
      errors[field.key] = field.message || `${field.label}不能为空`
      return
    }
  })
  return errors
}

/**
 * 校验手机号格式
 */
export function validatePhone(phone) {
  const phoneRegex = /^1[3-9]\d{9}$|^0\d{2,3}-?\d{7,8}$/
  return phoneRegex.test(phone)
}

/**
 * 校验身份证号格式
 */
export function validateIdCard(idCard) {
  const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return idCardRegex.test(idCard)
}

/**
 * 校验车牌号格式
 */
export function validateLicenseNo(licenseNo) {
  const licenseRegex = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-Z0-9]{5,6}$/
  return licenseRegex.test(licenseNo)
}

/**
 * 综合校验表单
 */
export function validateForm(formData, rules) {
  const errors = {}
  for (const field in rules) {
    const rule = rules[field]
    const value = formData[field]
    
    // 特殊处理报警时间：只有当isAlarm为'1'时才需要验证
    if (field === 'alarmTime' && (formData.isAlarm !== '1' && formData.isAlarm !== 1)) {
      continue
    }
    
    // 特殊处理巨灾相关字段：只有当isDisaster为'1'时才需要验证
    if ((field === 'disasterType' || field === 'disasterName') && (formData.isDisaster !== '1' && formData.isDisaster !== 1)) {
      continue
    }
    
    // 特殊处理车辆目前所在地信息：只有当isfirstsiteFlag为'0'时才需要验证
    if (
      ['currentAreaProvince', 'currentAreaCity', 'currentAreaDistrict', 'currentStreet', 'currentDoorNumber', 'currentLongitude', 'currentLatitude'].includes(field) &&
      (formData.isfirstsiteFlag !== '0' && formData.isfirstsiteFlag !== 0)
    ) {
      continue
    }
    
    if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      errors[field] = rule.message || `${field}不能为空`
      continue
    }
    if (rule.phone && value && !validatePhone(value)) {
      errors[field] = rule.message || '手机号格式不正确'
      continue
    }
    if (rule.idCard && value && !validateIdCard(value)) {
      errors[field] = rule.message || '身份证号格式不正确'
      continue
    }
    if (rule.licenseNo && value && !validateLicenseNo(value)) {
      errors[field] = rule.message || '车牌号格式不正确'
      continue
    }
    if (rule.pattern && value && !new RegExp(rule.pattern).test(value)) {
      errors[field] = rule.message || `${field}格式不正确`
      continue
    }
    if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = rule.message || `${field}长度不能少于${rule.minLength}个字符`
      continue
    }
    if (rule.maxLength && value && value.length > rule.maxLength) {
      errors[field] = rule.message || `${field}长度不能超过${rule.maxLength}个字符`
      continue
    }
  }
  return errors
}