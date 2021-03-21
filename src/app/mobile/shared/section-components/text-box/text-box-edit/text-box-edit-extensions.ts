export {};
declare global {
  interface Map<K, V> {
    setTextBoxEditValue(value: string): void;
    getTextBoxEditValue(): string;
    setTextBoxEditLabel(value: string): void;
    getTextBoxEditLabel(): string;
  }
}

Map.prototype.setTextBoxEditValue = function (value) {
  this.set('textBoxVal', value);
};

Map.prototype.getTextBoxEditValue = function () {
  return this.get('textBoxVal');
};

Map.prototype.setTextBoxEditLabel = function (value) {
  this.set('textBoxLabel', value);
};

Map.prototype.getTextBoxEditLabel = function () {
  return this.get('textBoxLabel');
};
