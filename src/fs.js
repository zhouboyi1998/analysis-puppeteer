const fs = require('fs')

// 创建文件夹
function mkdir(dir) {
    fs.mkdir(dir, err => {
        if (err) throw err
    })
}

// 清空并删除文件夹
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

module.exports = { mkdir, empty }
