import track from './track'
export default (function () {
    var controller = function () {
        var i = this;
        i.Track = new track
        i.PageTrack = new track
        i.PageTrack.rotationSpeed = 5
        i.hasTouch = "ontouchstart" in window
        i.isPageMove = true
        i.selectObject = null,
        i.isModeMove = false,
        i.isOpeningHide = true;
        i.Scene = new THREE.Scene;
        i.Scene.position.y = -80;
        i.camera = new THREE.PerspectiveCamera(40,window.innerWidth / window.innerHeight,1,15e3);
        i.camera.position.x = 0;
        i.camera.position.y = 0;
        i.camera.position.z = 1500;
        i.camera.lookAt(i.Scene.position);
        i.touch = new THREE.Vector2;
    }
    return controller
})()
