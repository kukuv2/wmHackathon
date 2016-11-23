<script src="../../../../.ShadowsocksX/gfwlist.js"></script>
<template>
    <div class="m-main" style="display: block;">
        <div class="m-webgl-page" style="display: none;"></div>
        <div class="m-btn" style="display: block; opacity: 1;">
            <div class="wrap" data-response="true" style="transform: scale(1);">
                <div class="btn-open" style="transform: matrix(1, 0, 0, 1, 0, 0);"></div>
                <div class="btn-box animate">
                    <div class="btn-close-3d" style="transform: matrix(1, 0, 0, 1, 0, 0);">
                        <div class="inner"></div>
                    </div>
                    <div class="btn-prev">
                        <div class="inner" style="z-index: 0; transform: matrix(1, 0, 0, 1, -34, 0);"></div>
                    </div>
                    <div class="btn-next">
                        <div class="inner" style="z-index: 0; transform: matrix(1, 0, 0, 1, 32, 0);"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="m-info" style="opacity: 1; display: none;">
            <div class="wrap" data-response="true" style="transform: scale(1);">
                <div class="info-box">
                    <div class="info-title"></div>
                    <div class="temcemt"></div>
                </div>
            </div>
        </div>
        <div class="m-opening" style="display: none;">
            <div class="wrap" data-response="true" style="transform: scale(1);">
                <div class="box">
                    <div class="content" style="opacity: 1;"></div>
                    <div class="tips"></div>
                </div>
            </div>
        </div>
        <div class="m-tips" style="opacity: 0; display: none;">
           <div class="bg"></div>
        </div>
    </div>
</template>

