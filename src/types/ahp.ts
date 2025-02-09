export interface HierarchicalNode {
  key: number;
  name: string;
  children?: HierarchicalNode[] | null;
}

interface PayloadTypes {
  ADD_CRITERION: {
    newNode: HierarchicalNode;
    incrementNodeNumber: () => void;
  };
  ADD_OPTION: { newOption: string };
  CHANGE_CRITERIA_WEIGHTS: {
    criterion1: HierarchicalNode;
    criterion2: HierarchicalNode;
    weight: number;
  };
}
interface OptionMatrices {
  [criterio: string]: (string | number)[][];
}

export interface AHPState {
  options: string[];
  criteriaMatrix: (string | number)[][];
  optionsMatrices: OptionMatrices;
  criteriaHierarchy: HierarchicalNode;
  criteriaNumber: number;
  optionsNumber: number;
  selectedCriterionKey: number;
}
