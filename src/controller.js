import track from './track'
export default (function () {
    var controller = function () {
        var i = this;
        i.Track = new track
        i.PageTrack = new track
        i.PageTrack.rotationSpeed = .5
        i.hasTouch = "ontouchstart" in window
        i.isPageMove = true
        i.selectObject = {}
    }
    return controller
})()
