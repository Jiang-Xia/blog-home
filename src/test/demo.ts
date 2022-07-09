const axios = require('axios')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<note>
<to>Tove</to>
<from>Jani</from>
<heading>Reminder</heading>
<body>Don't forget me this weekend!</body>
</note>`
// const xml = 'aaa'
let url = 'http://localhost:5000/article/list'
url = 'https://jiang-xia.top/x-api/blog-server/article/list'
const res = axios
  .post(url, xml, {
    headers: {
      'Content-Type': 'text/xml'
    }
  })
  .then((res: any) => {
    console.log(111111111, res.data.data.list)
  })
