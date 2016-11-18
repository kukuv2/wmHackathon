<script src="../../../../.ShadowsocksX/gfwlist.js"></script>
<template>
    <div id="app"></div>
</template>

<script>
    import Controller from './controller'
    import TWEEN from 'tween.js'
    export default {
        name: 'app',
        components: {},
        methods: {
            animate: function () {

                requestAnimationFrame(this.animate);


                this.renderer.render(this.scene, this.camera);

            },
            loaderData: function () {
                this.loader.load('./static/qx.json', (geometry, materials) => {
                    for (var key in materials) {
                        materials[key].shading = THREE.FlatShading;
                        materials[key].morphTargets = true;
                    }
                    var threeMaterials = new THREE.MeshFaceMaterial(materials)
                    var mesh = new THREE.MorphBlendMesh(geometry, threeMaterials);
                    mesh.name = 'test';
                    mesh.duration = 1e3;
//                    mesh.position.set(0, -50, 0);
                    mesh.scale.set(.2, .2, .2);
                    this.scene.add(mesh);
                    this.controller.selectObject = mesh
                })
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
                var pointLight = new THREE.PointLight(0xff0000, 1, 100);
                pointLight.name = 'pointLight'
                pointLight.position.set(10, 10, 10);
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
                    var i = this.controller
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
                    if (e.touches.length > 1) {
                        return false;
                    }
                    e.preventDefault()
                    var i = this.controller
                    e = i.hasTouch && e.changedTouches[0] ? e.changedTouches[0] : e
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
                                    TWEEN.to(".m-info", .2, {
                                        opacity: 0,
                                        onComplete: function () {
                                        }
                                    });
                            var o = 1;
                            i.Scene.globalGroup.rotation.x == 0 && i.Scene.globalGroup.rotation.y == 0 && i.Scene.globalGroup.rotation.z == 0 && (o = 0),
                                    TWEEN.to(i.Scene.globalGroup.rotation, o, {
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
                    } else{
                        console.log("none")
                    }
                })

            }
        },
        data: function () {
            var camera, scene, renderer;
            var loader, light, controller;
            window.camera = camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
            camera.position.z = 100;

            window.scene = scene = new THREE.Scene();
            light = new THREE.AmbientLight(16777215)
            light.name = 'light'
            scene.add(light)

            renderer = new THREE.WebGLRenderer();
            loader = new THREE.JSONLoader();
            controller = new Controller();
            return {
                camera,
                scene,
                renderer,
                loader,
                controller
            }
        },
        created: function () {


            this.renderer.setSize(window.innerWidth, window.innerHeight);
            var exsitCanvas = document.getElementsByTagName('canvas')[0];
            if (exsitCanvas) {
                document.body.removeChild(exsitCanvas);
            }
            document.body.appendChild(this.renderer.domElement);
            this.addLight()
            this.loaderData()
            this.animate();
            this.addHelper();
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

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
