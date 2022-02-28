const { google } = require('googleapis');
const keys = require('./youraccount_key.json');

const client = new google.auth.JWT(
    keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']
)

client.authorize(function (err, tokens) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('connected!')
        execute(client) // AWS Lambda 환경에서 실행 시에 제거.
    }
})

// AWS Lambda 환경에서 실행 시에 execute()로 수정
async function execute(client) {
    const sheets = google.sheets({ version: 'v4', auth: client });

    // 1. 시트 읽기
    const sheetserach = {
        'spreadsheetId': 'yoursheetid',
        'range': 'sheet!range' //시트이름!셀
    };

    // 2. 시트 복제
    const sheetduplicate = {
        'spreadsheetId': 'yoursheetid',
        'resource': {
            'requests': [{
                'duplicateSheet': {
                    'sourceSheetId': 'your-source-sheet-id',
                    'insertSheetIndex': '1',
                    'newSheetName': 'name'
                }
            }]
        }
    };

    // 3. 시트 내용 등록
    const Array1 = new Array();
    Array1[0] = new Array('연번', '이름', '포지션', '포지션', '방어타입', '소속학원');
    Array1[1] = new Array('1', '리쿠하치마 아루', '딜러', '폭발', '경장갑', '게헨나');
    Array1[2] = new Array('2', '소라사키 히나', '딜러', '폭발', '중장갑','게헨나');
    Array1[3] = new Array('3', '타카나시 호시노', '탱커', '관통', '중장갑', '아비도스');
    Array1[4] = new Array('4', '텐도 아리스', '딜러', '신비', '특수장갑', '밀레니엄');
    Array1[5] = new Array('5', '쿠다 이즈나', '딜러', '신비', '경장갑', '백귀야행');

    const sheetappend = {
        spreadsheetId: sheetid,
        range: `Sheet!range`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'OVERWRITE', // OVERWRITE 혹은 INSERT_ROWS 중 선택. 서식과 관련됨.
        resource: { values: Array1 }
    };
    const response = await sheets.spreadsheets.values.get(sheetserach); // 혹시 안 되면 ).data
    const response1 = await sheets.spreadsheets.batchUpdate(sheetduplicate);
    const response2 = await sheets.spreadsheets.values.append(sheetappend);
    console(response);
    console(response1);
    console(response2); // 변경 내용 출력. 로그 출력이 길다면 제거.

    /* sheet.spreadsheets.batchUpdate(sheetduplicate, (err, response) => {
        if (err) {
            console.log(err)
        } else {}
    });
    const 대신 실행 가능하나 AWS Lambda 환경에서 실행 불가능함. */
}

module.exports = { execute }