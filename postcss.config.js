module.exports = {

    plugins: [
        require('autoprefixer')(
            {
                overrideBrowserslist:
                    ['> 0.15% in CN', "last 2 versions", "not ie <= 8"]
            })// 自动添加css前缀
    ]
}