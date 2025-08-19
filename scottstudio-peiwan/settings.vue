<template>
	<div class="nv-admin-page">
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="page-content flex-grow">
			<pdForm :config="formConfig_REF" :data="formData_REF" @submit="saveData">

				<template v-slot:playmate>
					<nvSettingTable add-label="添加数据" :columns="playmateColumns" v-model:data="formData_REF.playmates">
						<template v-slot:column-image="row">
							<nv-thumbnail-selector :height="40" v-model:value="formData_REF.playmates[row.$index].image" />
						</template>
						<template v-slot:column-audio="row">
							<NInputGroup>
								<NInput v-model:value="formData_REF.playmates[row.$index].audio" />
								<NButton @click="handleChoose(row.$index)">
									<i class="el-icon-upload2"></i>
								</NButton>
							</NInputGroup>
						</template>
						<template v-slot:column-text="row">
							<NInput v-model:value="formData_REF.playmates[row.$index].text" />
						</template>
						<template v-slot:column-uid="row">
							<n-select v-model:value="formData_REF.playmates[row.$index].uid" :render-label="renderLabel"
								:render-tag="renderSingleSelectTag" filterable placeholder="搜索用户" :options="user_options"
								:loading="loading" clearable remote @search="handleSearch" label-field="name" value-field="id" />
						</template>

						<template v-slot:column-url="row">
							<NInput placeholder="http(s)://" v-model:value="formData_REF.playmates[row.$index].url" />
						</template>
					</nvSettingTable>
				</template>
				<template v-slot:banners>
					<nvSettingTable add-label="添加数据" :columns="bannerColumns" v-model:data="formData_REF.banners">
						<template v-slot:column-image="row">
							<nv-thumbnail-selector :height="40" v-model:value="formData_REF.banners[row.$index].image" />
						</template>
						<template v-slot:column-url="row">
							<NInput placeholder="http(s)://" v-model:value="formData_REF.banners[row.$index].url" />
						</template>
					</nvSettingTable>
				</template>
				<template v-slot:zone>
					<nvSettingTable add-label="添加数据" :columns="zoneColumns" v-model:data="formData_REF.zones">
						<template v-slot:column-title="row">
							<NInput placeholder="请输入..." v-model:value="formData_REF.zones[row.$index].title" />
						</template>
						<template v-slot:column-uids="row">
							<n-select v-model:value="formData_REF.zones[row.$index].uids" multiple :render-label="renderLabel"
								:render-tag="renderMultipleSelectTag" filterable placeholder="搜索用户" :options="user_options"
								:loading="loading" clearable remote @search="handleSearch" label-field="name" value-field="id" />
						</template>
						<template v-slot:column-url="row">
							<NInput placeholder="http(s)://" v-model:value="formData_REF.zones[row.$index].url" />
						</template>
					</nvSettingTable>
				</template>
			</pdForm>
		<nvMediaSelector v-model:visibility="visibility_REF" title="选择文件" @select-confirm="handleSelected" />
		</div>
	</div>
</template>

<script setup>
var { ref, onMounted, computed,h } = nv.Vue;
var { pdForm, nvThumbnailSelector,nvMediaSelector } = nv.components;
var { NInput,NAvatar,NTag,NInputGroup,NButton } = nv.components.naiveUI;
var { $axios, $API } = nv;

var formData_REF = ref({})

var visibility_REF = ref(false)
var chooseIndex = ref(0)
const handleChoose = index => {
	visibility_REF.value = true
	chooseIndex.value = index
}
/**
 * 检查文件后缀是否为音频格式
 * @param {string} fileName - 文件名（或完整路径）
 * @returns {boolean} - 是否为音频文件
 */
function isAudioFile(fileName) {
  // 常见音频格式列表（可扩展）
  const audioExtensions = [
    'mp3', 'wav', 'ogg', 'flac', 'aac', 
    'm4a', 'wma', 'aiff', 'alac', 'opus'
  ];
  
  // 提取文件后缀并转为小写
  const fileExtension = fileName.toLowerCase();
  
  // 检查后缀是否在音频格式列表中
  return audioExtensions.includes(fileExtension);
}
// 点击按钮的回调效果
var handleSelected = files => {
	const file = files[0];
	console.log('file',file)
	if (!isAudioFile(file.fileExt)) {
		$message.error('请选择音频文件')
		return
	}
	formData_REF.value.playmates[chooseIndex.value].audio = file.urls.original
}

