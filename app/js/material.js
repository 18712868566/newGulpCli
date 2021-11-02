/**
 *
 * @param {string} fileName 文件名前缀
 * @param {number} total  总数
 * @returns {string[]} 处理后的图片路径数组
 */


export function GetIMGPath(fileName, total, type) {
    const url = []
    for (let i = 0; i < total; i++) {
        if (process.env.VUE_APP_STATUS === 'OFFLINE') {
            url.push({
                url: require(`../../assets/images/eden/${fileName}${i}.png`),
                active: false,
                type,
            })
        } else {
            url.push({
                url: `eden/${fileName}${i}.png`,  // 本地使用
                    // url: `images/${fileName}${i}.png`, //打包用
                active: false,
                type,
            })
        }
    }
    return url
}

export function getPath(name) {
    if (process.env.VUE_APP_STATUS === 'OFFLINE') {
        return require(`../../assets/images/eden/${name}.png`)
    } else {
        return `eden/${name}.png` // 本地使用
        // return `images/${name}.png` //打包用
    }
}

export function imgLoad(url, callback) {
    const img = new Image()
    img.src = url
    // img.src = url + '?time=' + new Date().valueOf()
    img.crossOrigin = "anonymous"
    img.onload = function() {
        callback(this)
    }
}
export const description1 = [{
    "text": "（無）",
    "active": false
}, {
    "text": "聰明",
    "active": false
}, {
    "text": "善良",
    "active": false
}, {
    "text": "老實",
    "active": false
}, {
    "text": "安靜",
    "active": false
}, {
    "text": "羞澀",
    "active": false
}, {
    "text": "溫和",
    "active": false
}, {
    "text": "高尚",
    "active": false
}, {
    "text": "偉大",
    "active": false
}, {
    "text": "勇敢",
    "active": false
}, {
    "text": "可愛",
    "active": false
}, {
    "text": "純潔",
    "active": false
}, {
    "text": "優雅",
    "active": false
}, {
    "text": "富有愛心",
    "active": false
}, {
    "text": "閃閃發光",
    "active": false
}, {
    "text": "熟練",
    "active": false
}, {
    "text": "帥氣",
    "active": false
}, {
    "text": "奇怪",
    "active": false
}, {
    "text": "調皮",
    "active": false
}, {
    "text": "世界第一",
    "active": false
}, {
    "text": "明星",
    "active": false
}, {
    "text": "英雄",
    "active": false
}, {
    "text": "大小姐",
    "active": false
}, {
    "text": "終結者",
    "active": false
}, {
    "text": "戰士",
    "active": false
}, {
    "text": "構造體",
    "active": false
}, {
    "text": "隊長",
    "active": false
}, {
    "text": "遺忘者",
    "active": false
}, {
    "text": "灰鴉",
    "active": false
}, {
    "text": "明日之星",
    "active": false
}, {
    "text": "樂天派",
    "active": false
}, {
    "text": "黎明",
    "active": false
}, {
    "text": "女神",
    "active": false
}, {
    "text": "天使",
    "active": false
}, {
    "text": "星星",
    "active": false
}, {
    "text": "太陽",
    "active": false
}, {
    "text": "月亮",
    "active": false
}, {
    "text": "我",
    "active": false
}, {
    "text": "你",
    "active": false
}, {
    "text": "世界",
    "active": false
}, {
    "text": "春天",
    "active": false
}, {
    "text": "夏天",
    "active": false
}, {
    "text": "秋天",
    "active": false
}, {
    "text": "冬天",
    "active": false
}, {
    "text": "答案",
    "active": false
}, {
    "text": "人",
    "active": false
}, {
    "text": "火焰",
    "active": false
}, {
    "text": "冰凍",
    "active": false
}, {
    "text": "閃電",
    "active": false
}, {
    "text": "希望",
    "active": false
}, {
    "text": "鴿子",
    "active": false
}, {
    "text": "炸彈",
    "active": false
}, {
    "text": "無限",
    "active": false
}, {
    "text": "節奏",
    "active": false
}, {
    "text": "光",
    "active": false
}, {
    "text": "粉碎",
    "active": false
}, {
    "text": "守護者",
    "active": false
}, {
    "text": "夥伴",
    "active": false
}, {
    "text": "魂",
    "active": false
}, {
    "text": "學霸",
    "active": false
}, {
    "text": "娛樂",
    "active": false
}, {
    "text": "銀河",
    "active": false
}, {
    "text": "螺旋",
    "active": false
}, {
    "text": "地獄",
    "active": false
}, {
    "text": "指揮官",
    "active": false
}, {
    "text": "騎士",
    "active": false
}, {
    "text": "神聖",
    "active": false
}, {
    "text": "天堂",
    "active": false
}, {
    "text": "復活",
    "active": false
}, {
    "text": "聯盟",
    "active": false
}, {
    "text": "風暴",
    "active": false
}, {
    "text": "精靈",
    "active": false
}, {
    "text": "混沌",
    "active": false
}, {
    "text": "王座",
    "active": false
}, {
    "text": "究極",
    "active": false
}, {
    "text": "幻影",
    "active": false
}, {
    "text": "沉睡",
    "active": false
}, {
    "text": "紅蓮",
    "active": false
}, {
    "text": "生命",
    "active": false
}, {
    "text": "萬物",
    "active": false
}, {
    "text": "黑",
    "active": false
}, {
    "text": "白",
    "active": false
}, {
    "text": "紅",
    "active": false
}, {
    "text": "橙",
    "active": false
}, {
    "text": "黃",
    "active": false
}, {
    "text": "綠",
    "active": false
}, {
    "text": "青",
    "active": false
}, {
    "text": "藍",
    "active": false
}, {
    "text": "紫",
    "active": false
}, {
    "text": "灰",
    "active": false
}, {
    "text": "金",
    "active": false
}, {
    "text": "銀",
    "active": false
}, {
    "text": "進擊",
    "active": false
}, {
    "text": "魔女",
    "active": false
}, {
    "text": "笑容",
    "active": false
}, {
    "text": "好男兒",
    "active": false
}, {
    "text": "天才",
    "active": false
}, {
    "text": "閃光",
    "active": false
}, {
    "text": "老大",
    "active": false
}, {
    "text": "戰友",
    "active": false
}, {
    "text": "彩虹",
    "active": false
}, {
    "text": "女兒",
    "active": false
}, {
    "text": "子",
    "active": false
}, {
    "text": "黑夜",
    "active": false
}, {
    "text": "才能",
    "active": false
}, {
    "text": "友人",
    "active": false
}, {
    "text": "媽媽",
    "active": false
}, {
    "text": "力量",
    "active": false
}, {
    "text": "色彩",
    "active": false
}, {
    "text": "花冠",
    "active": false
}, {
    "text": "強大",
    "active": false
}, {
    "text": "孤獨",
    "active": false
}, {
    "text": "幸運",
    "active": false
}, {
    "text": "美食家",
    "active": false
}, {
    "text": "魔術師",
    "active": false
}, {
    "text": "音樂節",
    "active": false
}, {
    "text": "舞者",
    "active": false
}, {
    "text": "女僕",
    "active": false
}, {
    "text": "粉絲",
    "active": false
}, {
    "text": "末日",
    "active": false
}, {
    "text": "噩夢",
    "active": false
}, {
    "text": "龍",
    "active": false
}, {
    "text": "暖和",
    "active": false
}, {
    "text": "惡魔",
    "active": false
}, {
    "text": "可憐",
    "active": false
}, {
    "text": "靜悄悄",
    "active": false
}, {
    "text": "動人",
    "active": false
}, {
    "text": "理想",
    "active": false
}, {
    "text": "正直",
    "active": false
}, {
    "text": "燦爛",
    "active": false
}, {
    "text": "奇異",
    "active": false
}, {
    "text": "毛茸茸",
    "active": false
}, {
    "text": "貓貓",
    "active": false
}, {
    "text": "汪汪",
    "active": false
}, {
    "text": "沉穩",
    "active": false
}, {
    "text": "黑暗",
    "active": false
}, {
    "text": "光明",
    "active": false
}, {
    "text": "典雅",
    "active": false
}, {
    "text": "強者",
    "active": false
}, {
    "text": "未來",
    "active": false
}, {
    "text": "人類",
    "active": false
}, {
    "text": "大師",
    "active": false
}, {
    "text": "祈禱",
    "active": false
}, {
    "text": "王",
    "active": false
}]

