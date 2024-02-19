import Mock from 'mockjs'
Mock.mock('/api/User/Login', 'post', {
    code: 200,
    data: {
        "token": "1234567890",
    },
})
Mock.mock(RegExp('http://localhost:5054/api/Entry/GetEntries'), 'get', {
    code: 200,
    data: {
        "entries|10": [
            {
                "title": "@ctitle(5, 10)",
                "content": "@cparagraph(5, 10)",
            }
        ]
    }
})
