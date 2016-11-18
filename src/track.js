
export default (function () {
    var track = function () {
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
    return track
})()

