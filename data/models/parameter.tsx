interface ParameterRow {
  id: number;
  estado: boolean;
  key: string;
  value: string;
}

interface HeaderRow extends ParameterRow {
  hidden: boolean;
}

export type { ParameterRow, HeaderRow };
