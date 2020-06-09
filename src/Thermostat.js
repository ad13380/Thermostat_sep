class Thermostat {
  constructor() {
    this.MIN_TEMP = 10;
    this.MAX_TEMP_PSM_ON = 25;
    this.MAX_TEMP_PSM_OFF = 32;
    this.LOW_USAGE_BOUNDARY = 18;
    this.MEDIUM_USAGE_BOUNDARY = 25;
    this.DEFAULT_TEMPERATURE = 20;
    this.temp = this.DEFAULT_TEMPERATURE;
    this.psm = true;
  }
  viewTemp() {
    return this.temp;
  }
  raise() {
    if (this.isMaxTemp()) {
      return;
    }
    this.temp++;
  }
  lower() {
    if (this.isMinTemp()) {
      return;
    }
    this.temp--;
  }
  isMinTemp() {
    return this.temp === this.MIN_TEMP;
  }
  isMaxTemp() {
    if (this.isPsmOn()) {
      return this.temp === this.MAX_TEMP_PSM_ON;
    } 
    return this.temp === this.MAX_TEMP_PSM_OFF;
  }
  isPsmOn() {
    return this.psm;
  }
  setPsmOff() {
    this.psm = false;
  }
  setPsmOn() {
    this.psm = true;
  }
  resetTemp() {
    this.temp = this.DEFAULT_TEMPERATURE;
  }
  energyUsage() {
    if (this.temp < this.LOW_USAGE_BOUNDARY) {
      return 'low-usage';
    } else if (this.temp < this.MEDIUM_USAGE_BOUNDARY) {
      return 'medium-usage';
    }
    return 'high-usage'
  }
}