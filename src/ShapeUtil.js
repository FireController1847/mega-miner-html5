/**
 * Borders are the distance from the origin point (top, left) to the specified option.
 * For example, if `bottom` is 45, it's 45 pixels from `top`, which would be 0 in most cases.
 */
class Borders {
    /**
     * @param {number} top The distance from the canvas top origin point (0)
     * @param {number} left The distance from the canvas left origin point (0)
     * @param {number} bottom The distance from the top border
     * @param {number} right The distance from the left border
     */
    constructor(top, left, bottom, right) {
        this.top = top;
        this.left = left;
        this.bottom = bottom;
        this.right = right;
    }
}

/**
 * Utilities for an object that isn't a shape but consists of many shapes making a rectangle,
 * or for an actual EaselJS Shape.
 */
class ShapeUtil {
    /**
     * Determines if, by a shape's borders, a shape is within another shape.
     *
     * @param {Borders} borders1 The borders for the shape that might be in the second shape.
     * @param {Borders} borders2 The borders for the shape that the other shape might be in.
     */
    static within(borders1, borders2) {
        return borders1.top <= borders2.top &&
                borders1.left <= borders2.left &&
                borders1.bottom >= borders2.bottom &&
                borders1.right >= borders2.right;
    }
}

module.exports = {
    Borders: Borders,
    ShapeUtil: ShapeUtil
};