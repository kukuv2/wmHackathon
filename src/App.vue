<template>
    <div class="m-main"
         style="display: block;">
        <!--<div class="m-webgl-page" style="display: none;"></div>-->
        <div class="m-webgl-page"
             style=""></div>
        <div class="m-btn">
            <div class="wrap"
                 data-response="true">
                <div class="btn-open"></div>
                <div class="btn-box animate">
                    <div class="btn-close-3d">
                        <div class="inner"></div>
                    </div>
                    <div class="btn-prev">
                        <div class="inner"></div>
                    </div>
                    <div class="btn-next">
                        <div class="inner"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="m-info"
             style="opacity: 1; display: none;">
            <div class="wrap"
                 data-response="true"
                 style="transform: scale(1);">
                <div class="info-box">
                    <div class="info-title"></div>
                    <div class="temcemt"></div>
                </div>
            </div>
        </div>
        <div class="m-opening"
             style="display: none;">
            <div class="wrap"
                 data-response="true"
                 style="transform: scale(1);">
                <div class="box">
                    <div class="content"
                         style="opacity: 1;"></div>
                    <div class="tips"></div>
                </div>
            </div>
        </div>
        <div class="m-tips"
             style="opacity: 0; display: none;">
            <div class="bg"></div>
        </div>
    </div>
</template>

