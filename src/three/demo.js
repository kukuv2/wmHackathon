define("app/TD", [], function () {
    var e = e || {};
    return e.ajax = function (e, t, n) {
        $.ajax({
            type: e.type || "GET",
            url: e.url,
            dataType: "json",
            data: e.data || "",
            success: function (e) {
                e.status == 1 ? t && t(e.data) : n && n(e.message)
            },
            error: function (e, t, r) {
                n && n("网络连接不稳定，请重试或刷新页面！")
            }
        })
    }
        ,
        e.wxShare = function (t, n) {
            wx.onMenuShareTimeline({
                title: t.title,
                link: t.link,
                imgUrl: t.img,
                success: function () {
                    n && n(),
                        e.ajax({
                            type: "POST",
                            url: t.track,
                            data: {
                                btn: "2"
                            }
                        }, function (e) {
                            console.log(e)
                        })
                },
                cancel: function () {
                }
            }),
                wx.onMenuShareAppMessage({
                    title: t.title,
                    desc: t.desc,
                    link: t.link,
                    imgUrl: t.img,
                    success: function () {
                        n && n(),
                            e.ajax({
                                type: "POST",
                                url: t.track,
                                data: {
                                    btn: "1"
                                }
                            }, function (e) {
                                console.log(e)
                            })
                    },
                    cancel: function () {
                    }
                })
        }
        ,
        e.initWxApi = function (t, n) {
            wx.config({
                debug: !1,
                appId: t.appId,
                timestamp: t.timestamp,
                nonceStr: t.nonceStr,
                signature: t.signature,
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage"]
            }),
                wx.ready(function () {
                    e.wxShare(t.share)
                })
        }
        ,
        e.wxShareSplit = function (t, n) {
            wx.onMenuShareTimeline({
                title: t.Timeline.title,
                link: t.Timeline.link,
                imgUrl: t.Timeline.img,
                success: function () {
                    n && n(),
                        e.ajax({
                            type: "POST",
                            url: t.Timeline.track,
                            data: {
                                btn: "2"
                            }
                        }, function (e) {
                            console.log(e)
                        })
                },
                cancel: function () {
                }
            }),
                wx.onMenuShareAppMessage({
                    title: t.AppMessage.title,
                    desc: t.AppMessage.desc,
                    link: t.AppMessage.link,
                    imgUrl: t.AppMessage.img,
                    success: function () {
                        n && n(),
                            e.ajax({
                                type: "POST",
                                url: t.AppMessage.track,
                                data: {
                                    btn: "1"
                                }
                            }, function (e) {
                                console.log(e)
                            })
                    },
                    cancel: function () {
                    }
                })
        }
        ,
        e.initWxApiSplit = function (t, n) {
            wx.config({
                debug: !0,
                appId: t.appId,
                timestamp: t.timestamp,
                nonceStr: t.nonceStr,
                signature: t.signature,
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage"]
            }),
                wx.ready(function () {
                    e.wxShareSplit(t.share)
                })
        }
        ,
        e.preload = function (t) {
            var n = this;
            this.loading = null ,
                this.loaded = null ,
                this.fail = null;
            var r = t.imgs ? t.imgs.length : 0
                , i = t.ajaxs ? t.ajaxs.length : 0
                , s = r + i
                , o = 0
                , u = []
                , a = function () {
                    var e = function () {
                            o++,
                                o == s ? (n.loading && n.loading(100),
                                n.loaded && n.loaded(u)) : n.loading && n.loading(Math.round(o / s * 100))
                        }
                        ;
                    for (var i = 0; i < r; i++) {
                        var a = new Image;
                        a.onload = a.onerror = e,
                            a.src = t.imgs[i],
                            u.push(a)
                    }
                }
                , f = function () {
                    var r = !1;
                    t.ajax.forEach(function (t) {
                        e.ajax({
                            url: t.url,
                            type: t.type || "GET",
                            data: t.data || ""
                        }, function (e) {
                            return function (t) {
                                if (r)
                                    return;
                                o++,
                                    o == s ? n.loaded && n.loaded(u) : n.loading && n.loading(Math.round(o / s * 100)),
                                e.succback && e.succback(t)
                            }
                        }(t), function (e) {
                            return function (t) {
                                r = !0,
                                n.fail && n.fail({
                                    msg: t,
                                    url: e.url
                                })
                            }
                        }(t))
                    })
                }
                ;
            this.init = function () {
                if (s == 0) {
                    this.loaded && this.loaded(t);
                    return
                }
                r !== 0 && a(),
                i !== 0 && f()
            }
        }
        ,
        e.pad = function () {
            var e = 5
                , t = [];
            return function (n, r) {
                r = r || e;
                var i = r - n.toString().length;
                return i <= 0 ? n : (t[i] || (t[i] = (new Array(i + 1)).join("0")),
                t[i] + n)
            }
        }(),
        e.preloadImgs = function () {
            var t = function (t, n, r, i) {
                    var s = this
                        , o = t.attr("data-prefix")
                        , u = parseInt(t.attr("data-keyTo"))
                        , a = []
                        , f = 0;
                    r = r || 5,
                        i = i || "png",
                        this.len = u + 1;
                    var l = function () {
                            f++,
                            s.onloading && s.onloading(Math.floor(f / (u + 1) * 100)),
                            f == u + 1 && (e.preloadImgs.buffer[o.slice(0, o.length - 1)] = a,
                            s.onload && s.onload())
                        }
                        ;
                    this.onload = null ,
                        this.onloading = null ,
                        this.load = function () {
                            for (var t = 0; t < u + 1; t++) {
                                var s = new Image;
                                s.src = n + o + e.pad(t, r) + "." + i,
                                    s.onload = s.onerror = l,
                                    a.push(s)
                            }
                        }
                }
                ;
            return t.buffer = {},
                t
        }(),
        e
}),
    define("app/Preload", ["app/TD"], function (e) {
        var t = function (n, r) {
                var i = this;
                this.onloading = null ,
                    this.onload = null ,
                    this.onfail = null;
                var s = n.imgs ? n.imgs.length : 0
                    , o = n.sprites ? n.sprites.length : 0
                    , u = n.keyimgs ? n.keyimgs.length : 0
                    , a = n.ajaxs ? n.ajaxs.length : 0
                    , f = r || 7
                    , l = s + o + u * f + a
                    , c = 0;
                this.getProcess = function () {
                    return c
                }
                ;
                var h = function () {
                        var e = function (e) {
                                c++,
                                    t.buffer.imgs[this.bufferName] = this,
                                    c == l ? (i.onloading && i.onloading(40),
                                    i.onload && i.onload(40)) : i.onloading && i.onloading(Math.round(c / l * 40))
                            }
                            ;
                        for (var r = 0; r < s; r++) {
                            var o = new Image;
                            o.onload = o.onerror = e,
                                o.bufferName = n.imgs[r].name,
                                o.src = n.imgs[r].url
                        }
                    }
                    , p = function () {
                        var e = function () {
                                c++,
                                    t.buffer.sprites[this.bufferName] = this,
                                    c == l ? (i.onloading && i.onloading(100),
                                    i.onload && i.onload()) : i.onloading && i.onloading(Math.round(c / l * 100))
                            }
                            ;
                        for (var r = 0; r < o; r++) {
                            var s = new Image;
                            s.onload = s.onerror = e,
                                s.bufferName = n.sprites[r].name,
                                s.src = n.sprites[r].url
                        }
                    }
                    , d = function () {
                        var r = function () {
                                c = c + f - this.keyProcess,
                                    t.buffer.keyimgs = e.preloadImgs.buffer,
                                    c == l ? (i.onloading && i.onloading(100),
                                    i.onload && i.onload()) : i.onloading && i.onloading(Math.round(c / l * 100))
                            }
                            , s = function (e) {
                                var t = Math.floor(e * f / 100);
                                if (t == this.keyProcess)
                                    return;
                                var n = t - this.keyProcess;
                                c += n,
                                    this.keyProcess = t,
                                t !== f && i.onloading && i.onloading(Math.round(c / l * 100))
                            }
                            ;
                        for (var o = 0; o < u; o++) {
                            var a = new e.preloadImgs(n.keyimgs[o].el, n.keyimgs[o].pathPrefix, n.keyimgs[o].pad, n.keyimgs[o].postfix);
                            a.onload = r,
                                a.onloading = s,
                                a.keyProcess = 0,
                                a.load()
                        }
                    }
                    , v = function () {
                        var t = function () {
                                c++,
                                    c == l ? (i.onloading && i.onloading(100),
                                    i.onload && i.onload()) : i.onloading && i.onloading(Math.round(c / l * 100))
                            }
                            ;
                        n.ajaxs.forEach(function (n) {
                            e.ajax({
                                url: n.url,
                                type: n.type || "GET",
                                data: n.data || ""
                            }, function (e) {
                                return function (n) {
                                    t(),
                                    e.succback && e.succback(n)
                                }
                            }(n), function (e) {
                                return function (n) {
                                    t(),
                                    e.errback && e.errback(n),
                                    i.onfail && i.onfail({
                                        msg: n,
                                        url: e.url
                                    })
                                }
                            }(n))
                        })
                    }
                    ;
                this.load = function () {
                    if (l == 0) {
                        this.onload && this.onload();
                        return
                    }
                    s !== 0 && h(),
                    o !== 0 && p(),
                    u !== 0 && d(),
                    a !== 0 && v()
                }
            }
            ;
        return t.buffer = {
            imgs: {},
            sprites: {},
            keyimgs: {}
        },
            t
    }),
    define("app/Config", ["app/Preload"], function (e) {
        var t = t || {};
        t.URL_initSDK = "http://nba.treedom.cn/back/index.php?m=index&c=wechat&a=signature",
            t.URL_trackShare = "http://nba.treedom.cn/back/index.php?m=index&c=index&a=track",
            t.imgPath = "http://7xnf0o.com2.z0.glb.qiniucdn.com/",
            t.modePath = "http://td-pub.oss-cn-shenzhen.aliyuncs.com/tx-nba-20151010/model/",
            t.defShare = {
                title: "开启NBA2015中国赛魔性空间",
                desc: "NBA2015中国赛魔性空间开启中，我的宇宙因你而转，中兴特约。",
                link: location.href,
                img: "http://nba.treedom.cn/img/share.jpg",
                track: t.URL_trackShare
            },
            t.audioPath = {
                bg: t.imgPath + "music_bg.mp3"
            },
            t.process = 0,
            t.audio = {},
            t.pageImgs = {
                imgs: [
                    {
                        name: "bg",
                        url: t.imgPath + "bg.jpg"
                    }, {
                        name: "bg_bl_info",
                        url: t.imgPath + "bg_bl_info.png"
                    }, {
                        name: "bg_btn",
                        url: t.imgPath + "bg_btn.png"
                    }, {
                        name: "bg_btn_arrow",
                        url: t.imgPath + "bg_btn_arrow.png"
                    }, {
                        name: "bg_btn_close_detail",
                        url: t.imgPath + "bg_btn_close_detail.png"
                    }, {
                        name: "bg_btn_far",
                        url: t.imgPath + "bg_btn_far.png"
                    }, {
                        name: "bg_btn_info",
                        url: t.imgPath + "bg_btn_info.png"
                    }, {
                        name: "bg_btn_r_arrow",
                        url: t.imgPath + "bg_btn_r_arrow.png"
                    }, {
                        name: "bg_btn_share",
                        url: t.imgPath + "bg_btn_share.png"
                    }, {
                        name: "bg_center_info",
                        url: t.imgPath + "bg_center_info.png"
                    }, {
                        name: "bg_cqzb_info",
                        url: t.imgPath + "bg_cqzb_info.png"
                    }, {
                        name: "bg_detail_center",
                        url: t.imgPath + "bg_detail_center.png"
                    }, {
                        name: "bg_detail_dj",
                        url: t.imgPath + "bg_detail_dj.png"
                    }, {
                        name: "bg_detail_djzx",
                        url: t.imgPath + "bg_detail_djzx.png"
                    }, {
                        name: "bg_detail_dymt",
                        url: t.imgPath + "bg_detail_dymt.png"
                    }, {
                        name: "bg_detail_fif",
                        url: t.imgPath + "bg_detail_fif.png"
                    }, {
                        name: "bg_detail_glf",
                        url: t.imgPath + "bg_detail_glf.png"
                    }, {
                        name: "bg_detail_hours",
                        url: t.imgPath + "bg_detail_hours.png"
                    }, {
                        name: "bg_detail_lsh",
                        url: t.imgPath + "bg_detail_lsh.png"
                    }, {
                        name: "bg_detail_mn",
                        url: t.imgPath + "bg_detail_mn.png"
                    }, {
                        name: "bg_detail_pes",
                        url: t.imgPath + "bg_detail_pes.png"
                    }, {
                        name: "bg_detail_qd",
                        url: t.imgPath + "bg_detail_qd.png"
                    }, {
                        name: "bg_bl_info",
                        url: t.imgPath + "bg_bl_info.png"
                    }, {
                        name: "bg_detail_qx",
                        url: t.imgPath + "bg_detail_qx.png"
                    }, {
                        name: "bg_detail_sj",
                        url: t.imgPath + "bg_detail_sj.png"
                    }, {
                        name: "bg_detail_sjds",
                        url: t.imgPath + "bg_detail_sjds.png"
                    }, {
                        name: "bg_detail_sxj",
                        url: t.imgPath + "bg_detail_sxj.png"
                    }, {
                        name: "bg_detail_txapp",
                        url: t.imgPath + "bg_detail_txapp.png"
                    }, {
                        name: "bg_detail_ty",
                        url: t.imgPath + "bg_detail_ty.png"
                    }, {
                        name: "bg_detail_tysq",
                        url: t.imgPath + "bg_detail_tysq.png"
                    }, {
                        name: "bg_detail_wx",
                        url: t.imgPath + "bg_detail_wx.png"
                    }, {
                        name: "bg_detail_xhy",
                        url: t.imgPath + "bg_detail_xhy.png"
                    }, {
                        name: "bg_detail_xqd",
                        url: t.imgPath + "bg_detail_xqd.png"
                    }, {
                        name: "bg_detail_yf",
                        url: t.imgPath + "bg_detail_yf.png"
                    }, {
                        name: "bg_detail_zs",
                        url: t.imgPath + "bg_detail_zs.png"
                    }, {
                        name: "bg_detail_zsb",
                        url: t.imgPath + "bg_detail_zsb.png"
                    }, {
                        name: "bg_dj_info",
                        url: t.imgPath + "bg_dj_info.png"
                    }, {
                        name: "bg_djzx_info",
                        url: t.imgPath + "bg_djzx_info.png"
                    }, {
                        name: "bg_dymt_info",
                        url: t.imgPath + "bg_dymt_info.png"
                    }, {
                        name: "bg_fif_info",
                        url: t.imgPath + "bg_fif_info.png"
                    }, {
                        name: "bg_glf_info",
                        url: t.imgPath + "bg_glf_info.png"
                    }, {
                        name: "bg_housr_info",
                        url: t.imgPath + "bg_housr_info.png"
                    }, {
                        name: "bg_icon",
                        url: t.imgPath + "bg_icon.png"
                    }, {
                        name: "bg_line",
                        url: t.imgPath + "bg_line.png"
                    }, {
                        name: "bg_jcxj_info",
                        url: t.imgPath + "bg_jcxj_info.png"
                    }, {
                        name: "bg_line_pause",
                        url: t.imgPath + "bg_line_pause.png"
                    }, {
                        name: "bg_logo",
                        url: t.imgPath + "bg_logo.png"
                    }, {
                        name: "bg_lsh_info",
                        url: t.imgPath + "bg_lsh_info.png"
                    }, {
                        name: "bg_mn_info",
                        url: t.imgPath + "bg_mn_info.png"
                    }, {
                        name: "bg_nba_info",
                        url: t.imgPath + "bg_nba_info.png"
                    }, {
                        name: "bg_opening_content",
                        url: t.imgPath + "bg_opening_content.png"
                    }, {
                        name: "bg_opening_tips",
                        url: t.imgPath + "bg_opening_tips.png"
                    }, {
                        name: "bg_pes_info",
                        url: t.imgPath + "bg_pes_info.png"
                    }, {
                        name: "bg_qd_info",
                        url: t.imgPath + "bg_qd_info.png"
                    }, {
                        name: "bg_qx_info",
                        url: t.imgPath + "bg_qx_info.png"
                    }, {
                        name: "bg_share_tips",
                        url: t.imgPath + "bg_share_tips.png"
                    }, {
                        name: "bg_sjds_info",
                        url: t.imgPath + "bg_sjds_info.png"
                    }, {
                        name: "bg_temcemt",
                        url: t.imgPath + "bg_temcemt.png"
                    }, {
                        name: "bg_txapp_info",
                        url: t.imgPath + "bg_txapp_info.png"
                    }, {
                        name: "bg_ty_info",
                        url: t.imgPath + "bg_ty_info.png"
                    }, {
                        name: "bg_tysq_info",
                        url: t.imgPath + "bg_tysq_info.png"
                    }, {
                        name: "bg_vidicon_detail_video",
                        url: t.imgPath + "bg_vidicon_detail_video.png"
                    }, {
                        name: "bg_wx_info",
                        url: t.imgPath + "bg_wx_info.png"
                    }, {
                        name: "bg_xhy_info",
                        url: t.imgPath + "bg_xhy_info.png"
                    }, {
                        name: "bg_yf_info",
                        url: t.imgPath + "bg_yf_info.png"
                    }, {
                        name: "bg_zs_info",
                        url: t.imgPath + "bg_zs_info.png"
                    }, {
                        name: "bg_zsb_info",
                        url: t.imgPath + "bg_zsb_info.png"
                    }, {
                        name: "bg_zsb_info",
                        url: t.imgPath + "bg_zsb_info.png"
                    }, {
                        name: "share",
                        url: t.imgPath + "share.jpg"
                    }
                ],
                sprites: [],
                keyimgs: []
            },
            t.modelArray = [
                {
                    id: 0,
                    modelName: "sxj",
                    modelDescription: "超清直播",
                    modelSrc: t.modePath + "sxj.json",
                    color: "",
                    x: "0.20964",
                    y: "11.04988",
                    z: "-9.46932",
                    scaleX: .2,
                    scaleY: .2,
                    scaleZ: .2,
                    modelType: "materialModel",
                    infoClassName: "sxj",
                    detailContentEl: $(".sxj-content")
                }, {
                    id: 1,
                    modelName: "qx",
                    modelDescription: "球鞋装备",
                    modelSrc: t.modePath + "qx.json",
                    color: "",
                    x: "8.09151",
                    y: "21.34972",
                    z: "6.69884",
                    scaleX: .2,
                    scaleY: .2,
                    scaleZ: .2,
                    modelType: "materialModel",
                    infoClassName: "qx",
                    detailContentEl: $(".qx-content")
                }, {
                    id: 2,
                    modelName: "hours",
                    modelDescription: "7*4小时",
                    modelSrc: t.modePath + "hours.json",
                    color: "",
                    x: "-1.33007",
                    y: "17.5529",
                    z: "15.45098",
                    scaleX: .2,
                    scaleY: .2,
                    scaleZ: .2,
                    modelType: "materialModel",
                    infoClassName: "hours",
                    detailContentEl: $(".hours-content")
                }, {
                    id: 3,
                    modelName: "cl",
                    modelDescription: "数据大师",
                    modelSrc: t.modePath + "cl.json",
                    color: "",
                    x: "12.02545",
                    y: "-6.49629",
                    z: "-17.99562",
                    scaleX: .2,
                    scaleY: .2,
                    scaleZ: .2,
                    modelType: "materialModel",
                    infoClassName: "cl",
                    detailContentEl: $(".cl-content")
                }, {
                    id: 4,
                    modelName: "sq",
                    modelDescription: "体育社区",
                    modelSrc: t.modePath + "sq.json",
                    color: "",
                    x: "-14.16725",
                    y: "4.02946",
                    z: "-2.76642",
                    scaleX: .22,
                    scaleY: .22,
                    scaleZ: .22,
                    modelType: "materialModel",
                    infoClassName: "sq",
                    detailContentEl: $(".sq-content")
                }, {
                    id: 5,
                    modelName: "sj",
                    modelDescription: "手机",
                    modelSrc: t.modePath + "shouji.png",
                    color: "",
                    x: "13.31534",
                    y: "-5.26887",
                    z: "4.41674",
                    scaleX: .2,
                    scaleY: .2,
                    scaleZ: .2,
                    modelType: "imgModel",
                    infoClassName: "sj",
                    detailContentEl: $(".sj-content")
                }, {
                    id: 6,
                    modelName: "wx",
                    modelDescription: "微信",
                    modelSrc: t.modePath + "wx.json",
                    color: "",
                    x: "-12.92922",
                    y: "-19.63365",
                    z: "-0.09875",
                    scaleX: .3,
                    scaleY: .3,
                    scaleZ: .3,
                    modelType: "materialModel",
                    infoClassName: "wx",
                    detailContentEl: $(".wx-content")
                }, {
                    id: 7,
                    modelName: "mkf",
                    modelDescription: "独家专享",
                    modelSrc: t.modePath + "mkf.json",
                    color: "",
                    x: "-14.96728",
                    y: "0.74384",
                    z: "18.05935",
                    scaleX: .2,
                    scaleY: .2,
                    scaleZ: .2,
                    modelType: "materialModel",
                    infoClassName: "mkf",
                    detailContentEl: $(".mkf-content")
                }, {
                    id: 8,
                    modelName: "jcxj",
                    modelDescription: "巨星城记",
                    modelSrc: t.modePath + "jcxj.json",
                    color: "",
                    x: "-11.43675",
                    y: "-7.71845",
                    z: "6.18814",
                    scaleX: .2,
                    scaleY: .2,
                    scaleZ: .2,
                    modelType: "materialModel",
                    infoClassName: "jcxj",
                    detailContentEl: $(".jcxj-content")
                }, {
                    id: 9,
                    modelName: "xhy",
                    modelDescription: "多路信号源",
                    modelSrc: t.modePath + "xhy.json",
                    color: "",
                    x: "0.0499",
                    y: "-21.17553",
                    z: "24.49749",
                    scaleX: .2,
                    scaleY: .2,
                    scaleZ: .2,
                    modelType: "materialModel",
                    infoClassName: "xhy",
                    detailContentEl: $(".xhy-content")
                }, {
                    id: 10,
                    modelName: "dj",
                    modelDescription: "神秘道具",
                    modelSrc: t.modePath + "dj.json",
                    color: "",
                    x: "16.41089",
                    y: "4.18214",
                    z: "-5.76675",
                    scaleX: .15,
                    scaleY: .15,
                    scaleZ: .15,
                    modelType: "materialModel",
                    infoClassName: "dj",
                    detailContentEl: $(".dj-content")
                }, {
                    id: 11,
                    modelName: "khd",
                    modelDescription: "腾讯体育APP",
                    modelSrc: t.modePath + "khd.json",
                    color: "",
                    x: "14.74418",
                    y: "18.1383",
                    z: "-3.98433",
                    scaleX: .2,
                    scaleY: .2,
                    scaleZ: .2,
                    modelType: "materialModel",
                    infoClassName: "khd",
                    detailContentEl: $(".khd-content")
                }, {
                    id: 12,
                    modelName: "yf",
                    modelDescription: "动感音符",
                    modelSrc: t.modePath + "yf.json",
                    color: "",
                    x: "-16.70434",
                    y: "-13.62124",
                    z: "9.53891",
                    scaleX: .2,
                    scaleY: .2,
                    scaleZ: .2,
                    modelType: "materialModel",
                    infoClassName: "yf",
                    detailContentEl: $(".yf-content")
                }, {
                    id: 13,
                    modelName: "round",
                    modelDescription: "全平台体验",
                    modelSrc: t.modePath + "round.json",
                    color: "",
                    x: "3.11592",
                    y: "-11.43062",
                    z: "9.7193",
                    scaleX: .2,
                    scaleY: .2,
                    scaleZ: .2,
                    modelType: "materialModel",
                    infoClassName: "round",
                    detailContentEl: $(".round-content")
                }, {
                    id: 14,
                    modelName: "zsb",
                    modelDescription: "战术板",
                    modelSrc: t.modePath + "zsb.json",
                    color: "",
                    x: "-27.21435",
                    y: "8.17494",
                    z: "14.08078",
                    scaleX: .2,
                    scaleY: .2,
                    scaleZ: .2,
                    modelType: "materialModel",
                    infoClassName: "zsb",
                    detailContentEl: $(".zsb-content")
                }, {
                    id: 15,
                    modelName: "nba",
                    modelDescription: "NBA神迹",
                    modelSrc: t.modePath + "nba.json",
                    color: "",
                    x: "35.67752",
                    y: "12.87302",
                    z: "-19.80898",
                    scaleX: .2,
                    scaleY: .2,
                    scaleZ: .2,
                    modelType: "materialModel",
                    infoClassName: "nba",
                    detailContentEl: $(".nba-content")
                }, {
                    id: 16,
                    modelName: "fif",
                    modelDescription: "五年之约",
                    modelSrc: t.modePath + "fif.json",
                    color: "",
                    x: "1.31335",
                    y: "-18.22759",
                    z: "-14.444",
                    scaleX: .25,
                    scaleY: .25,
                    scaleZ: .25,
                    modelType: "materialModel",
                    infoClassName: "fif",
                    detailContentEl: $(".fif-content")
                }, {
                    id: 17,
                    animateId: 0,
                    modelName: "pes",
                    modelDescription: "",
                    modelSrc: [t.modePath + "pes_q.json", t.modePath + "pes.json"],
                    color: "",
                    x: "-18.91489",
                    y: "-10.38626",
                    z: "22.66071",
                    animateTime: 900,
                    scaleX: 60,
                    scaleY: 60,
                    scaleZ: 60,
                    modelType: "animateModel",
                    infoClassName: "pes",
                    detailContentEl: $(".pes-content")
                }, {
                    id: 18,
                    animateId: 1,
                    modelName: "lsh",
                    modelDescription: "",
                    modelSrc: [t.modePath + "lsh_q.json", t.modePath + "lsh.json"],
                    color: "",
                    x: "-19.02438",
                    y: "22.10949",
                    z: "-14.57588",
                    animateTime: 800,
                    scaleX: 80,
                    scaleY: 80,
                    scaleZ: 80,
                    modelType: "animateModel",
                    infoClassName: "lsh",
                    detailContentEl: $(".lsh-content")
                }, {
                    id: 19,
                    animateId: 2,
                    modelName: "people2",
                    modelDescription: "",
                    modelSrc: [t.modePath + "xqd_q.json", t.modePath + "xqd.json"],
                    color: "",
                    x: "8.46544",
                    y: "14.0694",
                    z: "-27.02643",
                    scaleX: 65,
                    scaleY: 65,
                    scaleZ: 65,
                    animateTime: 600,
                    modelType: "animateModel",
                    infoClassName: "xqd",
                    detailContentEl: $(".xqd-content")
                }, {
                    id: 20,
                    animateId: 3,
                    modelName: "glf",
                    modelDescription: "",
                    modelSrc: [t.modePath + "glf_q.json", t.modePath + "glf.json"],
                    color: "",
                    x: "24.21298",
                    y: "-2.20743",
                    z: "-21.54449",
                    animateTime: 300,
                    scaleX: 60,
                    scaleY: 60,
                    scaleZ: 60,
                    modelType: "animateModel",
                    infoClassName: "glf",
                    detailContentEl: $(".glf-content")
                }, {
                    id: 21,
                    animateId: 4,
                    modelName: "bl",
                    modelDescription: "",
                    modelSrc: [t.modePath + "bl_q.json", t.modePath + "bl.json"],
                    color: "",
                    x: "20.46312",
                    y: "-24.59456",
                    z: "4.21407",
                    scaleX: 70,
                    scaleY: 70,
                    scaleZ: 70,
                    animateTime: 500,
                    modelType: "animateModel",
                    infoClassName: "bl",
                    detailContentEl: $(".bl-content")
                }, {
                    id: 22,
                    modelName: "mn",
                    modelDescription: "妖娆美女",
                    modelSrc: t.modePath + "mn.json",
                    color: "",
                    x: "-26.78565",
                    y: "12.9435",
                    z: "-5.25953",
                    scaleX: .2,
                    scaleY: .2,
                    scaleZ: .2,
                    modelType: "materialModel",
                    infoClassName: "mn",
                    detailContentEl: $(".mn-content")
                }, {
                    id: 23,
                    modelName: "dymt",
                    modelDescription: "大有名堂",
                    modelSrc: t.modePath + "dymt.json",
                    color: "",
                    x: "-0.25283",
                    y: "20.89999",
                    z: "-23.86304",
                    scaleX: .17,
                    scaleY: .17,
                    scaleZ: .17,
                    modelType: "materialModel",
                    infoClassName: "dymt",
                    detailContentEl: $(".dymt-content")
                }, {
                    id: 24,
                    modelName: "zs",
                    modelDescription: "NBA指数",
                    modelSrc: t.modePath + "zs.json",
                    color: "",
                    x: "28.15449",
                    y: "-13.87382",
                    z: "-12.26958",
                    scaleX: .2,
                    scaleY: .2,
                    scaleZ: .2,
                    modelType: "materialModel",
                    infoClassName: "zs",
                    detailContentEl: $(".zs-content")
                }, {
                    id: 25,
                    modelName: "center",
                    modelDescription: "中心",
                    modelSrc: t.modePath + "center.json",
                    color: "",
                    x: "0",
                    y: "0",
                    z: "0",
                    scaleX: .7,
                    scaleY: .7,
                    scaleZ: .7,
                    modelType: "materialModel",
                    infoClassName: "center",
                    detailContentEl: $(".center-content")
                }
            ],
            t.Preload = e;
        var n = window.navigator.userAgent.toLowerCase();
        return t.isAndroid = n.match(/android/i) ? !0 : !1,
            t
    }),
    define("app/LoadViewController", ["app/TD", "app/Config"], function (e, t) {
        var n = function () {
                var n = function () {
                        var e = 375
                            , t = 600
                            , n = $("[data-response]")
                            , r = $(".m-float-portrait")
                            , i = function () {
                                var i = window.innerWidth / e
                                    , s = window.innerHeight / t
                                    , o = i < s ? i : s;
                                window.innerWidth > window.innerHeight ? r.show() : r.hide(),
                                    n.each(function (e) {
                                        this.style.webkitTransform = "scale(" + o + ")"
                                    })
                            }
                            ;
                        i(),
                            $(window).on("resize", i)
                    }
                    ;
                e.ajax({
                    url: t.URL_initSDK,
                    type: "POST",
                    data: {
                        url: encodeURI(location.href)
                    }
                }, function (n) {
                    n.share = t.defShare,
                        e.initWxApi(n)
                }, function (e) {
                    console.log(e)
                }),
                    $(document.documentElement).on("touchmove", function (e) {
                        e.preventDefault()
                    }),
                    n()
            }
            , r = function () {
                var e = this
                    , r = {};
                r.pageEl = $(".m-loading"),
                    r.isInit = !1,
                    r.loadAudio = function () {
                        t.audio.bg = new Audio(t.audioPath.bg),
                            t.audio.bg.loop = !0
                    }
                    ,
                    r.init = function () {
                        if (r.isInit === !0)
                            return;
                        n(),
                            r.processEl = r.pageEl.find(".loadProcess .inner"),
                            r.contentEl = r.pageEl.find(".content"),
                            r.gload = new t.Preload(t.pageImgs),
                            r.gload.onloading = function (e) {
                                console.log(e),
                                    r.processEl.css("width", e + "%")
                            }
                            ,
                            r.gload.onload = function (n) {
                                t.process = n,
                                    e.hide()
                            }
                            ,
                            r.gload.onfail = function (e) {
                                console.log(e)
                            }
                            ,
                            r.isInit = !0,
                            r.loadAudio(),
                            TweenMax.to(".content", .1, {
                                opacity: 1,
                                onComplete: function () {
                                }
                            })
                    }
                    ,
                    e.show = function () {
                        r.pageEl.show()
                    }
                    ,
                    e.hide = function () {
                        e.onhide && e.onhide()
                    }
                    ,
                    e.load = function () {
                        r.gload.load()
                    }
                    ,
                    r.init()
            }
            ;
        return r
    }),
    define("app/IndexViewController", ["app/TD", "app/Config"], function (e, t) {
        var n = function () {
                function m() {
                    var t = u.getDelta();
                    e.globalGroupAnimate ? (o += .01,
                    o > 2 * Math.PI && (o = 0),
                        e.globalGroup.rotation.y = o) : o = 0;
                    if (e.animateStart && e.animateArray.length) {
                        var n = e.animateArray[e.selectAnimateId];
                        n.children[0].updateAnimation(n.modelInfo.animateTime * t),
                            n.children[1].updateAnimation(n.modelInfo.animateTime * t)
                    }
                    requestAnimationFrame(m),
                        g()
                }

                function g() {
                    e.renderer.render(e.scene, e.camera)
                }

                function y() {
                    e.loader = new THREE.JSONLoader,
                        a = new THREE.AmbientLight(16777215),
                        e.scene.add(a),
                        f = new THREE.PointLight(16777215),
                        f.intensity = 0,
                        f.position.set(0, 0, 0),
                        e.scene.add(f),
                        l = new THREE.PointLight(16777215),
                        l.position.set(900, -900, 0),
                        e.scene.add(l),
                        c = new THREE.PointLight(16777215),
                        c.position.set(-4500, 4500, 0),
                        e.scene.add(c),
                        h = new THREE.PointLight(44287),
                        h.position.set(-900, 0, 0),
                        e.scene.add(h),
                        p = new THREE.PointLight(16711694),
                        p.position.set(900, 0, 0),
                        e.scene.add(p),
                        e.globalGroup = new THREE.Group,
                        e.globalGroup.rotation.x = Math.PI / 2,
                        e.sphere = new THREE.Mesh(new THREE.SphereGeometry(1800, 15, 15), new THREE.MeshBasicMaterial({
                            color: 1711929,
                            wireframe: !0
                        })),
                        e.scene.add(e.sphere),
                        e.scene.add(e.globalGroup);
                    for (var n = 0, r = t.modelArray.length; n < r; n++)
                        switch (t.modelArray[n].modelType) {
                            case "animateModel":
                                E(t.modelArray[n]);
                                break;
                            case "materialModel":
                                S(t.modelArray[n]);
                                break;
                            case "imgModel":
                                T(t.modelArray[n]);
                                break;
                            case "circleModel":
                                x(t.modelArray[n]);
                                break;
                            default:
                                return
                        }
                }

                function b(e, t) {
                    return e.modelInfo.id - t.modelInfo.id
                }

                function w() {
                    n++,
                        n == i ? (e.onloading && e.onloading(100),
                            setTimeout(function () {
                                e.objectArray.sort(b),
                                    e.animateArray.sort(b),
                                    console.log("loadEnd"),
                                    e.show(),
                                e.onload && e.onload()
                            }, 300)) : e.onloading && e.onloading(t.process + Math.round(n / i * 60))
                }

                function E(t) {
                    var n = new THREE.BoxGeometry(60, 130, 70)
                        , r = new THREE.Material
                        , i = new THREE.Mesh(n, r);
                    i.material.visible = !1,
                        i.position.set(t.x * 20, t.y * 20, t.z * 20),
                        i.rotationAutoUpdate = !1,
                        i.rotation.x = -Math.PI / 12,
                        i.rotation.y = Math.PI / 6,
                        i.name = t.modelName,
                        i.modelInfo = {
                            id: t.id,
                            infoClass: t.infoClassName,
                            detailContentEl: t.detailContentEl,
                            animateId: t.animateId,
                            isAnimateModel: !0,
                            animateTime: t.animateTime
                        },
                        e.loader.setCrossOrigin("");
                    for (var s = 0; s < t.modelSrc.length; s++)
                        (function (n) {
                            e.loader.load(t.modelSrc[n], function (e, r) {
                                for (var s in r)
                                    r[s].shading = THREE.FlatShading,
                                        r[s].morphTargets = !0;
                                var o = new THREE.MeshFaceMaterial(r)
                                    , u = new THREE.MorphAnimMesh(e, o);
                                u.name = t.modelName,
                                    u.duration = 1e3,
                                    u.position.set(0, -50, 0),
                                    u.scale.set(t.scaleX, t.scaleY, t.scaleZ),
                                    i.add(u),
                                n == 1 && w()
                            })
                        })(s);
                    e.globalGroup.add(i),
                        e.objectArray.push(i),
                        e.animateArray.push(i)
                }

                function S(t) {
                    var n = new THREE.BoxGeometry(40, 40, 50)
                        , r = new THREE.Material
                        , i = new THREE.Mesh(n, r);
                    i.material.visible = !1,
                        i.modelInfo = {
                            id: t.id,
                            infoClass: t.infoClassName,
                            detailContentEl: t.detailContentEl,
                            isAnimateModel: !1
                        },
                        i.position.set(t.x * 20, t.y * 20, t.z * 20),
                        i.rotation.x = -Math.PI / 12,
                        i.rotation.y = Math.PI / 6,
                        i.name = t.modelName,
                        e.loader.load(t.modelSrc, function (e, n) {
                            for (var r in n)
                                n[r].shading = THREE.FlatShading,
                                n[r].wireframe && (n[r].opacity = 0,
                                    n[r].transparent = !0);
                            var s = new THREE.MeshFaceMaterial(n)
                                , o = new THREE.Mesh(e, s);
                            o.scale.set(t.scaleX, t.scaleY, t.scaleZ),
                                i.add(o),
                                w()
                        }),
                        e.globalGroup.add(i),
                        e.objectArray.push(i)
                }

                function x(t) {
                    e.loader.load(t.modelSrc, function (n, r) {
                        r[0].shading = THREE.FlatShading;
                        var i = new THREE.MeshFaceMaterial(r);
                        for (var s = 0; s < 3; s++) {
                            var o = new THREE.Mesh(n, i);
                            o.modelInfo = {
                                id: s
                            },
                                o.position.set(0, 0, 0),
                                o.rotation.x = t.angle[s].x,
                                o.rotation.y = t.angle[s].y,
                                o.rotation.z = t.angle[s].z,
                                o.scale.set(t.scale[s].x, t.scale[s].y, t.scale[s].z),
                                o.name = t.modelName + s,
                                e.globalGroup.add(o)
                        }
                        w()
                    })
                }

                function T(t) {
                    var n = new THREE.BoxGeometry(40, 70, 50)
                        , r = new THREE.Material
                        , i = new THREE.Mesh(n, r);
                    i.material.visible = !1,
                        i.modelInfo = {
                            id: t.id,
                            infoClass: t.infoClassName,
                            detailContentEl: t.detailContentEl,
                            isAnimateModel: !1,
                            isImgModel: !0
                        },
                        i.position.set(t.x * 20, t.y * 20, t.z * 20),
                        i.name = t.modelName;
                    var s = new THREE.IcosahedronGeometry(25, 0)
                        , o = new THREE.MeshLambertMaterial({
                        color: 13421772,
                        opacity: .6,
                        wireframe: !0
                    })
                        , s = new THREE.Mesh(s, o);
                    i.add(s);
                    var u = new THREE.Geometry
                        , a = new THREE.Vector3(0, 0, 0);
                    u.vertices.push(a);
                    var f = THREE.ImageUtils;
                    f.crossOrigin = "";
                    var l = f.loadTexture(t.modelSrc)
                        , c = new THREE.PointsMaterial({
                        size: 85,
                        map: l,
                        transparent: !0
                    })
                        , h = new THREE.Points(u, c);
                    h.material.map.minFilter = THREE.LinearFilter,
                        i.add(h),
                        w(),
                        e.globalGroup.add(i),
                        e.objectArray.push(i)
                }

                function N(t) {
                    var n = t.length
                        , r = new THREE.BufferGeometry
                        , i = new Float32Array(3 * t.length)
                        , s = new THREE.LineBasicMaterial({
                        transparent: !0,
                        opacity: 1,
                        color: 16777215
                    });
                    for (var o = 0; o < n; o++)
                        i[3 * o] = t[o].x * 15,
                            i[3 * o + 1] = t[o].y * 15,
                            i[3 * o + 2] = t[o].z * 15,
                            r.addAttribute("position", new THREE.BufferAttribute(i, 3));
                    var u = new THREE.Line(r, s);
                    console.log(u),
                        e.globalGroup.add(u),
                        e.lineArray.push(s)
                }

                var e = this, n = 0, r = {}, i = t.modelArray.length, s = $(".m-webgl-page"), o = 0, u = new THREE.Clock, a, f, l, c, h, p, d;
                e.objectArray = [],
                    e.lineArray = [],
                    e.animateArray = [],
                    e.animateStart = !1,
                    e.touchDown = !1,
                    e.selectAnimateId = 0,
                    e.globalGroupAnimate = !0;
                var v = function () {
                        e.scene = new THREE.Scene,
                            e.scene.position.y = -80,
                            e.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 15e3),
                            e.camera.position.x = 0,
                            e.camera.position.y = 0,
                            e.camera.position.z = 1500,
                            e.camera.lookAt(e.scene.position),
                            e.renderer = new THREE.WebGLRenderer({
                                alpha: !0,
                                antialias: !1
                            }),
                            e.renderer.setClearColor(0, 0),
                            e.renderer.sortObjects = !0,
                            e.renderer.setPixelRatio(window.devicePixelRatio),
                            e.renderer.setSize(window.innerWidth, window.innerHeight),
                            s.append(e.renderer.domElement),
                            y()
                    }
                    ;
                this.show = function () {
                    console.log("show")
                }
                    ,
                    this.handleResize = function () {
                        e.camera.aspect = window.innerWidth / window.innerHeight,
                            e.camera.updateProjectionMatrix(),
                            e.renderer.setSize(window.innerWidth, window.innerHeight)
                    }
                    ,
                    v(),
                    m()
            }
            , r = function () {
                function r(e, t, n) {
                    return Math.min(Math.max(e, t), n)
                }

                function i(t, n) {
                    var r = new THREE.Vector3
                        , i = new THREE.Quaternion
                        , s = Math.acos(t.dot(n) / t.length() / n.length());
                    return s && (r.crossVectors(t, n).normalize(),
                        s *= e.rotationSpeed,
                        i.setFromAxisAngle(r, s)),
                        i
                }

                var e = this
                    , t = window.innerWidth / 2
                    , n = window.innerHeight / 2;
                this.rotationSpeed = 2,
                    this.nowQuaternion = null ,
                    this.rotateStartPoint = new THREE.Vector3(0, 0, 1),
                    this.rotateEndPoint = new THREE.Vector3(0, 0, 1),
                    this.lastMoveTimestamp,
                    this.deltaX = 0,
                    this.deltaY = 0,
                    this.startPoint = {
                        x: 0,
                        y: 0
                    },
                    this.projectOnTrackball = function (e, i) {
                        var s = new THREE.Vector3;
                        s.set(r(e / t, -1, 1), r(-i / n, -1, 1), 0);
                        var o = s.length();
                        return o > 1 ? s.normalize() : s.z = Math.sqrt(1 - o * o),
                            s
                    }
                    ,
                    this.handleRotation = function (t) {
                        e.rotateEndPoint = e.projectOnTrackball(e.deltaX, e.deltaY);
                        var n = i(e.rotateStartPoint, e.rotateEndPoint)
                            , r = t.quaternion;
                        r.multiplyQuaternions(n, r),
                            r.normalize(),
                            t.setRotationFromQuaternion(r),
                            e.nowQuaternion = r,
                            e.rotateEndPoint = e.rotateStartPoint
                    }
            }
            , i = function () {
                function s() {
                    t.audio.bg.play(),
                        i.music.addClass("animate"),
                        i.music.on("touchstart", function (e) {
                            e.preventDefault(),
                                e.stopPropagation(),
                                $(this).hasClass("pause") ? (t.audio.bg.play(),
                                    $(this).removeClass("pause"),
                                    $(this).addClass("animate")) : (t.audio.bg.pause(),
                                    $(this).addClass("pause"),
                                    $(this).removeClass("animate"))
                        })
                }

                function o(e) {
                    e.preventDefault(),
                        e.stopPropagation();
                    if (i.isOpeningAnimate)
                        return !1;
                    i.isOpeningAnimate = !0,
                    i.music.hasClass("pause") || t.audio.bg.play(),
                        $(".m-tips").show(),
                        $(".m-opening").hide(),
                        setTimeout(function () {
                            TweenMax.to(".m-tips", 1, {
                                opacity: 0,
                                onComplete: function () {
                                    $(".m-tips").hide()
                                }
                            })
                        }, 2e3),
                        TweenMax.to(i.Scene.globalGroup.rotation, 1.5, {
                            x: 0,
                            y: 0,
                            z: 0,
                            ease: "Cubic.easeInOut",
                            onComplete: function () {
                                i.isOpeningHide = !0
                            }
                        })
                }

                function u(e) {
                    e.preventDefault(),
                        e.stopPropagation(),
                        i.sharePop.show(),
                        i.sharePop.on("touchstart", function () {
                            $(this).hide(),
                                $(this).off("touchstart")
                        })
                }

                function a(e) {
                    if (e.touches.length > 1)
                        return !1;
                    e.preventDefault(),
                        e = i.hasTouch && e.changedTouches[0] ? e.changedTouches[0] : e;
                    if (i.isModeMove || !i.isOpeningHide)
                        return !1;
                    i.Scene.globalGroupAnimate = !1,
                        i.PageTrack.startPoint = {
                            x: e.clientX,
                            y: e.clientY
                        },
                        i.PageTrack.rotateStartPoint = i.PageTrack.rotateEndPoint = i.PageTrack.projectOnTrackball(0, 0)
                }

                function f(e) {
                    if (e.touches.length > 1)
                        return !1;
                    e.preventDefault(),
                        e = i.hasTouch && e.changedTouches[0] ? e.changedTouches[0] : e;
                    if (i.isModeMove || !i.isOpeningHide)
                        return !1;
                    i.Scene.globalGroupAnimate = !1,
                        i.PageTrack.deltaX = e.clientX - i.PageTrack.startPoint.x,
                        i.PageTrack.deltaY = e.clientY - i.PageTrack.startPoint.y,
                        i.PageTrack.handleRotation(i.Scene.globalGroup),
                        i.PageTrack.startPoint.x = e.clientX,
                        i.PageTrack.startPoint.y = e.clientY,
                        i.PageTrack.lastMoveTimestamp = new Date
                }

                function l(e, t) {
                    if (!e.modelInfo.animateId) {
                        console.log(n);
                        var n = e.children[0].children[0].material;
                        n.wireframe && (t ? TweenMax.to(n, 1, {
                            opacity: 1,
                            onComplete: function () {
                                n.transparent = !1
                            }
                        }) : TweenMax.to(n, 1, {
                            opacity: 0,
                            onComplete: function () {
                                n.transparent = !0
                            }
                        }))
                    }
                }

                function c(e) {
                    if (i.isFar)
                        return !1;
                    i.isFar = !0,
                        i.isModeMove = !1,
                        e.preventDefault(),
                        m(i.selectObject.modelInfo.infoClass),
                        TweenMax.to(i.selectObject.rotation, 1, {
                            x: -Math.PI / 12,
                            y: Math.PI / 6,
                            z: 0,
                            onComplete: function () {
                                i.selectObject = null
                            }
                        }),
                        TweenMax.to(".m-btn", .5, {
                            opacity: 0,
                            onComplete: function () {
                                i.btnBox.hide()
                            }
                        }),
                        TweenMax.to(".btn-open", .5, {
                            rotation: 0
                        }),
                        TweenMax.to(".btn-close-3d", .5, {
                            rotation: 0
                        }),
                        TweenMax.to(".btn-prev .inner", .5, {
                            x: 0
                        }),
                        TweenMax.to(".btn-next .inner", .5, {
                            x: 0,
                            onComplete: function () {
                                i.boxContent.removeClass("animate"),
                                    i.Scene.globalGroupAnimate = !0
                            }
                        }),
                        TweenMax.to(i.Scene.camera.position, 1, {
                            x: 0,
                            y: 0,
                            z: 1500,
                            ease: "Cubic.easeInOut",
                            onComplete: function () {
                                i.isPageMove = !1,
                                    i.selectAnimate = !1,
                                    i.Scene.animateStart = !1,
                                    i.Scene.touchDown = !1,
                                    i.isCameraMove = !1,
                                    i.prevBtn.removeClass("lock"),
                                    i.nextBtn.removeClass("lock")
                            }
                        })
                }

                function h(e) {
                    if (!i.isPrev || i.isCameraMove)
                        return !1;
                    i.isCameraMove = !0,
                        e.preventDefault();
                    var n, r = new THREE.Vector3, s = i.selectObject.modelInfo.id;
                    TweenMax.to(i.selectObject.rotation, .5, {
                        x: -Math.PI / 12,
                        y: Math.PI / 6,
                        z: 0,
                        onComplete: function () {
                        }
                    }),
                        m(i.selectObject.modelInfo.infoClass),
                        s == 0 ? (i.selectObject = i.Scene.objectArray[t.modelArray.length - 1],
                            r.setFromMatrixPosition(i.Scene.objectArray[t.modelArray.length - 1].matrixWorld)) : (i.selectObject = i.Scene.objectArray[s - 1],
                            r.setFromMatrixPosition(i.Scene.objectArray[s - 1].matrixWorld)),
                        b(r, i.selectObject)
                }

                function p(e) {
                    if (!i.isNext || i.isCameraMove)
                        return !1;
                    i.isCameraMove = !0,
                        e.preventDefault();
                    var n = new THREE.Vector3
                        , r = i.selectObject.modelInfo.id;
                    TweenMax.to(i.selectObject.rotation, .5, {
                        x: -Math.PI / 12,
                        y: Math.PI / 6,
                        z: 0,
                        onComplete: function () {
                        }
                    }),
                        m(i.selectObject.modelInfo.infoClass),
                        r == t.modelArray.length - 1 ? (i.selectObject = i.Scene.objectArray[0],
                            n.setFromMatrixPosition(i.Scene.objectArray[0].matrixWorld)) : (i.selectObject = i.Scene.objectArray[r + 1],
                            n.setFromMatrixPosition(i.Scene.objectArray[r + 1].matrixWorld)),
                        b(n, i.selectObject)
                }

                function d() {
                    i.selectObject.modelInfo.id == 0 ? (i.prevBtn.addClass("lock"),
                        i.isPrev = !1) : (i.prevBtn.removeClass("lock"),
                        i.isPrev = !0),
                        i.selectObject.modelInfo.id == t.modelArray.length - 1 ? (i.nextBtn.addClass("lock"),
                            i.isNext = !1) : (i.nextBtn.removeClass("lock"),
                            i.isNext = !0)
                }

                function v(e) {
                    i.infoTitle.removeClass().addClass("info-title " + e),
                        i.info.show(),
                        TweenMax.to(".btn-open", 1, {
                            rotation: 360,
                            onComplete: function () {
                            }
                        }),
                        TweenMax.to(".btn-close-3d", 1, {
                            rotation: 360,
                            onComplete: function () {
                            }
                        }),
                        TweenMax.to(".btn-prev .inner", 1, {
                            x: -34,
                            onComplete: function () {
                            }
                        }),
                        TweenMax.to(".btn-next .inner", 1, {
                            x: 32,
                            onComplete: function () {
                                i.boxContent.addClass("animate")
                            }
                        }),
                        TweenMax.to(".m-info", 1, {
                            opacity: 1,
                            onComplete: function () {
                                console.log("show-info")
                            }
                        })
                }

                function m(e) {
                    i.infoTitle.removeClass(e),
                        TweenMax.to(".m-info", .2, {
                            opacity: 0,
                            onComplete: function () {
                                console.log("hide-info"),
                                    i.info.hide()
                            }
                        })
                }

                function g(e) {
                    e.preventDefault(),
                        i.detailCut.show(),
                        setTimeout(function () {
                            i.detailCut.addClass("animate"),
                                i.selectObject.modelInfo.detailContentEl.show(),
                                i.detail.show(),
                                TweenMax.to(".m-detail", 1, {
                                    opacity: 1,
                                    delay: .1,
                                    onComplete: function () {
                                        console.log("show-detail")
                                    }
                                }),
                                TweenMax.to(".btn-close-detail", 1, {
                                    rotation: 360,
                                    delay: .2,
                                    onComplete: function () {
                                    }
                                })
                        }, 100)
                }

                function y(e) {
                    if (i.isHideDetail)
                        return !1;
                    i.isHideDetail = !0,
                        e.preventDefault(),
                        e.stopPropagation(),
                        TweenMax.to(".btn-close-detail", .7, {
                            rotation: 0,
                            onComplete: function () {
                            }
                        }),
                        TweenMax.to(".m-detail", .5, {
                            opacity: 0,
                            delay: .1,
                            onComplete: function () {
                                console.log("hide-detail"),
                                    i.detail.hide(),
                                    i.selectObject.modelInfo.detailContentEl.hide(),
                                    i.isHideDetail = !1
                            }
                        })
                }

                function b(e, t) {
                    t.modelInfo.isAnimateModel ? (i.Scene.selectAnimateId = t.modelInfo.animateId,
                        i.selectAnimate = !0,
                        i.Scene.animateStart = !0,
                        e.z = 400 + e.z) : (i.selectAnimate = !1,
                        i.Scene.animateStart = !1,
                        i.selectObject.name == "center" ? e.z = 670 + e.z : i.selectObject.name == "mn" ? (e.z = 400 + e.z,
                            e.y = -50 + e.y) : e.z = 165 + e.z),
                        TweenMax.to(i.Scene.camera.position, 1, {
                            x: e.x,
                            y: -10 + e.y,
                            z: e.z,
                            ease: Expo.easeInOut,
                            onComplete: function () {
                                v(t.modelInfo.infoClass),
                                    i.isCameraMove = !1
                            }
                        })
                }

                function w(e) {
                    if (e.touches.length > 1)
                        return !1;
                    e.preventDefault(),
                        e = i.hasTouch && e.changedTouches[0] ? e.changedTouches[0] : e;
                    if (Math.abs(e.clientX - i.touchStartX) > 20)
                        return !1;
                    i.Scene.globalGroupAnimate = !1,
                        i.touch.x = e.clientX / window.innerWidth * 2 - 1,
                        i.touch.y = -(e.clientY / window.innerHeight) * 2 + 1;
                    var t = new THREE.Vector3
                        , n = (new THREE.Vector3(i.touch.x, i.touch.y, .5)).unproject(i.Scene.camera)
                        , r = new THREE.Raycaster(i.Scene.camera.position, n.sub(i.Scene.camera.position).normalize())
                        , s = r.intersectObjects(i.Scene.objectArray);
                    r.setFromCamera(i.touch, i.Scene.camera);
                    if (s.length > 0) {
                        i.isModeMove = !0,
                            i.Scene.touchDown = !0,
                            i.isFar = !1;
                        if (i.selectObject != s[0].object) {
                            i.selectObject = s[0].object,
                                TweenMax.to(".m-info", .2, {
                                    opacity: 0,
                                    onComplete: function () {
                                    }
                                });
                            var o = 1;
                            i.Scene.globalGroup.rotation.x == 0 && i.Scene.globalGroup.rotation.y == 0 && i.Scene.globalGroup.rotation.z == 0 && (o = 0),
                                TweenMax.to(i.Scene.globalGroup.rotation, o, {
                                    x: 0,
                                    y: 0,
                                    z: 0,
                                    onComplete: function () {
                                        t.setFromMatrixPosition(i.selectObject.matrixWorld),
                                            i.selectObject.modelInfo.isAnimateModel ? (i.Scene.selectAnimateId = i.selectObject.modelInfo.animateId,
                                                i.selectAnimate = !0,
                                                i.Scene.animateStart = !0,
                                                t.z = 400 + t.z) : (i.selectAnimate = !1,
                                                i.Scene.animateStart = !1,
                                                i.selectObject.name == "center" ? t.z = 670 + t.z : i.selectObject.name == "mn" ? (t.z = 400 + t.z,
                                                    t.y = -50 + t.y) : t.z = 165 + t.z),
                                            TweenMax.to(i.selectObject.rotation, 1, {
                                                y: 2 * Math.PI + Math.PI / 6,
                                                delay: .2
                                            }),
                                            TweenMax.to(i.Scene.camera.position, 1, {
                                                x: t.x,
                                                y: -10 + t.y,
                                                z: t.z,
                                                ease: Expo.easeInOut,
                                                onComplete: function () {
                                                    i.isPageMove = !0,
                                                        v(i.selectObject.modelInfo.infoClass),
                                                        i.btnBox.show(),
                                                        TweenMax.to(".m-btn", 1, {
                                                            opacity: 1,
                                                            onComplete: function () {
                                                            }
                                                        })
                                                }
                                            })
                                    }
                                })
                        }
                    } else
                        console.log("none")
                }

                function E(e) {
                    if (e.touches.length > 1)
                        return !1;
                    e.preventDefault(),
                        e = i.hasTouch && e.changedTouches[0] ? e.changedTouches[0] : e,
                    i.isPageMove && i.selectObject && (i.Track.deltaX = e.clientX - i.Track.startPoint.x,
                        i.Track.deltaY = e.clientY - i.Track.startPoint.y,
                        i.Track.handleRotation(i.selectObject),
                        i.Track.startPoint.x = e.clientX,
                        i.Track.startPoint.y = e.clientY,
                        i.Track.lastMoveTimestamp = new Date)
                }

                function S(e) {
                    if (e.touches.length > 1)
                        return !1;
                    e.preventDefault(),
                        e = i.hasTouch && e.changedTouches[0] ? e.changedTouches[0] : e,
                        i.touchStartX = e.clientX,
                    i.isPageMove && (i.Track.startPoint = {
                        x: e.clientX,
                        y: e.clientY
                    },
                        i.Track.rotateStartPoint = i.Track.rotateEndPoint = i.Track.projectOnTrackball(0, 0))
                }

                var e = this
                    , i = {};
                i.touch = new THREE.Vector2,
                    i.selectObject = null ,
                    i.selectAnimate = !1,
                    i.pageEl = $(".m-webgl-page"),
                    i.touchStartX = 0,
                    i.isFar = !0,
                    i.isPrev = !0,
                    i.isNext = !0,
                    i.isCameraMove = !1,
                    i.isOpeningHide = !1,
                    i.isPageMove = !1,
                    i.isModeMove = !1,
                    i.isHideDetail = !1,
                    i.isOpeningAnimate = !1,
                    i.hasTouch = "ontouchstart" in window,
                    i.init = function () {
                        i.loadeEl = $(".m-loading"),
                            i.processEl = i.loadeEl.find(".loadProcess .inner"),
                            i.opening = $(".m-opening"),
                            i.btnBox = $(".m-btn"),
                            i.boxContent = i.btnBox.find(".btn-box"),
                            i.prevBtn = i.btnBox.find(".btn-prev"),
                            i.nextBtn = i.btnBox.find(".btn-next"),
                            i.close3dBtn = i.btnBox.find(".btn-close-3d"),
                            i.openBtn = i.btnBox.find(".btn-open"),
                            i.shareBtn = $(".btn-share"),
                            i.sharePop = $(".share-pop"),
                            i.music = $(".music"),
                            i.info = $(".m-info"),
                            i.infoTitle = i.info.find(".info-title"),
                            i.detail = $(".m-detail"),
                            i.closeDetailBtn = i.detail.find(".btn-close-detail"),
                            i.detailCut = $(".detail-cut"),
                            i.detailCutLeft = i.detailCut.find(".top-left"),
                            i.Scene = i.Scene || new n,
                            i.Scene.onloading = function (e) {
                                console.log(e),
                                    i.processEl.css("width", e + "%")
                            }
                            ,
                            i.Scene.onload = function (e) {
                                i.loadeEl.hide(),
                                    i.pageEl.show()
                            }
                            ,
                            $(".btn-link").on("touchstart", function (e) {
                                e.preventDefault(),
                                    e.stopPropagation(),
                                    location.href = "http://v.qq.com/live/p/topic/2227/preview_h5.html"
                            }),
                            i.Track = i.Track || new r,
                            i.PageTrack = i.PageTrack || new r,
                            i.PageTrack.rotationSpeed = .5,
                            s(),
                            $(document.documentElement).on("touchstart", a),
                            $(document.documentElement).on("touchmove", f),
                            i.opening.on("touchstart", o),
                            $(i.Scene.renderer.domElement).on("touchstart", S),
                            $(i.Scene.renderer.domElement).on("touchmove", E),
                            $(i.Scene.renderer.domElement).on("touchend", w),
                            i.close3dBtn.on("touchstart", c),
                            i.prevBtn.on("touchstart", h),
                            i.nextBtn.on("touchstart", p),
                            i.openBtn.on("touchstart", g),
                            i.closeDetailBtn.on("touchstart", y),
                            i.shareBtn.on("touchstart", u),
                            i.detailCutLeft.on("webkitAnimationEnd", function (e) {
                                i.detailCut.hide(),
                                    i.detailCut.removeClass("animate")
                            }),
                            $(window).on("resize", function () {
                                i.Scene.handleResize()
                            })
                    }
                    ,
                    e.show = function () {
                        $(".m-main").show()
                    }
                    ,
                    i.init()
            }
            ;
        return i
    }),
    require.config({
        urlArgs: "bust=" + (new Date).getTime()
    });
try {
    new THREE.WebGLRenderer,
        require(["app/TD", "app/Config", "app/LoadViewController", "app/IndexViewController"], function (e, t, n, r) {
            var i = {
                    loadView: null,
                    indexView: null
                }
                , s = function () {
                    i.loadView = i.loadView || new n;
                    var e = i.loadView;
                    e.onhide = function () {
                        i.indexView = i.indexView || new r;
                        var e = i.indexView;
                        e.show()
                    }
                        ,
                        e.show(),
                        e.load()
                }
                ;
            s()
        })
} catch (error) {
    console.log(error),
        location.href = "http://nba.treedom.cn/android/index.html"
}
define("index", function () {
});

