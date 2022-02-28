const { execute } = require('./google_sheet');

exports.handler = async function (args) {
    await execute(args)
}
// Lambda 환경에서 실행하기 위해 index 분리하였음. 로컬에서 실행한다면 google_sheet.js로 실행하여도 무관함.