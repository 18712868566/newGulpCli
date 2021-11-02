let delIcon, rotateIcon;
let stageW, stageH;

class DragImg {
    constructor(img, canvas, type = 0) {
        this.w = img.width * (type === 1 ? 0.1 : 0.35)
        this.h = img.height * (type === 1 ? 0.1 : 0.35)
        this.x = (stageW - this.w) / 2
        this.y = (stageH - this.h) / 2.5
        this.url = img.url
        this.ctx = canvas
        this.rotate = 0
        this.selected = true
    }
    paint() {
        this.ctx.save()
        this.centerX = this.x + this.w / 2
        this.centerY = this.y + this.h / 2
        // 旋转元素
        this.ctx.translate(this.centerX, this.centerY)
        this.ctx.rotate(this.rotate * Math.PI / 180)
        this.ctx.translate(-this.centerX, -this.centerY)
        // 渲染元素
        this.ctx.drawImage(this.url, this.x, this.y, this.w, this.h)
        // 如果是选中状态，绘制选择虚线框，和缩放图标、删除图标
        if (this.selected) {
            this.ctx.setLineDash([10, 10])
            this.ctx.lineWidth = 2
            this.ctx.strokeStyle = '#74a2f6'
            this.ctx.lineDashOffset = 10
            this.ctx.strokeRect(this.x, this.y, this.w, this.h)
            this.ctx.drawImage(rotateIcon, this.x + this.w - 12, this.y + this.h - 12, 24, 24)
            // this.ctx.fillRect(this.x + this.w - 12, this.y + this.h - 12, 24, 24)
            this.ctx.drawImage(delIcon, this.x - 12, this.y - 12, 24, 24)
            // this.ctx.fillRect(this.x - 12, this.y - 12, 24, 24)
        }
        this.ctx.restore()
    }
    isInWhere(x, y) {
        // 变换区域左上角的坐标和区域的高度宽度
        const transformW = 24
        const transformH = 24
        let transformX = this.x + this.w
        let transformY = this.y + this.h
        const transformAngle = Math.atan2(transformY - this.centerY, transformX - this.centerX) / Math.PI * 180 + this.rotate
        const transformXY = this.getTransform(transformX, transformY, transformAngle)
        transformX = transformXY.x;
        transformY = transformXY.y
        // 删除区域左上角的坐标和区域的高度宽度
        const delW = 24
        const delH = 24
        let delX = this.x
        let delY = this.y
        const delAngle = Math.atan2(delY - this.centerY, delX - this.centerX) / Math.PI * 180 + this.rotate
        const delXY = this.getTransform(delX, delY, delAngle)
        delX = delXY.x;
        delY = delXY.y
        // 移动区域的坐标
        if (x - transformX >= 0 && y - transformY >= 0 && transformX + transformW - x >= 0 && transformY + transformH - y >= 0) {
            // 缩放区域
            return 'transform'
        } else if (x - delX >= 0 && y - delY >= 0 && delX + delW - x >= 0 && delY + delH - y >= 0) {
            // 删除区域
            return 'del'
        } else if (this.isPosInRotationRect(x, y)) {
            // 移动区域
            return 'move'
        }
        // 不在选择区域里面
        return false
    }
    isPosInRotationRect(X, Y) {
        const hw = this.w / 2;
        const hh = this.h / 2
        const O = this.rotate;
        const center = {
            x: this.centerX,
            y: this.centerY,
        };
        const r = -O * (Math.PI / 180)
        const nTempX = center.x + (X - center.x) * Math.cos(r) - (Y - center.y) * Math.sin(r);
        const nTempY = center.y + (X - center.x) * Math.sin(r) + (Y - center.y) * Math.cos(r);
        if (nTempX > center.x - hw && nTempX < center.x + hw && nTempY > center.y - hh && nTempY < center.y + hh) {
            return true;
        }
        return false
    }
    getTransform(x, y, rotate) {
        // 将角度化为弧度
        var angle = Math.PI / 180 * rotate
        // 初始坐标与中点形成的直线长度不管怎么旋转都是不会变的，用勾股定理求出然后将其作为斜边
        var r = Math.sqrt(Math.pow(x - this.centerX, 2) + Math.pow(y - this.centerY, 2))
        // 斜边乘sin值等于即可求出y坐标
        var a = Math.sin(angle) * r
        // 斜边乘cos值等于即可求出x坐标
        var b = Math.cos(angle) * r
        // 目前的xy坐标是相对于图片中点为原点的坐标轴，而我们的主坐标轴是canvas的坐标轴，所以要加上中点的坐标值才是标准的canvas坐标
        return {
            x: this.centerX + b - 12,
            y: this.centerY + a - 12
        }
    }
}
class Clipper {
    constructor({
        width,
        height,
        stage,
        delIconUrl,
        rotateIconUrl,
        backgroundUrl,
        drawAfter,
        dragBefore,
        initStage, // 初始化舞台
        deleteAfter
    }) {
        this.ctx = stage.getContext('2d')
        this.stage = stage
        stageW = this.stage.width = width
        stageH = this.stage.height = height
        this.dragArr = []
        this.clickedkArr = []
        this.lastImg = null
        this.initial = null
        this.startTouch = null
        this.offsetLeft = Math.round(this.stage.getBoundingClientRect().left)
        this.offsetTop = Math.round(this.stage.getBoundingClientRect().top)
        this.loadIcon(delIconUrl, rotateIconUrl)
        this.isPC = !/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
        if (this.isPC) {
            this.stage.onmousedown = () => document.onmousedown = (ev) => {
                this.start(ev.clientX - this.offsetLeft, ev.clientY - this.offsetTop)
            }
        } else {
            this.stage.ontouchstart = () => document.ontouchstart = (ev) => {
                this.start(ev.touches[0].clientX - this.offsetLeft, ev.touches[0].clientY - this.offsetTop)
            }
        }
        this.dragBefore = dragBefore
        this.drawAfter = drawAfter
        this.deleteAfter = deleteAfter
        this.backgroundUrl = backgroundUrl
        if (initStage) initStage(this.ctx)
        window.addEventListener('resize', () => {
            this.offsetLeft = Math.round(this.stage.getBoundingClientRect().left)
            this.offsetTop = Math.round(this.stage.getBoundingClientRect().top)
        })
    }
    loadIcon(d, r) {
        const dIcon = new Image()
        const rIcon = new Image()
        // dIcon.src = d + '?time=' + new Date().valueOf()
        // rIcon.src = r + '?time=' + new Date().valueOf()
        dIcon.src = d
        rIcon.src = r
        dIcon.crossOrigin = "anonymous"
        rIcon.crossOrigin = "anonymous"
        dIcon.onload = function() {
            delIcon = this
        }
        rIcon.onload = function() {
            rotateIcon = this
        }
    }
    draw() {
        this.ctx.clearRect(0, 0, this.stage.width, this.stage.height)
        // 绘制前
        if (this.dragBefore) this.dragBefore(this.ctx)
        this.dragArr.forEach((item) => {
            item.paint()
        })

        // 绘制后
        if (this.drawAfter) this.drawAfter(this.ctx)
    }
    start(x, y) {
        // 初始化一个数组用于存放所有被点击到的图片对象
        this.clickedkArr = []
        this.dragArr.forEach((item, index) => {
            const place = item.isInWhere(x, y)
            item.place = place
            item.index = index
            // 先将所有的item的selected变为flase
            item.selected = false
            if (place) {
                this.clickedkArr.push(item)
            }
        })
        const length = this.clickedkArr.length
        if (length) {
            const lastImg = this.clickedkArr[length - 1]
            if (lastImg.place === 'del') {
                if (this.deleteAfter) this.deleteAfter(lastImg)
                this.dragArr.splice(lastImg.index, 1)
                this.draw()
                return
            }
            // 提升层级
            /* this.dragArr.forEach((item, index) => {
                if (item.id === lastImg.id) {
                    const item = this.dragArr[index]
                    this.dragArr.splice(index, 1)
                    this.dragArr.push(item)
                    return false
                }
            }) */
            lastImg.selected = true
            this.lastImg = lastImg
            this.initial = {
                initialX: lastImg.x,
                initialY: lastImg.y,
                initialH: lastImg.h,
                initialW: lastImg.w,
                initialRotate: lastImg.rotate
            }
        }
        this.draw()
        this.startTouch = {
            startX: x,
            startY: y
        }

        if (this.isPC) {
            document.onmousemove = (ev) => this.move(ev.clientX - this.offsetLeft, ev.clientY - this.offsetTop)
            document.onmouseup = () => {
                document.onmousemove = null
                document.onmousedown = null
            }
        } else {
            document.ontouchmove = (ev) => {
                this.move(ev.touches[0].clientX - this.offsetLeft, ev.touches[0].clientY - this.offsetTop)
            }
        }
    }
    move(x, y) {
        const {
            initialX,
            initialY
        } = this.initial || {}
        const {
            startX,
            startY
        } = this.startTouch
        const lastImg = this.lastImg
        if (this.clickedkArr.length) {
            if (this.lastImg.place === 'move') {
                lastImg.x = initialX + (x - startX)
                lastImg.y = initialY + (y - startY)
            }
            if (this.lastImg.place === 'transform') {
                const {
                    centerX,
                    centerY
                } = lastImg
                // 旋转部分
                const {
                    initialRotate
                } = this.initial
                const angleBefore = Math.atan2(startY - centerY, startX - centerX) / Math.PI * 180
                const angleAfter = Math.atan2(y - centerY, x - centerX) / Math.PI * 180
                // 旋转的角度
                lastImg.rotate = initialRotate + angleAfter - angleBefore
                // 缩放部分
                const {
                    initialH,
                    initialW
                } = this.initial
                // 用勾股定理算出距离
                const lineA = Math.sqrt(Math.pow(centerX - startX, 2) + Math.pow(centerY - startY, 2))
                const lineB = Math.sqrt(Math.pow(centerX - x, 2) + Math.pow(centerY - y, 2))
                const w = initialW + (lineB - lineA)
                // 由于是等比缩放，所以乘一个宽高比例。
                const h = initialH + (lineB - lineA) * (initialH / initialW)
                // 定义最小宽高
                lastImg.w = w <= 5 ? 5 : w
                lastImg.h = h <= 5 ? 5 : h
                if (w > 5 && h > 5) {
                    // 放大 或 缩小
                    lastImg.x = initialX - (lineB - lineA) / 2
                    lastImg.y = initialY - (lineB - lineA) / 2
                }
            }
            this.draw()
        }
    }
    append(url, type = 0) {
        const self = this
        const img = new Image()
        // img.src = url + '?time=' + new Date().valueOf()
        img.src = url
        img.crossOrigin = "anonymous"
        img.onload = function() {
            this.url = this
            const item = new DragImg(this, self.ctx, type)
            item.type = type
            item.id = new Date().getTime() + Math.round(Math.random() * 100)
            // 角色不重复
            if (type === 1) {
                self.dragArr.forEach((item, index) => {
                    if (item.type === 1) {
                        self.dragArr.splice(index, 1)
                    }
                })
            }
            self.dragArr.push(item)
            self.draw()
        }
    }
    base64ToBlob(base64Data) {
        let arr = base64Data.split(","),
            fileType = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            l = bstr.length,
            u8Arr = new Uint8Array(l)

        while (l--) {
            u8Arr[l] = bstr.charCodeAt(l)
        }
        return new Blob([u8Arr], {
            type: fileType,
        })
    }
    save(fileName = 'image', fileType = 'png') {
        let aLink = document.createElement('a');
        let blob = this.base64ToBlob(this.stage.toDataURL("image/" + fileType, 2));
        let evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", true, true);
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
        aLink.click();
    }
    output(fileName = 'image', fileType = 'png') {
        const blobToFile = function(newBlob) {
            return new File([newBlob], fileType, {
                type: "image/" + fileType
            })
        }
        const blob = this.base64ToBlob(this.stage.toDataURL("image/png"))
        return blobToFile(blob, fileName)
    }
}

export default Clipper