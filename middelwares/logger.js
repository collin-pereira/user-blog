const chalk = require('chalk')
const morgan = require('morgan');

exports.logger = morgan(function (tokens, req, res) {
    var status = tokens.status(req, res)
    var statusColor = status >= 500
        ? 'red' : status >= 400
            ? 'yellow' : status >= 300
                ? 'cyan' : 'green'
    return [chalk.yellow(tokens.method(req, res))
        , chalk.underline.white(tokens.url(req, res))
        , chalk[statusColor](status)
        , chalk.grey(tokens['response-time'](req, res), 'ms')].join(' ')
})
