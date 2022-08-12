class searchRecord {
    var #name = '';
    var #record = '';
    constructor(record) {
        setName();
        setRecord(record);
    }

    getName() {
        return this.#name;
    }
    setName() {
        if (this.#record.length > 16) this.#name = this.#record.substring(0, 15) + '...';
        else this.#name = this.#record;
    }

    getRecord() {
        return this.#record;
    }
    setRecord(value) {
        if (value != '' || value != null) this.#record = value;
        else throw new DOMException('The value cannot null or empty.', 'EXCEPTION');
    }

    toString() {
        return getRecord();
    }
}