<script>
    import Controller from './controller'
    import modelArray from './modelArray.js'
    var u = new THREE.Clock;
    var o = 0;
    export default {
        name: 'app',
        components: {},
        methods: {
            animate: function () {
                var e = this;
                var t = u.getDelta();
                e.globalGroupAnimate ? (o += .01,
                o > 2 * Math.PI && (o = 0),
                e.globalGroup.rotation.y = o) : o = 0;
                if (e.animateStart && e.animateArray.length) {
                    var n = e.animateArray[e.selectAnimateId];
                    console.log(n);
                    n.children[0].updateAnimation(n.modelInfo.animateTime * t),
                    n.children[1].updateAnimation(n.modelInfo.animateTime * t)
                }
                requestAnimationFrame(this.animate);


                this.renderer.render(this.scene, this.camera);

            },
            loaderData: function () {
                this.renderer = new THREE.WebGLRenderer({
                    alpha: !0,
                    antialias: !1
                });
                this.renderer.setClearColor(0, 0);
                this.renderer.sortObjects = !0;
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                $(".m-webgl-page")[0].appendChild(this.renderer.domElement);
                var e = this, a, f, l, c, h, p;
                e.objectArray = [],
                e.lineArray = [],
                e.animateArray = [],
                e.animateStart = !1,
                e.touchDown = !1,
                e.selectAnimateId = 0,
                e.globalGroupAnimate = !0,
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
                e.globalGroup.rotation.x =0,
                e.globalGroup.rotation.y = 0,
                e.globalGroup.rotation.z = 0,
                e.scene.globalGroup = e.globalGroup,
                e.scene.camera = e.camera,
                e.sphere = new THREE.Mesh(new THREE.SphereGeometry(1800,15,15),new THREE.MeshBasicMaterial({
                    color: 1711929,
                    wireframe: !0
                })),
                e.scene.add(e.sphere),
                e.scene.add(e.globalGroup);
                e.onload = function () {
                    $('.m-webgl-page').show()
                };
                e.onloading = function (n) {
                    console.log(n)
                };
                for (var n = 0, r = modelArray.length; n < r; n++)
                switch (modelArray[n].modelType) {
                case "animateModel":
                    //E(modelArray[n]);
                    break;
                case "materialModel":
                    S(modelArray[n]);
                    break;
                case "imgModel":
                    T(modelArray[n]);
                    break;
                case "circleModel":
                    x(modelArray[n]);
                    break;
                default:
                    return
                }
                e.scene.objectArray = e.objectArray
                    //console.log(modelArray)

//                 this.loader.load('./static/mn.json', (geometry, materials) => {
//                     for (var key in materials) {
//                         materials[key].shading = THREE.FlatShading;
//                         materials[key].morphTargets = true;
//                     }
//                     var threeMaterials = new THREE.MeshFaceMaterial(materials)
//                     var mesh = new THREE.MorphBlendMesh(geometry, threeMaterials);
//                     mesh.name = 'test';
//                     mesh.duration = 1e3;
// //                    mesh.position.set(0, -50, 0);
//                     mesh.scale.set(.2, .2, .2);
//                     this.scene.add(mesh);
//                     this.controller.selectObject = mesh
//                 })
                function w() {
                    n++,
                    n == 45 ? (e.onloading && e.onloading(100),
                    setTimeout(function() {
                        console.log("loadEnd"),
                        e.onload && e.onload()
                    }, 300)) : e.onloading && e.onloading(n)
                }
                function E(t) {
                    console.log(t)
                    var n = new THREE.BoxGeometry(60,130,70)
                      , r = new THREE.Material
                      , i = new THREE.Mesh(n,r);
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
                    };
                    for (var s = 0; s < t.modelSrc.length; s++)
                        (function(n) {
                            e.loader.load(t.modelSrc[n], function(e, r) {
                                for (var s in r)
                                    r[s].shading = THREE.FlatShading,
                                    r[s].morphTargets = !0;
                                var o = new THREE.MeshFaceMaterial(r)
                                  , u = new THREE.MorphBlendMesh(e,o);
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
                    var n = new THREE.BoxGeometry(40,40,50)
                      , r = new THREE.Material
                      , i = new THREE.Mesh(n,r);
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
                    e.loader.load(t.modelSrc, function(e, n) {
                        for (var r in n)
                            n[r].shading = THREE.FlatShading,
                            n[r].wireframe && (n[r].opacity = 0,
                            n[r].transparent = !0);
                        var s = new THREE.MeshFaceMaterial(n)
                          , o = new THREE.Mesh(e,s);
                        o.scale.set(t.scaleX, t.scaleY, t.scaleZ),
                        i.add(o),
                        w()
                    }),
                    e.globalGroup.add(i),
                    e.objectArray.push(i)
                }
                function x(t) {
                    e.loader.load(t.modelSrc, function(n, r) {
                        r[0].shading = THREE.FlatShading;
                        var i = new THREE.MeshFaceMaterial(r);
                        for (var s = 0; s < 3; s++) {
                            var o = new THREE.Mesh(n,i);
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
                    var n = new THREE.BoxGeometry(40,70,50)
                      , r = new THREE.Material
                      , i = new THREE.Mesh(n,r);
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
                    var s = new THREE.IcosahedronGeometry(25,0)
                      , o = new THREE.MeshLambertMaterial({
                        color: 13421772,
                        opacity: .6,
                        wireframe: !0
                    })
                      , s = new THREE.Mesh(s,o);
                    i.add(s);
                    var u = new THREE.Geometry
                      , a = new THREE.Vector3(0,0,0);
                    u.vertices.push(a);
                    var f = THREE.ImageUtils;
                    f.crossOrigin = "";
                    var l = f.loadTexture(t.modelSrc)
                      , c = new THREE.PointsMaterial({
                        size: 85,
                        map: l,
                        transparent: !0
                    })
                      , h = new THREE.Points(u,c);
                    h.material.map.minFilter = THREE.LinearFilter,
                    i.add(h),
                    w(),
                    e.globalGroup.add(i),
                    e.objectArray.push(i)
                }
            },
            addLight: function () {
                /*var scene = this.scene;
                 var a = new THREE.AmbientLight(16777215);
                 scene.add(a);
                 var f = new THREE.PointLight(16777215);
                 f.intensity = 0;
                 f.position.set(0, 0, 0);
                 scene.add(f);
                 var l = new THREE.PointLight(16777215);
                 l.position.set(900, -900, 0);
                 scene.add(l);
                 var c = new THREE.PointLight(16777215);
                 c.position.set(-4500, 4500, 0);
                 scene.add(c);
                 var h = new THREE.PointLight(44287);
                 h.position.set(-900, 0, 0);
                 scene.add(h);
                 var p = new THREE.PointLight(16711694);
                 p.position.set(900, 0, 0);
                 scene.add(p);*/
            },
            addHelper: function () {
                var scene = this.scene;
                var sphere = new THREE.SphereGeometry();
                var object = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial(0xff0000));
                var box = new THREE.BoxHelper(object);
                var cameraHelp = new THREE.CameraHelper(this.camera);
                var axisHelper = new THREE.AxisHelper(100);
                var pointLight = new THREE.PointLight(0xffffff, 1, 100);
                pointLight.name = 'pointLight'
                pointLight.position.set(0, 0, 40);
                var sphereSize = 1;

                var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
                scene.add(pointLight);
                scene.add(pointLightHelper);
                scene.add(axisHelper);
//                scene.add( box );
//                scene.add( cameraHelp );
            },
            bindEvent: function () {
                var renderElement = this.renderer.domElement
                $(document.documentElement).on("touchstart", (e) => {
                    if (e.touches.length > 1)
                        return !1;
                    e.preventDefault();
                    var i = this.controller;
                    e = i.hasTouch && e.changedTouches[0] ? e.changedTouches[0] : e;
                    if (i.isModeMove || !i.isOpeningHide)
                        return !1;
                    i.Scene.globalGroupAnimate = !1,
                    this.globalGroupAnimate = false,
                    i.PageTrack.startPoint = {
                        x: e.clientX,
                        y: e.clientY
                    },
                    i.PageTrack.rotateStartPoint = i.PageTrack.rotateEndPoint = i.PageTrack.projectOnTrackball(0, 0)
                });
                $(document.documentElement).on("touchmove", (e) => {
                     if (e.touches.length > 1)
                        return !1;
                    e.preventDefault();
                    var i = this.controller;
                    e = i.hasTouch && e.changedTouches[0] ? e.changedTouches[0] : e;
                    if (i.isModeMove || !i.isOpeningHide)
                        return !1;
                    i.Scene.globalGroupAnimate = !1,
                    this.globalGroupAnimate = false,
                    i.PageTrack.deltaX = e.clientX - i.PageTrack.startPoint.x,
                    i.PageTrack.deltaY = e.clientY - i.PageTrack.startPoint.y,
                    i.PageTrack.handleRotation(i.Scene.globalGroup),
                    i.PageTrack.startPoint.x = e.clientX,
                    i.PageTrack.startPoint.y = e.clientY,
                    i.PageTrack.lastMoveTimestamp = new Date
                });
                renderElement.addEventListener('touchstart', (e) => {
                    if (e.touches.length > 1) {
                        return false;
                    }
                    e.preventDefault()
                    var i = this.controller
                    e = i.hasTouch && e.changedTouches[0] ? e.changedTouches[0] : e
                    i.touchStartX = e.clientX
                    if (i.isPageMove) {
                        i.Track.startPoint = {
                            x: e.clientX,
                            y: e.clientY
                        }
                        i.Track.rotateStartPoint = i.Track.rotateEndPoint = i.Track.projectOnTrackball(0, 0)
                    }
                })
                renderElement.addEventListener('touchmove', (e) => {
                    if (e.touches.length > 1) {
                        return false;
                    }
                    e.preventDefault()
                    var i = this.controller;
                    e = i.hasTouch && e.changedTouches[0] ? e.changedTouches[0] : e
                    if (i.isPageMove && i.selectObject) {
                        i.Track.deltaX = e.clientX - i.Track.startPoint.x
                        i.Track.deltaY = e.clientY - i.Track.startPoint.y
                        i.Track.handleRotation(i.selectObject)
                        i.Track.startPoint.x = e.clientX
                        i.Track.startPoint.y = e.clientY
                        i.Track.lastMoveTimestamp = new Date
                    }
                })
                renderElement.addEventListener('touchend', (e) => {
                    function v(e) {
                        TweenMax.to(".btn-open", 1, {
                            rotation: 360,
                            onComplete: function() {}
                        }),
                        TweenMax.to(".btn-close-3d", 1, {
                            rotation: 360,
                            onComplete: function() {}
                        }),
                        TweenMax.to(".btn-prev .inner", 1, {
                            x: -34,
                            onComplete: function() {}
                        }),
                        TweenMax.to(".btn-next .inner", 1, {
                            x: 32,
                            onComplete: function() {
                            }
                        }),
                        TweenMax.to(".m-info", 1, {
                            opacity: 1,
                            onComplete: function() {
                                console.log("show-info")
                            }
                        })
                    }
                    if (e.touches.length > 1) {
                        return false;
                    }
                    e.preventDefault()
                    var i = this.controller
                    e = i.hasTouch && e.changedTouches[0] ? e.changedTouches[0] : e
                    if (Math.abs(e.clientX - i.touchStartX) > 20)
                        return !1;
                    i.Scene.globalGroupAnimate = !1,
                    this.globalGroupAnimate = false,
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
                    } else{
                        console.log("none")
                    }
                })
            }
        },
        data: function () {
            console.log('~~~~~')
            var camera, scene, renderer;
            var loader, light, controller;
            var controller = new Controller;
            var loader = new THREE.JSONLoader;
            var e = this;
            var scene = controller.Scene;
            var camera = controller.camera;
            console.log(controller)
            // window.camera = camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
            // camera.position.z = 700;

            // window.scene = scene = new THREE.Scene();
            // light = new THREE.AmbientLight(16777215)
            // light.name = 'light'
            // scene.add(light)

            // renderer = new THREE.WebGLRenderer();
            // loader = new THREE.JSONLoader();
            console.log('22222')
            console.log(e.scene)
            return {
                scene,
                camera,
                loader,
                controller
            }
        },
        created: function () {
        },
        mounted: function () {
            this.addLight()
            this.loaderData()
            this.animate();
            //this.addHelper();
            this.bindEvent()
        }
    }
</script>

<style>
    body {
        overflow: hidden;
        margin: 0;
        border: 0;
    }

    canvas {
        background: black;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