var formConfig_REF = computed(() => ({
	form: {
		labelWidth: "8em",
		size: 'large',
		submitText: "保存设置",
	},
	items: [
		{
			label: '基础设置',
			type: 'FormSubtitle',
		},
		{
			label: "节点选择器", type: "Input", prop: "peiwan_selector",
			desc: '如.slider-wrapper（多个用英文逗号分隔），将会在该节点后面插入组件',
			config: {
				placeholder: '请输入节点选择器'
			},
		},
		{
			label: "自动轮播间隔时间(单位：毫秒ms)", type: "InputNumber", prop: "peiwan_delay",
			desc: '默认为5000ms，1秒=1000ms',
			config: {
				placeholder: '请输入...'
			},
		},
		{
			label: '左侧推荐卡片',
			type: 'FormSubtitle',
		},
		{
			label: '右上角图片',
			type: 'ThumbnailUploader',
			config: {
				clearable: true,
				width: 235,
				height: 110,
			},
			prop: 'peiwan_tag',
		},
		{
			label: '数据列表',
			custom_type: 'playmate',
			prop: 'playmates',
		},
		{
			label: '右侧内容',
			type: 'FormSubtitle',
		},
		{
			label: '轮播卡片',
			custom_type: 'banners',
			prop: 'banners',
		},
		{
			label: '底部slogan图片',
			type: 'ThumbnailUploader',
			config: {
				clearable: true,
				width: 235,
				height: 110,
			},
			prop: 'zone_tag',
		},
		{
			label: '轮播卡片',
			custom_type: 'zone',
			prop: 'zones',
			desc: '最多显示3项，多个用户id用英文逗号分隔',
		},
	]
}))
const bannerColumns = [
	{ title: '图片', key: 'image' },
	{ title: '跳转链接', key: 'url' },
]
const playmateColumns = [
	{ title: '用户ID', key: 'uid' },
	{ title: '大图', key: 'image' },
	{ title: '按钮文案', key: 'text' },
	{ title: '按钮链接', key: 'url' },
	{ title: '音频链接', key: 'audio' },
]
const zoneColumns = [
	{ title: '标题', key: 'title' },
	{ title: '用户ID', key: 'uids' },
	{ title: '更多按钮链接', key: 'url' },
]
const user_options = ref([])
const loading = ref(false)
const renderMultipleSelectTag = ({
	option,
	handleClose
}) => {
	return h(
		NTag,
		{
			style: {
				padding: '0 6px 0 4px'
			},
			round: true,
			closable: true,
			onClose: (e) => {
				e.stopPropagation()
				handleClose()
			}
		},
		{
			default: () =>
				h(
					'div',
					{
						style: {
							display: 'flex',
							alignItems: 'center'
						}
					},
					[
						h(NAvatar, {
							src: option.avatar,
							round: true,
							size: 22,
							style: {
								marginRight: '4px'
							}
						}),
						option.name
					]
				)
		}
	)
}
const renderSingleSelectTag = ({ option }) => {
	return h(
		'div',
		{
			style: {
				display: 'flex',
				alignItems: 'center'
			}
		},
		[
			h(NAvatar, {
				src: option.avatar,
				round: true,
				size: 24,
				style: {
					marginRight: '12px'
				}
			}),
			option.name
		]
	)
}
const renderLabel = (option) => {
	return h(
		'div',
		{
			style: {
				display: 'flex',
				alignItems: 'center'
			}
		},
		[
			h(NAvatar, {
				src: option.avatar,
				round: true,
				size: 'small'
			}),
			h(
				'div',
				{
					style: {
						marginLeft: '12px',
						padding: '4px 0'
					}
				},
				[
					h('div', null, [option.name]),
				]
			)
		]
	)
}
var requestData = () => {
	handleSearch('')
	$axios({
		method: 'post',
		url: $API + '/nv/get-options',
		data: {
			names: ['playmates']
		},
	})
		.then(({ data }) => {
			formData_REF.value = { ...formData_REF.value, ...data.playmates };
		})
		.catch((error) => {
			$message.error('读取失败')
		})
}
function handleSearch(keyword) {
	$axios({
		method: 'POST',
		url: $API + '/nv/get-user-list',
		data: {
			keyword
		}
	}).then(({ data }) => {
		user_options.value = data
	})
		.finally(() => {
			loading.value = false
		})
}
onMounted(requestData)

var saveData = () => {
	const data = { playmates: formData_REF.value }
	$axios({
		method: 'post',
		url: $API + '/nv/set-options',
		data
	})
		.then(({ data }) => {
			$message.success('保存成功')
		})
		.catch((error) => {
			$message.error('保存失败')
		})
}
</script>
