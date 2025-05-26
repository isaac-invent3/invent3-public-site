import {
  BmsBuildingSettingsModel,
  BmsFloorSettingsModel,
  BmsRoomSettingsModel,
  BudgetExpenditureModel,
} from '~/lib/interfaces/settings.interfaces';
import { FORM_ENUM, SYSTEM_CONTEXT_TYPE, UNIT_ID } from '~/lib/utils/constants';

const newBudgetExpenditure: BudgetExpenditureModel = {
  key: FORM_ENUM.add,
  value: {
    systemContextTypeId: SYSTEM_CONTEXT_TYPE.ASSET_CATEGORY,
    contextId: null,
    kWhTarget: null,
  },
};

const newRoom: BmsRoomSettingsModel = {
  roomId: null,
  temperatureSetPoint: {
    key: FORM_ENUM.add,
    value: {
      key: UNIT_ID.DEGREE_CELSIUS,
      value: null,
    },
  },
  humiditySetPoint: {
    key: FORM_ENUM.add,
    value: {
      key: UNIT_ID.RELATIVE_HUMIDITY,
      value: null,
    },
  },
  co2SetPoint: {
    key: FORM_ENUM.add,
    value: {
      key: UNIT_ID.PARTS_PER_MILLION,
      value: null,
    },
  },
  lightningLevelSetPoint: {
    key: FORM_ENUM.add,
    value: {
      key: UNIT_ID.LUX,
      value: null,
    },
  },
  energyConsumptionTarget: {
    key: FORM_ENUM.add,
    value: {
      key: UNIT_ID.KILOWATT_HOUR,
      value: null,
    },
  },
};

const newFloor: BmsFloorSettingsModel = {
  floorMap: null,
  floorId: null,
  bmsRoomSettingsModel: [newRoom],
};

const newBuildingSettings: BmsBuildingSettingsModel = {
  buildingId: null,
  costOfEnergyPerKWh: null,
  budgetExpenditureModels: [newBudgetExpenditure],
  bmsFloorSettingsModels: [newFloor],
};

export { newBuildingSettings, newBudgetExpenditure, newFloor, newRoom };
