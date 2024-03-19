import { DefaultNamingStrategy, Table, NamingStrategyInterface } from 'typeorm';

export class CustomNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  primaryKeyName(tableOrName: Table | string): string {
    const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;

    return `${table}_pkey`;
  }

  foreignKeyName(tableOrName: Table | string, columnNames: string[]): string {
    const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const columnsSnakeCase = columnNames.join('_');

    return `${table}_${columnsSnakeCase}_fkey`;
  }

  uniqueConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
  ): string {
    const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    const columnsSnakeCase = columnNames.join('_');

    return `${table}_${columnsSnakeCase}_key`;
  }
}
