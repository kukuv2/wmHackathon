<script src="../../../../.ShadowsocksX/gfwlist.js"></script>
<template>
    <div id="app"></div>
</template>

<script>
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
                renderElement.addEventListener('touchstart', this.recordStartPoint)
                renderElement.addEventListener('touchmove', this.rotateAction)

            },
            recordStartPoint: function (e) {
                if (e.touches.length > 1) {
                    return
                }
                e.preventDefault();
                if (true) { //是否支持touchstart
                    if (e.changedTouches[0]) {
                        e = e.changedTouches[0]
                    }
                }
                i.touchStartX = e.clientX,
                i.isPageMove && (i.Track.startPoint = {
                    x: e.clientX,
                    y: e.clientY
                },
                i.Track.rotateStartPoint = i.Track.rotateEndPoint = i.Track.projectOnTrackball(0, 0))
            },
            rotateAction: function (e) {

            }
        },
        data: function () {
            var camera, scene, renderer;
            var loader, light;
            window.camera = camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
            camera.position.z = 100;

            window.scene = scene = new THREE.Scene();
            light = new THREE.AmbientLight(16777215)
            light.name = 'light'
            scene.add(light)

            renderer = new THREE.WebGLRenderer();
            loader = new THREE.JSONLoader();
            return {
                camera,
                scene,
                renderer,
                loader
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