<script>
    import Controller from './controller'
    import modelArray from './modelArray.js'
    import Detector from './three/detector'
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
                    alpha: true,
                    antialias: false
                });
                this.renderer.setClearColor(0, 0);
                this.renderer.sortObjects = true;
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                $(".m-webgl-page")[0].appendChild(this.renderer.domElement);
                var e = this, a, f, l, c, h, p;
                e.objectArray = [],
                        e.lineArray = [],
                        e.animateArray = [],
                        e.animateStart = false,
                        e.touchDown = false,
                        e.selectAnimateId = 0,
                        e.globalGroupAnimate = true,
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
                        e.globalGroup.rotation.x = 0,
                        e.globalGroup.rotation.y = 0,
                        e.globalGroup.rotation.z = 0,
                        e.scene.globalGroup = e.globalGroup,
                        e.scene.camera = e.camera,
                        e.sphere = new THREE.Mesh(new THREE.SphereGeometry(1800, 15, 15), new THREE.MeshBasicMaterial({
                            color: 1711929,
                            wireframe: true
                        })),
                        e.scene.add(e.sphere),
                        e.scene.add(e.globalGroup);
                e.onload = function () {
                    $('.m-webgl-page').show()
                };
                e.onloading = function (n) {
                    if (n === 45) {
                    }
                    console.log(n);
                };
                var tmpModelArray = modelArray
                for (var n = 0, r = tmpModelArray.length; n < r; n++) {
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
                    n++;
                    n == tmpModelArray.length ? (e.onloading && e.onloading(100),
                            setTimeout(function () {
                                console.log("loadEnd"),
                                e.onload && e.onload()
                            }, 300)) : e.onloading && e.onloading(n)
                }

                function E(t) {
                    console.log(t)
                    var n = new THREE.BoxGeometry(60, 130, 70)
                            , r = new THREE.Material
                            , controller = new THREE.Mesh(n, r);
                    i.material.visible = false,
                            i.position.set(t.x * 20, t.y * 20, t.z * 20),
                            i.rotationAutoUpdate = false,
                            i.rotation.x = -Math.PI / 12,
                            i.rotation.y = Math.PI / 6,
                            i.name = t.modelName,
                            i.modelInfo = {
                                id: t.id,
                                infoClass: t.infoClassName,
                                detailContentEl: t.detailContentEl,
                                animateId: t.animateId,
                                isAnimateModel: true,
                                animateTime: t.animateTime
                            };
                    for (var s = 0; s < t.modelSrc.length; s++)
                        (function (n) {
                            e.loader.load(t.modelSrc[n], function (e, r) {
                                for (var s in r)
                                    r[s].shading = THREE.FlatShading,
                                            r[s].morphTargets = true;
                                var o = new THREE.MeshFaceMaterial(r)
                                        , u = new THREE.MorphBlendMesh(e, o);
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
                    i.material.visible = false,
                            i.modelInfo = {
                                id: t.id,
                                infoClass: t.infoClassName,
                                detailContentEl: t.detailContentEl,
                                isAnimateModel: false
                            },
                            i.position.set(t.x * 20, t.y * 20, t.z * 20),
                            i.rotation.x = -Math.PI / 12,
                            i.rotation.y = Math.PI / 6,
                            i.name = t.modelName,
                            e.loader.load(t.modelSrc, function (e, n) {
                                for (var r in n)
                                    n[r].shading = THREE.FlatShading,
                                    n[r].wireframe && (n[r].opacity = 0,
                                            n[r].transparent = true);
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
                    i.material.visible = false,
                            i.modelInfo = {
                                id: t.id,
                                infoClass: t.infoClassName,
                                detailContentEl: t.detailContentEl,
                                isAnimateModel: false,
                                isImgModel: true
                            },
                            i.position.set(t.x * 20, t.y * 20, t.z * 20),
                            i.name = t.modelName;
                    var s = new THREE.IcosahedronGeometry(25, 0)
                            , o = new THREE.MeshLambertMaterial({
                        color: 13421772,
                        opacity: .6,
                        wireframe: true
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
                        transparent: true
                    })
                            , h = new THREE.Points(u, c);
                    h.material.map.minFilter = THREE.LinearFilter,
                            i.add(h),
                            w(),
                            e.globalGroup.add(i),
                            e.objectArray.push(i)
                }
            },
            /*addLight: function () {
             /!*var scene = this.scene;
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
             scene.add(p);*!/
             },*/
            /*addHelper: function () {
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
             },*/
            getElement(){
                var controller = this.controller;
                controller.btnBox = $(".m-btn");
                controller.boxContent = controller.btnBox.find(".btn-box");
                controller.prevBtn = controller.btnBox.find(".btn-prev");
                controller.nextBtn = controller.btnBox.find(".btn-next");
                controller.close3dBtn = controller.btnBox.find(".btn-close-3d");
                controller.openBtn = controller.btnBox.find(".btn-open");
                controller.info = $(".m-info");
                controller.infoTitle = controller.info.find(".info-title");
            },
            bindEvent: function () {
                var renderElement = this.renderer.domElement
                var controller = this.controller
                var t = this.config
                var i = controller;
                $(document.documentElement).on("touchstart", (e) => {
                    if (e.touches.length > 1)
                        return false;
                    e.preventDefault();
                    var i = this.controller;
                    e = i.hasTouch && e.changedTouches[0] ? e.changedTouches[0] : e;
                    if (i.isModeMove || !i.isOpeningHide)
                        return false;
                    i.Scene.globalGroupAnimate = false,
                            this.globalGroupAnimate = false,
                            i.PageTrack.startPoint = {
                                x: e.clientX,
                                y: e.clientY
                            },
                            i.PageTrack.rotateStartPoint = i.PageTrack.rotateEndPoint = i.PageTrack.projectOnTrackball(0, 0)
                });
                $(document.documentElement).on("touchmove", (e) => {
                    if (e.touches.length > 1)
                        return false;
                    e.preventDefault();
                    var i = this.controller;
                    e = i.hasTouch && e.changedTouches[0] ? e.changedTouches[0] : e;
                    if (i.isModeMove || !i.isOpeningHide)
                        return false;
                    i.Scene.globalGroupAnimate = false,
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
                    function showBtn(e) {
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
                                    }
                                }),
                                TweenMax.to(".m-info", 1, {
                                    opacity: 1,
                                    onComplete: function () {
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
                        return false;
                    i.Scene.globalGroupAnimate = false,
                            this.globalGroupAnimate = false,
                            i.touch.x = e.clientX / window.innerWidth * 2 - 1,
                            i.touch.y = -(e.clientY / window.innerHeight) * 2 + 1;
                    var t = new THREE.Vector3
                            , n = (new THREE.Vector3(i.touch.x, i.touch.y, .5)).unproject(i.Scene.camera)
                            , r = new THREE.Raycaster(i.Scene.camera.position, n.sub(i.Scene.camera.position).normalize())
                            , s = r.intersectObjects(i.Scene.objectArray);
                    r.setFromCamera(i.touch, i.Scene.camera);
                    if (s.length > 0) {
                        i.isModeMove = true,
                                i.Scene.touchDown = true,
                                i.isFar = false;
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
                                                            i.selectAnimate = true,
                                                            i.Scene.animateStart = true,
                                                            t.z = 400 + t.z) : (i.selectAnimate = false,
                                                            i.Scene.animateStart = false,
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
                                                            i.isPageMove = true,
                                                                    showBtn(i.selectObject.modelInfo.infoClass),
                                                                    TweenMax.to(".m-btn", 1, {
                                                                        opacity: 1,
                                                                        onComplete: function () {
                                                                        }
                                                                    });
                                                            controller.btnBox.show()
                                                        }
                                                    })
                                        }
                                    })
                        }
                    } else {
                        console.log("none")
                    }
                })
                controller.close3dBtn.on("touchstart", close3dBtnTouch);
                controller.prevBtn.on("touchstart", prevBtnTouch);
                controller.nextBtn.on("touchstart", nextBtnTouch);
                controller.openBtn.on("touchstart", openBtnTouch);

                function closeInfo(infoClass) {
                    controller.infoTitle.removeClass(infoClass),
                            TweenMax.to(".m-info", .2, {
                                opacity: 0,
                                onComplete: function () {
                                    console.log("hide-info"),
                                            controller.info.hide()
                                }
                            })
                }

                function close3dBtnTouch(e) {
                    if (controller.isFar)
                        return false;
                    controller.isFar = true,
                            controller.isModeMove = false,
                            e.preventDefault(),
                            closeInfo(controller.selectObject.modelInfo.infoClass),
                            TweenMax.to(controller.selectObject.rotation, 1, {
                                x: -Math.PI / 12,
                                y: Math.PI / 6,
                                z: 0,
                                onComplete: function () {
                                    controller.selectObject = null
                                }
                            }),
                            TweenMax.to(".m-btn", .5, {
                                opacity: 0,
                                onComplete: function () {
                                    controller.btnBox.hide()
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
                                    controller.boxContent.removeClass("animate"),
                                            controller.Scene.globalGroupAnimate = true
                                }
                            }),
                            TweenMax.to(controller.Scene.camera.position, 1, {
                                x: 0,
                                y: 0,
                                z: 1500,
                                ease: "Cubic.easeInOut",
                                onComplete: function () {
                                    controller.isPageMove = false,
                                            controller.selectAnimate = false,
                                            controller.Scene.animateStart = false,
                                            controller.Scene.touchDown = false,
                                            controller.isCameraMove = false,
                                            controller.prevBtn.removeClass("lock"),
                                            controller.nextBtn.removeClass("lock")
                                }
                            })
                }

                function prevBtnTouch(e) {
                    if (!controller.isPrev || controller.isCameraMove)
                        return false;
                    controller.isCameraMove = true,
                            e.preventDefault();
                    var n, r = new THREE.Vector3;
//                    var s = controller.selectObject.modelInfo.id;
                    var s = controller.Scene.objectArray.indexOf(controller.selectObject)
                    TweenMax.to(controller.selectObject.rotation, .5, {
                        x: -Math.PI / 12,
                        y: Math.PI / 6,
                        z: 0,
                        onComplete: function () {
                        }
                    }),
                            closeInfo(controller.selectObject.modelInfo.infoClass),
                            s == 0 ? (controller.selectObject = controller.Scene.objectArray[t.modelArray.length - 1],
                                    r.setFromMatrixPosition(controller.Scene.objectArray[t.modelArray.length - 1].matrixWorld)) : (controller.selectObject = controller.Scene.objectArray[s - 1],
                                    r.setFromMatrixPosition(controller.Scene.objectArray[s - 1].matrixWorld)),
                            moveTo(r, controller.selectObject)
                }

                function nextBtnTouch(e) {
                    if (!controller.isNext || controller.isCameraMove)
                        return false;
                    controller.isCameraMove = true,
                            e.preventDefault();
                    var n = new THREE.Vector3;
                    var r = controller.Scene.objectArray.indexOf(controller.selectObject)
                    TweenMax.to(controller.selectObject.rotation, .5, {
                        x: -Math.PI / 12,
                        y: Math.PI / 6,
                        z: 0,
                        onComplete: function () {
                        }
                    });
                    closeInfo(controller.selectObject.modelInfo.infoClass);
                    if (r == t.modelArray.length - 1) {
                        controller.selectObject = controller.Scene.objectArray[0];
                        n.setFromMatrixPosition(controller.Scene.objectArray[0].matrixWorld);
                    } else {
                        controller.selectObject = controller.Scene.objectArray[r + 1];
                        n.setFromMatrixPosition(controller.Scene.objectArray[r + 1].matrixWorld);
                        moveTo(n, controller.selectObject);
                    }
                }

                function rotateBtn(e) {
                    controller.infoTitle.removeClass().addClass("info-title " + e),
                            controller.info.show(),
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

                function moveTo(e, t) {
                    if (t.modelInfo.isAnimateModel) {
                        controller.Scene.selectAnimateId = t.modelInfo.animateId,
                                controller.selectAnimate = true,
                                controller.Scene.animateStart = true,
                                e.z = 400 + e.z
                    } else {
                        controller.selectAnimate = false,
                                controller.Scene.animateStart = false,
                                controller.selectObject.name == "center" ? e.z = 670 + e.z : controller.selectObject.name == "mn" ? (e.z = 400 + e.z,
                                        e.y = -50 + e.y) : e.z = 165 + e.z;
                        TweenMax.to(controller.Scene.camera.position, 1, {
                            x: e.x,
                            y: -10 + e.y,
                            z: e.z,
                            ease: Expo.easeInOut,
                            onComplete: function () {
                                rotateBtn(t.modelInfo.infoClass),
                                        controller.isCameraMove = false
                            }
                        })
                    }
                }

                function openBtnTouch(e) {
                    e.preventDefault(),
                            controller.detailCut.show(),
                            setTimeout(function () {
                                controller.detailCut.addClass("animate"),
                                        controller.selectObject.modelInfo.detailContentEl.show(),
                                        controller.detail.show(),
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
            }
        },
        data: function () {
            console.log('~~~~~')
            var camera, scene, renderer;
            var loader, light, controller, config;
            controller = new Controller;
            config = {};
            modelArray.splice(0, 10);
            config['modelArray'] = modelArray;
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
                controller,
                config
            }
        },
        created: function () {
        },
        mounted: function () {
//            this.addLight()
            this.loaderData()
            this.animate();
            //this.addHelper();
            this.getElement();
            this.bindEvent()
        }
    }
