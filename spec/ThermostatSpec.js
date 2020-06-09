'use strict';

describe('Thermostat', function() {

  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it('has a default temperature of 20', function() {
    expect(thermostat.viewTemp()).toEqual(20);
  });

  it('is in power saving mode by default', function() {
    expect(thermostat.isPsmOn()).toBe(true);
  });

  it('can increase temperature', function() {
    thermostat.raise();
    expect(thermostat.viewTemp()).toEqual(21);
  });

  it('can decrease temperature', function() {
    thermostat.lower();
    expect(thermostat.viewTemp()).toEqual(19);
  });

  it('has a minimum of 10 degrees', function() {
    for (var i = 0; i < 10; i++) {
      thermostat.lower();
    }
    expect(thermostat.viewTemp()).toEqual(10);
  });

  it('can switch power saving mode off', function() {
    thermostat.setPsmOff();
    expect(thermostat.isPsmOn()).toBe(false);
  });

  it('can switch power saving mode on', function() {
    thermostat.setPsmOff();
    expect(thermostat.isPsmOn()).toBe(false);
    thermostat.setPsmOn();
    expect(thermostat.isPsmOn()).toBe(true);
  });

  it('can be reset to the default temperature', function() {
    thermostat.raise();
    thermostat.resetTemp();
    expect(thermostat.viewTemp()).toEqual(20);
  });

  describe('when power saving mode is on', function() {
    it('has a maximum temperature of 25 degrees', function() {
      for (var i = 0; i < 6; i++) {
        thermostat.raise();
      }
      expect(thermostat.viewTemp()).toEqual(25);
    });
  });

  describe('when power saving mode is off', function() {
    it('has a maximum temperature of 32 degrees', function() {
      thermostat.setPsmOff();
      for (var i = 0; i < 13; i++) {
        thermostat.raise();
      }
      expect(thermostat.viewTemp()).toEqual(32);
    });
  });

  describe('displaying usage levels', function() {
    describe('when the temperature is below 18 degrees', function() {
      it('it returns low-usage', function() {
        for (var i = 0; i < 3; i++) {
          thermostat.lower();
        }
        expect(thermostat.energyUsage()).toEqual('low-usage');
      });
    });
  
    describe('when the temperature is between 18 and 25 degrees', function() {
      it('it is considered medium-usage', function() {
        expect(thermostat.energyUsage()).toEqual('medium-usage');
      });
    });
  
    describe('when the temperature is anything else', function() {
      it('it is considered high-usage', function() {
        thermostat.setPsmOff()
        for (var i = 0; i < 6; i++) {
          thermostat.raise();
        }
        expect(thermostat.energyUsage()).toEqual('high-usage');
      });
    });
  });
});