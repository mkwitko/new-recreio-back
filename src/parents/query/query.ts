export class QueryClass {
  protected filter: any = {};

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

    this.id(params);
    this.limit(params);
    this.order_by(params);
    this.where(params);
    this.group_by(params);
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
}
