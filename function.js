import path from 'path'
// 注册静态路径
add_action('init_express', () => {
	register_static_url('/block-peiwan-srcs/', path.join(import.meta.dirname, "./dist/"));
	register_static_url('/block-peiwan/', path.join(import.meta.dirname, "./"));
});

// 添加头文件
add_action('nv_head', (req, route) => {
	// 主题没有将 vue 暴露出来，因此引入一个vue
	nv_enqueue_script(`/block-peiwan/vue.global.prod.v3.2.45.js`, 'vue.global', '3.2.45');
	// 打包好的 web-components
	nv_enqueue_script(`/block-peiwan-srcs/frontend.js`);
	nv_enqueue_style(`/block-peiwan-srcs/frontend.css`);
})
// 注册设置页面
add_submenu_page({
	parent_slug: "appearance",
	page_title: "陪玩卡片",
	menu_title: "陪玩卡片",
	menu_slug: "scottstudio-peiwan",
	power: 10,
	position: 10,
	component_url: `/block-peiwan/settings.vue`,
})

register_rest_route('scottstudio', 'peiwan/get-config', {
	methods: 'post',
	callback(data, req) {
		return get_options([
			
		])
	}
});
