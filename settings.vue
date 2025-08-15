<template>
	<div class="nv-admin-page">
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="page-content flex-grow">
			<pdForm :config="formConfig_REF" :data="formData_REF" @submit="saveData">

				<template v-slot:dataList>
					<nvSettingTable add-label="添加数据" :columns="dataListColumns" v-model:data="formData_REF.fold_img_dataList">
						<template v-slot:column-image="row">
							<nv-thumbnail-selector :height="40" v-model:value="formData_REF.fold_img_dataList[row.$index].image" />
						</template>
						<template v-slot:column-text="row">
							<NInput v-model:value="formData_REF.fold_img_dataList[row.$index].text" />
						</template>

						<template v-slot:column-content="row">
							<NInput v-model:value="formData_REF.fold_img_dataList[row.$index].content" />
						</template>

						<template v-slot:column-url="row">
							<NInput placeholder="http(s)://" v-model:value="formData_REF.fold_img_dataList[row.$index].url" />
						</template>
					</nvSettingTable>
				</template>
			</pdForm>
		</div>
	</div>
</template>

<script setup>
var { ref, onMounted, computed } = nv.Vue;
var { pdForm, nvThumbnailSelector } = nv.components;
var { nInput } = nv.components.naiveUI;
var { $axios, $API } = nv;

var formData_REF = ref({})

var formConfig_REF = computed(() => ({
	form: {
		labelWidth: "8em",
		size: 'large',
		submitText: "保存设置",
	},
	items: [{
		label: "组件标题", type: "Input", prop: "fold_img_title",
		config: {
			placeholder: '请输入标题...',
		},
	}, {
		label: "描述文字", type: "Input", prop: "fold_img_desc",
		config: {
			placeholder: '请输入描述文字...',
		},
	}, {
		label: "节点选择器", type: "Input", prop: "fold_img_selector",
		desc: '如.post-content（多个用英文逗号分隔），将会在该节点后面插入组件',
		config: {
			placeholder: '请输入节点选择器'
		},
	},
	{
		label: '数据列表',
		custom_type: 'dataList',
		prop: 'fold_img_dataList',
	},]
}))

const dataListColumns = [
	{ title: '背景图', key: 'image' },
	{ title: '标题', key: 'text' },
	{ title: '描述文字', key: 'content' },
	{ title: '跳转链接', key: 'url' },
]
var requestData = () => {
	$axios({
		method: 'post',
		url: $API + '/nv/get-options',
		data: {
			names: formConfig_REF.value.items.map(item => item.prop).filter(item => !!item)
		},
	})
		.then(({ data }) => {
			formData_REF.value = { ...formData_REF.value, ...data };
		})
		.catch((error) => {
			$message.error('读取失败')
		})
}


onMounted(requestData)

var saveData = () => {
	$axios({
		method: 'post',
		url: $API + '/nv/set-options',
		data: formData_REF.value
	})
		.then(({ data }) => {
			$message.success('保存成功')
		})
		.catch((error) => {
			$message.error('保存失败')
		})
}
</script>
