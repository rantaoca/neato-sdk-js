describe("Robot Services: spotCleaning basic-1", function() {
  var robot = new Neato.Robot("serial", "secretKey")
    , deferredObject = "deferredObject"
    , robotState = {
        "version": 1,
        "reqId": "77",
        "result": "ok",
        "data": {},
        "state": 1,
        "action": 0,
        "availableServices": {
          "spotCleaning": "basic-2"
        }
      };

  robot.state = robotState;
  robot.__initializeAvailableServices();

  beforeEach(function() {
    spyOn(robot, '__call').and.returnValue(deferredObject);
  });

  describe("#startSpotCleaning", function() {

     it("calls Nucleo with the appropriate command and parameters", function() {
       var result = robot.startSpotCleaning();

       expect(robot.__call).toHaveBeenCalledWith({
         reqId: "1",
         cmd: "startCleaning",
         params: {
           category: Neato.Constants.CLEAN_SPOT_MODE,
           mode: Neato.Constants.TURBO_MODE,
           modifier: Neato.Constants.HOUSE_FREQUENCY_NORMAL,
           spotWidth: Neato.Constants.SPOT_AREA_LARGE,
           spotHeight: Neato.Constants.SPOT_AREA_LARGE,
           navigationMode: Neato.Constants.EXTRA_CARE_OFF
         }
       });
       expect(result).toBe(deferredObject);
     });

    it("calls Nucleo overriding default parameters", function() {
      var result = robot.startSpotCleaning({
        mode: Neato.Constants.ECO_MODE,
        modifier: Neato.Constants.HOUSE_FREQUENCY_DOUBLE,
        spotWidth: Neato.Constants.SPOT_AREA_SMALL,
        spotHeight: Neato.Constants.SPOT_AREA_SMALL,
        navigationMode: Neato.Constants.EXTRA_CARE_ON
      });

      expect(robot.__call).toHaveBeenCalledWith({
        reqId: "1",
        cmd: "startCleaning",
        params: {
          category: Neato.Constants.CLEAN_SPOT_MODE,
          mode: Neato.Constants.ECO_MODE,
          modifier: Neato.Constants.HOUSE_FREQUENCY_DOUBLE,
          spotWidth: Neato.Constants.SPOT_AREA_SMALL,
          spotHeight: Neato.Constants.SPOT_AREA_SMALL,
          navigationMode: Neato.Constants.EXTRA_CARE_ON
        }
      });
      expect(result).toBe(deferredObject);
    });

    it("calls Nucleo discarding unsupported parameters", function() {
      var result = robot.startSpotCleaning({
        unsupportedKey: "unsupportedValue"
      });

      expect(robot.__call).toHaveBeenCalledWith({
        reqId: "1",
        cmd: "startCleaning",
        params: {
          category: Neato.Constants.CLEAN_SPOT_MODE,
          mode: Neato.Constants.TURBO_MODE,
          modifier: Neato.Constants.HOUSE_FREQUENCY_NORMAL,
          spotWidth: Neato.Constants.SPOT_AREA_LARGE,
          spotHeight: Neato.Constants.SPOT_AREA_LARGE,
          navigationMode: Neato.Constants.EXTRA_CARE_OFF
        }
      });
      expect(result).toBe(deferredObject);
    });
  });

  it("it support eco/turbo mode", function() {
    expect(robot.supportEcoTurboMode()).toBe(true);
  });

  it("it support cleaning frequency", function() {
    expect(robot.supportFrequency()).toBe(true);
  });

  it("it support extra care", function() {
    expect(robot.supportExtraCare()).toBe(true);
  });

  it("it support cleaning area", function() {
    expect(robot.supportArea()).toBe(true);
  });
});
