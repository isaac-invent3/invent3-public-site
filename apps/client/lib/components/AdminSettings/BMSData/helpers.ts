import {
  BmsBuildingSettingsModel,
  BmsFloorSettingsModel,
  BmsRoomSettingsModel,
  BudgetExpenditureModel,
} from '~/lib/interfaces/settings.interfaces';
import { FORM_ENUM } from '~/lib/utils/constants';

const newBudgetExpenditure: BudgetExpenditureModel = {
  key: FORM_ENUM.add,
  value: {
    systemContextTypeId: null,
    contextId: null,
    kWhTarget: null,
  },
};

const newRoom: BmsRoomSettingsModel = {
  roomId: null,
  temperatureSetPoint: {
    key: null,
    value: {
      key: null,
      value: null,
    },
  },
  humiditySetPoint: {
    key: null,
    value: {
      key: null,
      value: null,
    },
  },
  co2SetPoint: {
    key: null,
    value: {
      key: null,
      value: null,
    },
  },
  energyConsumptionTarget: {
    key: null,
    value: {
      key: null,
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
  bmsFloorSettingsModels: [],
};

export { newBuildingSettings, newBudgetExpenditure, newFloor, newRoom };