</script>

<style lang="less"
       rel="stylesheet/less">
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

    .m-btn {
        /*display: none;*/
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: 3;
        pointer-events: none;
        .wrap {
            position: absolute;
            top: 50%;
            left: 50%;
            /*width: 375px;*/
            width: 375px;
            height: 600px;
            margin: -300px 0 0 -187.5px;
            .btn-open {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 30px;
                height: 30px;
                margin: -185px 0 0 107px;
                background: url(http://7xnf0o.com2.z0.glb.qiniucdn.com/bg_btn_info.png) no-repeat center;
                background-size: 30px 30px;
                z-index: 3;
                pointer-events: auto;
            }
            .btn-box {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 134px;
                height: 134px;
                margin: 109px 0 0 -67px;
                background: url(http://7xnf0o.com2.z0.glb.qiniucdn.com/bg_btn.png) no-repeat center;
                background-size: 134px 134px;
                z-index: 3;
                pointer-events: auto;
                .btn-close-3d {
                    position: absolute;
                    bottom: 52px;
                    left: 50%;
                    width: 30px;
                    height: 30px;
                    margin-left: -14px;
                    z-index: 4;
                }

                .btn-close-3d .inner {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 20px;
                    height: 20px;
                    margin: -10px 0 0 -11px;
                    background: url(http://7xnf0o.com2.z0.glb.qiniucdn.com/bg_btn_far.png) no-repeat center;
                    background-size: 20px 20px;
                }

                .btn-prev {
                    position: absolute;
                    top: 47px;
                    left: 50%;
                    width: 30px;
                    height: 40px;
                    margin-left: -41px;
                    z-index: 3;
                }

                .btn-prev .inner {
                    position: absolute;
                    top: 50%;
                    right: -18px;
                    width: 7px;
                    height: 13px;
                    margin-top: -6.5px;
                    background: url(http://7xnf0o.com2.z0.glb.qiniucdn.com/bg_btn_arrow.png) no-repeat center;
                    background-size: 7px 13px;
                }

                .btn-next {
                    position: absolute;
                    top: 47px;
                    left: 50%;
                    width: 30px;
                    height: 40px;
                    z-index: 3;
                    margin-left: 13px;
                }

                .btn-next .inner {
                    position: absolute;
                    top: 50%;
                    left: -17px;
                    width: 7px;
                    height: 13px;
                    margin-top: -6.5px;
                    background: url(http://7xnf0o.com2.z0.glb.qiniucdn.com/bg_btn_r_arrow.png) no-repeat center;
                    background-size: 7px 13px;
                }
            }

            .btn-box.animate .btn-prev .inner {
                -webkit-animation: Move3 1.2s linear infinite;
            }

            .btn-box.animate .btn-next .inner {
                -webkit-animation: Move4 1.2s linear infinite;
            }
        }
    }
</style>
