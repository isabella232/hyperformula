import {BetterAst} from "./parser/BetterAst";

type VertexId = number;
let nextVertexId = 0;
const getNextVertexId = () : VertexId => {
  return nextVertexId++;
}

export abstract class Vertex {
  public readonly id: VertexId;

  protected constructor() {
    this.id = getNextVertexId();
  }

  abstract getCellValue(): CellValue
}

export enum ErrorType {
  ARG = "ARG",
  DIV_BY_ZERO = "DIV_BY_ZERO",
  NAME = "NAME"
}
export interface CellError {
  type: ErrorType
}
export const cellError = (error: ErrorType): CellError => ({ type: error })

export type CellValue = string | number | CellError

export class FormulaCellVertex extends Vertex {
  private cachedCellValue?: CellValue;
  private formula: BetterAst;

  constructor(formula: BetterAst) {
    super()
    this.formula = formula;
  }

  getFormula() : BetterAst {
    return this.formula
  }

  setCellValue(cellValue: CellValue) {
     this.cachedCellValue = cellValue
  }

  getCellValue() {
    if (this.cachedCellValue != null) {
      return this.cachedCellValue
    } else {
      throw Error("Value of the formula cell is not computed.")
    }
  }
}

export class ValueCellVertex extends Vertex {
  private cellValue: CellValue;

  constructor(cellValue: CellValue) {
    super()
    this.cellValue = cellValue;
  }

  getCellValue() {
    return this.cellValue
  }

  setCellValue(cellValue: CellValue) {
    this.cellValue = cellValue
  }
}

export class EmptyCellVertex extends Vertex {
  constructor() {
    super()
  }

  getCellValue() {
    return 0
  }
}
