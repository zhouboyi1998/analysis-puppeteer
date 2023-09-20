const puppeteer = require('puppeteer')
const fs = require('./fs.js')

// 文件夹名称
const dir = './data/screenshot'

// 删除文件夹
fs.empty(dir)

// 创建文件夹
fs.mkdir(dir)

// 网站列表
const websites = [
    { name: 'baidu', url: 'https://www.baidu.com' },
    { name: 'cnblogs', url: 'https://www.cnblogs.com' },
    { name: 'csdn', url: 'https://www.csdn.net' },
    { name: 'zhihu', url: 'https://www.zhihu.com' },
    { name: 'jianshu', url: 'https://www.jianshu.com' },
    { name: 'juejin', url: 'https://juejin.cn' },
    { name: 'taobao', url: 'https://www.taobao.com' },
    { name: 'jd', url: 'https://www.jd.com' },
    { name: 'tmall', url: 'https://www.tmall.com' },
    { name: 'huawei', url: 'https://www.huawei.com' },
    { name: 'mi', url: 'https://www.mi.com' },
    { name: 'oppo', url: 'https://www.oppo.com' },
    { name: 'vivo', url: 'https://www.vivo.com' }
]

// 遍历网站数组
websites.forEach(website => {
    (async () => {
        // 使用 Puppeteer 新建一个浏览器实例
        const browser = await puppeteer.launch()
        // 打开一个新的浏览器页面
        const page = await browser.newPage()
        // 指定页面分辨率
        await page.setViewport({ width: 1920, height: 1080 })
        // 跳转到指定网站的页面
        await page.goto(website.url)
        // 截图保存
        await page.screenshot({ path: dir + '/' + website.name + '.png' })
        // 关闭浏览器实例
        await browser.close()
    })()
})
