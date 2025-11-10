import type { Menus } from '@/types/menu'

export const menuData: Menus[] = [
    {
        id: '0',
        title: '工作台',
        index: '/dashboard',
        icon: 'ElementPlus',
    },
    {
        id: '1',
        title: '商品管理',
        index: '1',
        icon: 'Link',
        children: [
            {
                id: '11',
                pid: '1',
                index: '/system-user',
                title: '商品分类',
            },
            {
                id: '12',
                pid: '1',
                index: '/system-role',
                title: '商品列表',
            },
            {
                id: '13',
                pid: '1',
                index: '/system-vip',
                title: '商品管理',
            },
            {
                id: '14',
                pid: '1',
                index: '/system-menu',
                title: '入库记录',
            },
        ],
    },
    {
        id: '2',
        title: '销售管理',
        index: '2-1',
        icon: 'SoldOut',
        children: [
            {
                id: '21',
                pid: '3',
                index: '/form',
                title: '订单列表',
            },
            {
                id: '22',
                pid: '3',
                index: '/upload',
                title: '销售报表',
            },
        ],
    },
    {
        id: '3',
        title: '智能订货',
        index: '3',
        icon: 'CircleCheck',
        children: [
            {
                id: '31',
                pid: '3',
                index: '/table',
                title: '销量预测',
            },
            {
                id: '32',
                pid: '3',
                index: '/table-editor',
                title: '订货建议',
            },
            {
                id: '33',
                pid: '3',
                index: '/import',
                title: '订货单管理',
            },
        ],
    },
    {
        id: '4',
        icon: 'User',
        index: '4',
        title: '会员销售',
        children: [
            {
                id: '41',
                pid: '4',
                index: '/schart',
                title: '会员列表',
            },
            {
                id: '42',
                pid: '4',
                index: '/echarts',
                title: '自动营销',
            },
            {
                id: '43',
                pid: '4',
                index: '/echarts',
                title: '优惠券管理',
            },
            {
                id: '44',
                pid: '4',
                index: '/echarts',
                title: '营销效果',
            },
            {
                id: '45',
                pid: '4',
                index: '/echarts',
                title: '用户列表',
            },
        ],
    },
    {
        id: '5',
        icon: 'Setting',
        index: '5',
        title: '系统设置',
        children: [
            {
                id: '61',
                pid: '6',
                index: '/ucenter',
                title: '个人中心',
            },
            {
                id: '62',
                pid: '6',
                index: '/login',
                title: '店铺信息',
            },
            {
                id: '63',
                pid: '6',
                index: '/register',
                title: '账号管理',
            },

        ],
    },
]
