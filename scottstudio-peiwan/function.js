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

add_filter('rest_send_post:/nv/get-user-list', (users, req) => {
  return users.map(user => {
		const vipRecord = userVipDB.find(record => record.user_id === user.id && new Date(record.expire_time) > Date.now())
		user.vip_level = vipRecord.length > 0 ? vipRecord[vipRecord.length - 1].level : 0
		user.badges = get_user_meta(user.id, 'badges') || []
		const defaultBadge = user.badges.length ? user.badges[0] : ''
		user.wear_badge = get_user_meta(user.id, 'wear_badge') || defaultBadge
		user.authorize = get_user_meta(user.id, 'authorize')
		user.level = computedLevel(user.id)
    user.avatar = get_user_meta(user.id, 'avatar_url') || ''
    return user
  })
})


register_rest_route('peiwan', 'site-opts', {
	methods: 'post',
	callback(data, req) {
		const opts = get_options(['playmates', 'sc_badges','sc_levels','sonare_vip_config_types','somnia_liang_tooltip','somnia_beautiful_url','somnia_blogger_logo'])
		return { ...opts }
	}
})
register_rest_route('peiwan', 'query-users', {
	methods: 'post',
	callback(data, req) {
		const users = query_users({include:data.include})
		return users.map(user => {
			const vipRecord = userVipDB.find(record => record.user_id === user.id && new Date(record.expire_time) > Date.now())
			user.vip_level = vipRecord.length > 0 ? vipRecord[vipRecord.length - 1].level : 0
			user.badges = get_user_meta(user.id, 'badges') || []
			const defaultBadge = user.badges.length ? user.badges[0] : ''
			user.wear_badge = get_user_meta(user.id, 'wear_badge') || defaultBadge
			user.authorize = get_user_meta(user.id, 'authorize')
			user.level = computedLevel(user.id)
			user.role = get_user_role(user.power);
			user.avatar = get_user_meta(user.id, 'avatar_url') || ''
			delete user.email
			return user
		}) 
	}
})