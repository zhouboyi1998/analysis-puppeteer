const fs = require('fs')
const puppeteer = require('puppeteer')

// 封装删除文件夹方法
function empty(dir) {
    // 判断文件夹是否存在
    if (fs.existsSync(dir)) {
        // 读取文件夹下的所有子节点
        const files = fs.readdirSync(dir)
        // 遍历子节点
        files.forEach(file => {
            const path = `${ dir }/${ file }`
            const stat = fs.statSync(path)
            if (stat.isDirectory()) {
                // 如果节点是文件夹, 递归删除
                empty(path)
            } else {
                // 如果节点是文件, 直接删除
                fs.unlinkSync(path)
            }
        })
        fs.rmdirSync(dir)
    }
}

// 文件夹名称
const dir = './data'

// 调用方法删除文件夹
empty(dir)

// 重新创建文件夹
fs.mkdir(dir, err => {
    if (err) throw err
})

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
