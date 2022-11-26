import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { IAddCondition, ICondition } from "../models/ConditionModel";
import {
  addCondition,
  disableVisibilityCondition,
  getConditionById,
  getConditions,
  updateCondition,
} from "../services/ConditionService";

export class ConditionStore {
  constructor(context: any) {
    makeObservable(this);
  }

  @observable conditions: ICondition[] = [];
  @observable loading: boolean = false;

  @computed get allConditions() {
    return this.conditions;
  }

  @computed get visibleConditions() {
    return this.conditions.filter((x) => x.visible === true);
  }

  @computed get notVisibleConditions() {
    return this.conditions.filter((x) => x.visible === false);
  }

  @action
  fetchConditions = async () => {
    try {
      this.loading = true;
      const response = await getConditions();
      runInAction(() => {
        this.conditions = response;
        this.loading = false;
      });
      this.loading = false;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  getConditionById = async (conditionId: number) => {
    try {
      this.loading = true;
      const response = await getConditionById(conditionId);
      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  addCondition = async (conditionData: IAddCondition) => {
    try {
      this.loading = true;

      const response = await addCondition(conditionData);
      this.conditions = [...this.conditions, response];
      
      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  updateCondition = async (conditionData: ICondition) => {
    try {
      this.loading = true;

      const response = await updateCondition(conditionData);
      const foundIndex = this.conditions.findIndex((x) => x.id === response.id);
      this.conditions[foundIndex] = response;

      this.loading = false;
      return response;
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };

  @action
  disableVisibility = async (conditionId: number) => {
    try {
      this.loading = true;
      await disableVisibilityCondition(conditionId);
      runInAction(async () => {
        await this.fetchConditions();
        this.loading = false;
      });
    } catch (error) {
      this.loading = false;
      throw error;
    }
  };
}