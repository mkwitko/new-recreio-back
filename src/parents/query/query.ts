export class QueryClass {
  table = '';
  stringifyFields = [];
  zeroInFrontFields = [];
  numberFields = [];
  arrayNumberfy = false;
  protected filter: any = {};

  constructor(protected db: any) {}

  async get(params, table = null): Promise<any> {
    return await this.db[table ? table : this.table].findMany(
      this.filtering(params),
    );
  }

  async insert(data, table = null): Promise<any> {
    return await this.db[table ? table : this.table].create(
      this.filtering({ data }),
    );
  }

  async insertRaw(keys, values, table = null) {
    return await this.db.$transaction(async (prisma) => {
      const insert = await prisma.$queryRawUnsafe(`
       INSERT INTO ${table ? table : this.table} (${keys})
       VALUES (${values.map((e) => {
         if (typeof e === 'string') {
           return `'${e}'`;
         }
         return e;
       })})
       SELECT @@IDENTITY AS id
       `);
      return insert;
    });
  }

  async update(params, table = null): Promise<any> {
    return await this.db[table ? table : this.table].update(
      this.filtering(params),
    );
  }

  async delete(params, table = null): Promise<any> {
    return await this.db[table ? table : this.table].delete(
      this.filtering(params),
    );
  }

  filtering(params) {
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
    return this.filter;
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

  private isObject(obj) {
    return typeof obj == 'object' && obj != null;
  }

  private fix_precision(filter) {
    Object.keys(filter).forEach((key) => {
      this.mapping(key, filter[key], filter);
    });
    return filter;
  }

  private mapping(key, values, filter, oldValue?) {
    if (this.isObject(values)) {
      Object.keys(values).forEach((key) => {
        this.mapping(key, values[key], filter, values);
      });
    } else {
      this.pipe(key, values, oldValue);
    }
  }

  private pipe(key, value, oldValue) {
    if (value != null) {
      if (this.stringifyFields.includes(key) && typeof value != 'string') {
        value = value.toString().trim();
      }
      if (typeof value != 'number') {
        if (
          this.numberFields.includes(key) ||
          (/^\d+$/.test(key) && this.arrayNumberfy)
        )
          value = +value;
      }
      if (this.zeroInFrontFields.includes(key) && value.length == 1) {
        value = '0' + value;
      }
    }
    return (oldValue[key] = value);
  }
}
