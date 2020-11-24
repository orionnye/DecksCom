import { Vector } from "./math";
import Input from "./input";

export default class Player {
    pos: Vector
    size: Vector
    constructor(pos, size) {
        this.pos = pos
        this.size = size
    }
}