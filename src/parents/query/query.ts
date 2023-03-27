export class QueryClass {
  table = '';
  stringifyFields = [];
  zeroInFrontFields = [];
  numberFields = [];
  protected filter: any = {};

  constructor(protected db: any) {}

  async get(params, table = null): Promise<any> {
    return await this.db[table ? table : this.table].findMany(
      this.filtering(params),
    );
  }

  async insert(data, table = null): Promise<any> {
    return await this.db[table ? table : this.table].create({ data });
  }

  async update(params, table = null): Promise<any> {
    return await this.db[table ? table : this.table].update(
      this.filtering(params),
    );
  }

  async delete(params, table = null): Promise<any> {
    return await this.db[table ? table : this.table].update(
      this.filtering(params),
    );
  }

  private fix_precision(filter) {
    Object.keys(filter).forEach((filterKey) => {
      if (typeof filter[filterKey] == 'object' && filter[filterKey] != null) {
        Object.keys(filter[filterKey]).forEach((key) => {
          if (
            this.stringifyFields.includes(key) &&
            typeof filter[filterKey][key] != 'string'
          ) {
            filter[filterKey][key] = filter[filterKey][key].toString();
          }
          if (
            this.numberFields.includes(key) &&
            typeof filter[filterKey][key] != 'number'
          ) {
            filter[filterKey][key] = +filter[filterKey][key];
          }
          if (
            this.zeroInFrontFields.includes(key) &&
            filter[filterKey][key].length == 1
          ) {
            filter[filterKey][key] = '0' + filter[filterKey][key];
          }
        });
      } else {
        if (
          this.stringifyFields.includes(filterKey) &&
          typeof filter[filterKey] != 'string'
        ) {
          filter[filterKey] = filter[filterKey].toString();
        }
        if (
          this.numberFields.includes(filterKey) &&
          typeof filter[filterKey] != 'number'
        ) {
          filter[filterKey] = +filter[filterKey];
        }
        if (
          this.zeroInFrontFields.includes(filterKey) &&
          filter[filterKey].length == 1
        ) {
          filter[filterKey] = '0' + filter[filterKey];
        }
      }
    });
    return filter;
  }

  private filtering(params) {
    this.filter = {};
    if (params.count) {
      this.filter.count = this.count(params);
    } else if (params.select) {
      this.filter.select = this.select(params);
    }

    if (params.include) {
      this.filter.include = params.include;
    }

    if (params.data) {
      this.filter.data = params.data;
    }

    this.id(params);
    this.limit(params);
    this.order_by(params);
    this.where(params);
    this.group_by(params);
    this.filter = this.fix_precision(this.filter);
    return this.fix_precision(this.filter);
  }

  protected count(params) {
    return params.count;
  }

  protected select(params) {
    return params.select;
  }

  protected id(params) {
    if (params.id) {
      this.filter.where = { id: params.id };
    }
  }

  protected where(params) {
    if (params.where) {
      this.filter.where = { ...this.filter.where, ...params.where };
    }
  }

  protected limit(params) {
    if (params.limit) {
      this.filter.take = params.limit;
    }

    if (params.offset) {
      this.filter.skip = params.offset;
    }
  }

  protected order_by(params) {
    if (params.order_by) {
      this.filter.orderBy = params.order_by;
    } else {
      // this.filter.orderBy = [{ created: 'asc' }, { id: 'asc' }];
    }
  }

  protected group_by(params) {
    if (params.group_by) {
      this.filter.groupBy = params.group_by;
    }
  }
}
