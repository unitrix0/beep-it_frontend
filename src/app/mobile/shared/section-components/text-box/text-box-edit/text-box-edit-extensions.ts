export {};
declare global {
  interface Map<K, V> {
    setTextBoxEditParams(label: string, value: string): void;

    getTextBoxEditValue(): string;
    getTextBoxEditLabel(): string;
  }
}

Map.prototype.setTextBoxEditParams = function (label, value) {
  this.set('textBoxLabel', label);
  this.set('textBoxVal', value);
};

Map.prototype.getTextBoxEditValue = function () {
  return this.get('textBoxVal');
};
Map.prototype.getTextBoxEditLabel = function () {
  return this.get('textBoxLabel');
};