export const description2 = [{
    "text": "（無）",
    "active": false
}, {
    "text": "的",
    "active": false
}, {
    "text": "與",
    "active": false
}, {
    "text": "即",
    "active": false
}, {
    "text": "和",
    "active": false
}, {
    "text": "是",
    "active": false
}, {
    "text": "為",
    "active": false
}, {
    "text": "很",
    "active": false
}, {
    "text": "即是",
    "active": false
}, {
    "text": "兼",
    "active": false
}, {
    "text": "在",
    "active": false
}, {
    "text": "對",
    "active": false
}, {
    "text": "如",
    "active": false
}, {
    "text": "並",
    "active": false
}, {
    "text": "★",
    "active": false
}, {
    "text": "☆",
    "active": false
}, {
    "text": "△",
    "active": false
}, {
    "text": "▲",
    "active": false
}, {
    "text": "▽",
    "active": false
}, {
    "text": "▼",
    "active": false
}, {
    "text": "○",
    "active": false
}, {
    "text": "●",
    "active": false
}, {
    "text": "◇",
    "active": false
}, {
    "text": "◆",
    "active": false
}, {
    "text": "♡",
    "active": false
}, {
    "text": "♥",
    "active": false
}, {
    "text": "♤",
    "active": false
}, {
    "text": "♠",
    "active": false
}, {
    "text": "♧",
    "active": false
}, {
    "text": "♣",
    "active": false
}, {
    "text": "☼",
    "active": false
}, {
    "text": "☀",
    "active": false
}, {
    "text": "☽",
    "active": false
}, {
    "text": "☾",
    "active": false
}, {
    "text": "♀",
    "active": false
}, {
    "text": "♂",
    "active": false
}, {
    "text": "√",
    "active": false
}, {
    "text": "×",
    "active": false
}, {
    "text": "♪",
    "active": false
}, {
    "text": "♫",
    "active": false
}, {
    "text": "✿",
    "active": false
}, {
    "text": "✖",
    "active": false
}, {
    "text": "✚",
    "active": false
}, {
    "text": "❤",
    "active": false
}, {
    "text": "☂",
    "active": false
}, {
    "text": "☁",
    "active": false
}, {
    "text": "？",
    "active": false
}, {
    "text": "！",
    "active": false
}]

export const description3 = description1

export const roleName = [
    "七實",
    "萬事",
    "麗芙",
    "卡列尼娜",
    "卡穆",
    "常羽",
    "庫洛姆",
    "曲",
    "比安卡",
    "阿爾法",
    "渡邊",
    "神威",
    "維里耶",
    "羅蘭",
    "羅塞塔",
    "艾拉",
    "蘇菲亞",
    "蒲牢",
    "薇拉",
    "賽琳娜",
    "里",
    "太阿",
    "露娜",
    "露西亞"
]