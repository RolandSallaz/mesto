export default class Section {
    constructor(containerSelector) {
        this._container = containerSelector;
    }
    addItem(element) {
        this._container.prepend(element);
    }

}