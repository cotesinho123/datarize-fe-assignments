export const PICO_DATA = {
  // @see {@link https://picocss.com/docs/container}
  layout: {
    classname: {
      container: 'container',
      containerFluid: 'container-fluid',

      grid: 'grid',
    },
  },
  // @see {@link https://picocss.com/docs/table}
  table: {
    scope: {
      col: 'col',
      row: 'row',
    },
    classname: {
      striped: 'striped',
    },
  },
} as const
